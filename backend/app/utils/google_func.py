import io
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload, MediaIoBaseDownload
from google.oauth2 import service_account
from credentials import SERVICE_ACCOUNT_FILE

SCOPES = ['https://www.googleapis.com/auth/drive']

def authenticate(service_account_file, scopes):
    creds = service_account.Credentials.from_service_account_file(
        service_account_file, scopes=scopes)
    return creds

def initialize_service():
    global service
    service = build('drive', 'v3', credentials=authenticate(SERVICE_ACCOUNT_FILE, SCOPES))

initialize_service()

def upload_file(doc_name, file_path):
    file_metadata = {
        'name': doc_name,
        'mimeType': 'application/vnd.google-apps.document'
    }
    media = MediaFileUpload(
        file_path, 
        mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )

    document_id = service.files().create(
        body=file_metadata,
        media_body=media,
        fields='id'
    ).execute()['id']
    return document_id

def download_file(file_path, doc_id):
    request = service.files().export_media(
        fileId=doc_id,
        mimeType='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )

    fh = io.BytesIO()
    downloader = MediaIoBaseDownload(fh, request)
    done = False
    while done is False:
        status, done = downloader.next_chunk()
        # print(f"Download {int(status.progress() * 100)}%.")

    with open(file_path, 'wb') as f:
        f.write(fh.getbuffer())

def set_doc_public_role(doc_id, role):
    if role not in ['reader', 'commenter', 'writer']: 
        raise ValueError("Invalid value for role.")

    permission = {
        'type': 'anyone',
        'role': role
    }

    service.permissions().create(
        fileId=doc_id,
        body=permission,
        fields='id'
    ).execute()

def list_files():
    all_files = []
    page_token = None
    while True:
        results = service.files().list(
            pageSize=1000,  # You can increase this number up to 1000
            fields="nextPageToken, files(id, name)",
            pageToken=page_token
        ).execute()

        files = results.get('files', [])
        all_files.extend(files)

        page_token = results.get('nextPageToken', None)
        if page_token is None: break

    return all_files

def find_first_file(file_name):
    page_token = None
    while True:
        results = service.files().list(
            q=f"name='{file_name}'",
            pageSize=1,
            fields="nextPageToken, files(id, name)",
            pageToken=page_token
        ).execute()

        files = results.get('files', [])
        if files:
            return files[0]  # Return the first file found

        page_token = results.get('nextPageToken', None)
        if page_token is None:
            break

    return None

def delete_file(doc_id):
    service.files().delete(fileId=doc_id).execute()

def delete_all_files():
    files = list_files()
    for file in files:
        delete_file(file['id'])
