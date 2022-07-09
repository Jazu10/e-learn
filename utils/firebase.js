import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
   apiKey: "AIzaSyC0aMyz8qSEmYUQfMnzURHV2x0oCVuYgRY",
   authDomain: "elearn-ivory.firebaseapp.com",
   projectId: "elearn-ivory",
   storageBucket: "elearn-ivory.appspot.com",
   messagingSenderId: "545500720328",
   appId: "1:545500720328:web:73ce578f9d8b3627a549fd",
};

let app;
if (firebase.apps.length === 0) {
   app = firebase.initializeApp(firebaseConfig);
} else {
   app = firebase.app();
}

const storage = firebase.storage();
export { storage, firebase as default };
