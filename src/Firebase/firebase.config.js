import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAo8xZOQahpq4gU23NvMZHvmBs4idoL8jQ",
    authDomain: "telegram-bot-73219.firebaseapp.com",
    projectId: "telegram-bot-73219",
    storageBucket: "telegram-bot-73219.appspot.com",
    messagingSenderId: "403670540805",
    appId: "1:403670540805:web:08d66ed85f623c06e2b26c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)