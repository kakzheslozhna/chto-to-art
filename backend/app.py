from flask import Flask, request, jsonify
from flask_cors import CORS # Для разрешения запросов с другого домена
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email.header import Header # Для кодирования имен файлов с не-ASCII символами
from email import encoders
import os # Для работы с файлами
from werkzeug.utils import secure_filename # Для безопасного имени файла
from mimetypes import guess_type # Для определения MIME-типа файла
import traceback # Для детального вывода ошибок

# --- Конфигурация Flask ---
app = Flask(__name__)
CORS(app) # В продакшене лучше указать конкретный домен фронтенда: CORS(app, resources={r"/api/*": {"origins": "http://your-frontend-domain.com"}})

# --- Конфигурация Email ---
SMTP_SERVER = 'smtp.yandex.ru'  # SMTP сервер Яндекс
SMTP_PORT = 587                 # Порт для TLS
SMTP_USERNAME = 'krutov@fabrika-art.ru'  # Ваш email адрес (логин)
SMTP_PASSWORD = 'sowmykzbdjkopstn'        # Ваш пароль приложения для Яндекс.Почты

MAIL_TO = 'krutov@fabrika-art.ru' # Куда отправлять письма
MAIL_FROM = SMTP_USERNAME         # От кого будут приходить письма

# --- Конфигурация загрузки файлов ---
UPLOAD_FOLDER = 'uploads' # Папка для временного хранения загруженных файлов
ALLOWED_EXTENSIONS = {'pdf', 'xlsx', 'xls', 'doc', 'docx', 'ppt', 'pptx', 'jpg', 'jpeg', 'png', 'zip', 'rar'}
MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024 # 5 MB на файл
MAX_FILES_COUNT = 3

# Создаем папку uploads, если она не существует
if not os.path.exists(UPLOAD_FOLDER):
    try:
        os.makedirs(UPLOAD_FOLDER)
        print(f"Created upload folder: {UPLOAD_FOLDER}")
    except OSError as e:
        print(f"Error creating upload folder {UPLOAD_FOLDER}: {e}")
        # Если папку создать не удалось, это может вызвать проблемы дальше
        # Можно либо завершить приложение, либо работать без сохранения файлов (если это приемлемо)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    """Проверяет, имеет ли файл разрешенное расширение."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def send_email_with_attachments(subject, recipient, body_html, files_to_attach=None):
    """
    Отправляет email с HTML-телом и опциональными вложениями.
    files_to_attach: список объектов FileStorage от Flask.
    """
    if files_to_attach is None:
        files_to_attach = []

    try:
        msg = MIMEMultipart('mixed') # 'mixed' для текста и вложений
        msg['From'] = MAIL_FROM
        msg['To'] = recipient
        msg['Subject'] = subject

        # Прикрепляем HTML тело письма
        html_part = MIMEText(body_html, 'html', 'utf-8')
        msg.attach(html_part)
        
        attached_file_paths_for_cleanup = []

        for f_storage in files_to_attach:
            if not (f_storage and f_storage.filename): # Пропускаем, если нет файла или имени
                print(f"Skipping invalid file storage object.")
                continue
            
            original_filename = f_storage.filename
            if not allowed_file(original_filename):
                print(f"Skipping disallowed file type: {original_filename}")
                continue

            # Используем secure_filename для безопасности имени файла на сервере,
            # но оригинальное имя файла будем использовать для заголовка Content-Disposition.
            safe_server_filename = secure_filename(original_filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], safe_server_filename)
            
            try:
                f_storage.save(filepath) # Сохраняем файл на диск
                
                # Серверная проверка размера файла после сохранения
                if os.path.getsize(filepath) > MAX_FILE_SIZE_BYTES:
                    print(f"File {original_filename} is too large ({os.path.getsize(filepath)} bytes) after saving, skipping attachment.")
                    os.remove(filepath) 
                    continue

                # Определяем MIME-тип файла
                ctype, encoding = guess_type(filepath)
                if ctype is None or encoding is not None: # Если тип не угадан или есть кодировка (нам нужен сырой тип)
                    ctype = 'application/octet-stream' # Универсальный тип
                
                maintype, subtype = ctype.split('/', 1)

                with open(filepath, 'rb') as fp:
                    part = MIMEBase(maintype, subtype)
                    part.set_payload(fp.read())
                
                encoders.encode_base64(part)
                
                # Корректное добавление имени файла в заголовок, включая не-ASCII символы
                try:
                    # Пытаемся установить имя файла как есть
                    part.add_header('Content-Disposition', 'attachment', filename=original_filename)
                except UnicodeEncodeError:
                    # Если ошибка (например, из-за не-ASCII символов), кодируем имя
                    h = Header(original_filename, 'utf-8')
                    part.add_header('Content-Disposition', 'attachment', filename=h.encode())

                msg.attach(part)
                attached_file_paths_for_cleanup.append(filepath)
                print(f"Successfully prepared attachment: {original_filename} (MIME: {ctype})")

            except Exception as e:
                print(f"Error processing file {original_filename} for attachment: {e}")
                traceback.print_exc()
                if os.path.exists(filepath): # Если файл был создан, но при обработке возникла ошибка
                    try:
                        os.remove(filepath)
                    except Exception as remove_err:
                         print(f"Could not remove temp file {filepath} after error: {remove_err}")
        
        # Отправка письма
        print(f"Attempting to send email to {recipient} from {MAIL_FROM} via {SMTP_SERVER}:{SMTP_PORT}")
        # server.set_debuglevel(1) # Раскомментируй для детального лога SMTP команд
        
        if SMTP_PORT == 465: # Для SSL
            server = smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT)
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
        elif SMTP_PORT == 587: # Для TLS
            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            server.ehlo()  # Для некоторых серверов
            server.starttls()
            server.ehlo()  # Повторное ehlo после starttls
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
        else: # Неизвестный порт, пробуем как TLS
            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            
        server.sendmail(MAIL_FROM, recipient, msg.as_string())
        server.quit()
        print(f"Email sent successfully to {recipient}")
        
        return True
    except Exception as e:
        print(f"Critical error sending email: {e}")
        traceback.print_exc()
        return False
    finally:
        # Очистка временных файлов в любом случае (успех или ошибка отправки)
        for path in attached_file_paths_for_cleanup:
            if os.path.exists(path):
                try:
                    os.remove(path)
                    print(f"Cleaned up temporary file: {path}")
                except Exception as e:
                    print(f"Error cleaning up temporary file {path}: {e}")


@app.route('/api/submit_project', methods=['POST'])
def submit_project():
    if request.method == 'POST':
        try:
            name = request.form.get('name', 'Не указано')
            email_from_form = request.form.get('email', 'Не указан')
            project_details = request.form.get('project_details', 'Не указано')
            agreement = request.form.get('agreement', 'off')

            # Получаем файлы из запроса
            files_from_request = request.files.getlist('project_files[]')

            # Базовая валидация полей
            if not name or not email_from_form:
                 return jsonify({'error': 'Имя и Email обязательны для заполнения.'}), 400
            if agreement != 'on':
                return jsonify({'error': 'Необходимо согласие на обработку персональных данных.'}), 400

            # Валидация количества файлов на сервере
            if len(files_from_request) > MAX_FILES_COUNT:
                return jsonify({'error': f'Можно прикрепить не более {MAX_FILES_COUNT} файлов.'}), 400
            
            valid_files_to_attach = []
            processed_filenames_for_email_body = []

            for f_storage in files_from_request:
                if f_storage and f_storage.filename and allowed_file(f_storage.filename):
                     # Проверка размера файла перед добавлением в список для отправки (но после получения от клиента)
                     # Это не идеальная проверка, т.к. файл уже загружен на сервер во временную память/диск.
                     # Для строгой проверки размера *до* полной загрузки нужны более сложные решения (streaming).
                     # Но мы дополнительно проверим размер после сохранения в `send_email_with_attachments`.
                    valid_files_to_attach.append(f_storage)
                    processed_filenames_for_email_body.append(secure_filename(f_storage.filename))
                elif f_storage and f_storage.filename: # Если файл есть, но не прошел allowed_file
                    print(f"Server-side validation: File '{f_storage.filename}' has a disallowed extension.")
            
            # Информация о файлах для тела письма
            files_info_html = ""
            if processed_filenames_for_email_body:
                files_list_str = ", ".join(processed_filenames_for_email_body)
                files_info_html = f"<p><strong>Прикрепленные файлы ({len(processed_filenames_for_email_body)} шт.):</strong> {files_list_str} (см. вложения).</p>"
            else:
                files_info_html = "<p><strong>Файлы не прикреплены или не прошли валидацию на сервере.</strong></p>"

            html_body = f"""
            <html>
            <head>
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                    h2 {{ color: #0070F3; }}
                    p {{ margin-bottom: 10px; }}
                    strong {{ color: #005abd; }}
                </style>
            </head>
            <body>
                <h2>Новая заявка на обсуждение проекта с сайта "Что-то АРТ"</h2>
                <p><strong>Имя:</strong> {name}</p>
                <p><strong>Email:</strong> <a href="mailto:{email_from_form}">{email_from_form}</a></p>
                <p><strong>Детали проекта:</strong></p>
                <p>{project_details.replace(chr(10), "<br>")}</p>
                <p><strong>Согласие на обработку персональных данных:</strong> {"Да" if agreement == "on" else "Нет"}</p>
                {files_info_html}
            </body>
            </html>
            """

            subject = f'Новая заявка на проект от {name} ({email_from_form})'
            
            if send_email_with_attachments(subject, MAIL_TO, html_body, valid_files_to_attach):
                return jsonify({'message': 'Заявка и файлы успешно отправлены!'}), 200
            else:
                # Если send_email_with_attachments вернул False, файлы могли быть не удалены при ошибке внутри функции.
                # Дополнительная очистка тут может быть излишней, если finally в send_email_with_attachments работает.
                return jsonify({'error': 'Не удалось отправить заявку. Произошла ошибка на сервере при обработке email.'}), 500

        except Exception as e:
            print(f"Error in /api/submit_project endpoint: {e}")
            traceback.print_exc()
            return jsonify({'error': f'Внутренняя ошибка сервера: {str(e)}'}), 500
    return jsonify({'error': 'Метод не разрешен'}), 405


@app.route('/api/submit_callback', methods=['POST'])
def submit_callback():
    if request.method == 'POST':
        try:
            name = request.form.get('name', 'Не указано')
            phone = request.form.get('phone', 'Не указан')
            agreement = request.form.get('agreement', 'off')

            if not name or not phone:
                 return jsonify({'error': 'Имя и Телефон обязательны для заполнения.'}), 400
            if agreement != 'on':
                return jsonify({'error': 'Необходимо согласие на обработку персональных данных.'}), 400

            html_body = f"""
            <html><head><style>body {{ font-family: Arial, sans-serif; }}</style></head><body>
                <h2>Заявка на обратный звонок с сайта "Что-то АРТ"</h2>
                <p><strong>Имя:</strong> {name}</p>
                <p><strong>Телефон:</strong> {phone}</p>
                <p><strong>Согласие на обработку:</strong> {"Да" if agreement == "on" else "Нет"}</p>
            </body></html>
            """
            subject = f'Заявка на обратный звонок от {name}'

            # Отправляем без вложений (передаем пустой список файлов)
            if send_email_with_attachments(subject, MAIL_TO, html_body, []):
                 return jsonify({'message': 'Заявка на звонок отправлена!'}), 200
            else:
                return jsonify({'error': 'Не удалось отправить заявку на звонок.'}), 500
        except Exception as e:
            print(f"Error in /api/submit_callback endpoint: {e}")
            traceback.print_exc()
            return jsonify({'error': f'Внутренняя ошибка сервера: {str(e)}'}), 500
    return jsonify({'error': 'Метод не разрешен'}), 405


if __name__ == '__main__':
    # Для локальной разработки debug=True. Для продакшена ОБЯЗАТЕЛЬНО debug=False.
    # host='0.0.0.0' делает сервер доступным из локальной сети, если нужно тестировать с других устройств.
    # По умолчанию Flask слушает только на 127.0.0.1 (localhost).
    app.run(host='0.0.0.0', port=5000, debug=True)