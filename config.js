// firebase config key setup

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_BYAOLHaytv3oMTMdrXMJytFV6apyJXo",
    authDomain: "email-authentication-49dba.firebaseapp.com",
    projectId: "email-authentication-49dba",
    storageBucket: "email-authentication-49dba.appspot.com",
    messagingSenderId: "830300545623",
    appId: "1:830300545623:web:e823cfa4f16be446d1f912",
    measurementId: "G-D5Z3T2ZBR8"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }