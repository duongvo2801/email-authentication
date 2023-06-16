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
    appId: "1:830300545623:web:b8be3c981d131198d1f912",
    measurementId: "G-Q3TQ652WKR"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };