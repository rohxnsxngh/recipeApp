import { createApp } from "vue";
import "./style.css";
import "./index.css";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";
import 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWmnuUiTMP585hnCagslUfJFX7Vq6zDOM",
  authDomain: "rohxnchat.firebaseapp.com",
  projectId: "rohxnchat",
  storageBucket: "rohxnchat.appspot.com",
  messagingSenderId: "570725157913",
  appId: "1:570725157913:web:ec765d240abdacfec32e88",
  measurementId: "G-P9MHGBJY8X",
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firestore = firebaseApp.firestore();
createApp(App).use(router).mount("#app");

export default firestore
