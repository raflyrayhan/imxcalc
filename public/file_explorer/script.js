import { storage, db } from './firebase-config.js';
import {
  ref as storageRef, uploadBytes, getDownloadURL, deleteObject
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js';
import {
  collection, addDoc
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';

let uploadedFile = null;
let uploadedFilePath = '';
let uploadedFileURL = '';
let uploadedFileType = '';

document.getElementById('uploadBtn').addEventListener('click', () => {
  document.getElementById('fileUpload').click();
});

document.getElementById('fileUpload').addEventListener('change', async (e) => {
  try {
    uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    uploadedFileType = uploadedFile.type;
    const folder = document.getElementById('input_folder').value.trim() || 'root';
    uploadedFilePath = folder + '/' + uploadedFile.name;
    const fileRef = storageRef(storage, uploadedFilePath);

    await uploadBytes(fileRef, uploadedFile);
    uploadedFileURL = await getDownloadURL(fileRef);

    await addDoc(collection(db, 'files'), {
      name: uploadedFile.name,
      path: uploadedFilePath,
      url: uploadedFileURL,
      createdAt: new Date(),
      folder: folder
    });

    document.getElementById('output_file_name').textContent = uploadedFile.name;
    showPreviewFromURL(uploadedFileURL, uploadedFileType);
    alert('✅ File uploaded. Ready to rename.');
  } catch (err) {
    console.error("❌ Upload failed:", err);
    alert("❌ Upload failed. See console for details.");
  }
});

document.getElementById('renameBtn').addEventListener('click', async () => {
  if (!uploadedFile || !uploadedFileURL) {
    alert('⚠️ Please upload a file first.');
    return;
  }

  const fileExt = uploadedFile.name.split('.').pop();
  const newName = generateFileName();
  if (!newName) {
    alert("⚠️ Please complete the naming fields.");
    return;
  }

  const folder = document.getElementById('input_folder').value.trim() || 'root';
  const newFullName = newName + '.' + fileExt;
  const newPath = folder + '/' + newFullName;
  const newRef = storageRef(storage, newPath);
  const oldRef = storageRef(storage, uploadedFilePath);

  try {
    await uploadBytes(newRef, uploadedFile);
    await deleteObject(oldRef);
    const newURL = await getDownloadURL(newRef);

    document.getElementById('output_file_name').textContent = newFullName;
    showPreviewFromURL(newURL, uploadedFileType);

    await addDoc(collection(db, 'files'), {
      name: newFullName,
      path: newPath,
      url: newURL,
      createdAt: new Date(),
      folder: folder
    });

    try {
      await uploadToGoogleDrive(uploadedFile, newFullName, folder);
    } catch (err) {
      console.warn("⚠️ Google Drive upload skipped:", err.message);
    }
  } catch (err) {
    console.error("❌ Rename failed:", err);
    alert("❌ Rename failed. See console for details.");
  }
});

function generateFileName() {
  const get = id => (document.getElementById('input_' + id)?.value || '').trim().replace(/\s+/g, "_");
  const parts = ['project', 'department', 'discipline', 'sequence', 'doc_type', 'doc_title', 'revision', 'status']
    .map(get)
    .filter(Boolean);
  return parts.length ? parts.join('-') : '';
}

function showPreviewFromURL(url, type) {
  const previewArea = document.getElementById('previewArea');
  previewArea.innerHTML = '';
  if (type.startsWith('image/')) {
    const img = document.createElement('img');
    img.src = url;
    previewArea.appendChild(img);
  } else if (type === 'application/pdf') {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.width = "100%";
    iframe.height = "400px";
    previewArea.appendChild(iframe);
  } else {
    previewArea.textContent = '📄 Preview not supported for this file type.';
  }
}

async function uploadToGoogleDrive(fileBlob, fileName, folderName) {
  if (!window.gapi || !gapi.auth2) throw new Error("Google API not ready");

  await gapi.auth2.getAuthInstance().signIn();
  const token = gapi.auth.getToken()?.access_token;
  if (!token) throw new Error("Access token unavailable");

  const folderId = await getOrCreateDriveFolder(folderName, token);
  const metadata = {
    name: fileName,
    mimeType: fileBlob.type,
    parents: [folderId]
  };

  const form = new FormData();
  form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
  form.append("file", fileBlob);

  const res = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name", {
    method: "POST",
    headers: new Headers({ Authorization: "Bearer " + token }),
    body: form
  });

  const result = await res.json();
  alert('✅ Google Drive: ' + result.name);
  listDriveFiles(folderId, token);
}

async function getOrCreateDriveFolder(folderName, token) {
  const query = `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;
  const res = await fetch("https://www.googleapis.com/drive/v3/files?q=" + encodeURIComponent(query), {
    headers: { Authorization: "Bearer " + token }
  });
  const data = await res.json();
  if (data?.files?.length) return data.files[0].id;

  const createRes = await fetch("https://www.googleapis.com/drive/v3/files", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: folderName,
      mimeType: "application/vnd.google-apps.folder"
    })
  });

  const folder = await createRes.json();
  return folder.id;
}

async function listDriveFiles(folderId, token) {
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&fields=files(id,name)`,
    {
      headers: { Authorization: "Bearer " + token }
    }
  );
  const data = await res.json();
  const listEl = document.getElementById('driveFileList');
  listEl.innerHTML = '';
  data.files.forEach(file => {
    const li = document.createElement('li');
    li.textContent = file.name;
    listEl.appendChild(li);
  });
}
