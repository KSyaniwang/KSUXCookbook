# Google Docs CS handoff

This Apps Script turns each Customer Service submission into a private Google
Doc, stores it in Drive, and emails the document link to
`yani.wang@koreanskincare.com`.

## Deploy

1. Create a standalone project at <https://script.google.com/>.
2. Replace `Code.gs` with this folder's `Code.gs`.
3. Open **Project Settings**, enable the manifest file, and replace it with
   `appsscript.json`.
4. Run `setup` once and approve the requested Drive, Docs, and email access.
5. Select **Deploy → New deployment → Web app**.
6. Set **Execute as** to yourself and **Who has access** to **Anyone**.
7. Copy the `/exec` URL into `appsScriptUrl` in
   `js/customer-service-google.js`.

History opens this private Drive folder:
https://drive.google.com/drive/folders/1jyCLTlwlNyIueoNu12ODZA_azw9pQOKL

Drive permissions—not the public web app—control who can view the generated
documents. CS can submit without a Google login. Only the account that owns
the folder can open History.
