import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA_4x1Ta8JFS7TzLuC9CqfkKSmCFXyvIgM",
  authDomain: "web-virtual-lib.firebaseapp.com",
  projectId: "web-virtual-lib",
  storageBucket: "web-virtual-lib.appspot.com",
  messagingSenderId: "378447725087",
  appId: "1:378447725087:web:a0c6b4971a5a6905b3cb2a",
  measurementId: "G-0L5ZZSSL8F",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);