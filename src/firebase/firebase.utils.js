import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyDGVK-Wc2oTFSKfH9CKt-aE3RgWVShkE9k",
    authDomain: "crwn-db-184ee.firebaseapp.com",
    projectId: "crwn-db-184ee",
    storageBucket: "crwn-db-184ee.appspot.com",
    messagingSenderId: "1035747605512",
    appId: "1:1035747605512:web:4c5dd4fdf079997b9ce5bd",
    measurementId: "G-QTWCD38QH0"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  const userRef = await firestore.doc(`users/${userAuth.uid}`); 
  const userSnapshot = await userRef.get();

  if(!userSnapshot.exists){
    console.log("we are going to save this user ...")
    const { displayName, email } = userAuth; 
    const createAt = new Date();

    try {
      userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      })
    } catch (error) {
      console.log("error creating user ", error.message);
    }    
  }else{
    console.log("this user already exists ...")
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => {auth.signInWithPopup(provider)};

export default firebase;