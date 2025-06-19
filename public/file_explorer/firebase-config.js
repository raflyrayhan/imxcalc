import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDt26ia5MSsNnXDPYwgE_EfbeZEL7Ibjcs",
  authDomain: "imxcalc.firebaseapp.com",
  projectId: "imxcalc",
  storageBucket: "imxcalc.firebasestorage.app",
  messagingSenderId: "63050833117",
  appId: "1:63050833117:web:98c11b7f863cd363f24f34",
  measurementId: "G-E6ZTN06G7K"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
