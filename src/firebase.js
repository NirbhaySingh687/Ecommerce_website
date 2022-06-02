import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc, setDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyAMd42oxBbYJgMeE8bVDdLAqfQBcojaHC0",
    authDomain: "e-clone1-46ea5.firebaseapp.com",
    projectId: "e-clone1-46ea5",
    storageBucket: "e-clone1-46ea5.appspot.com",
    messagingSenderId: "213169474528",
    appId: "1:213169474528:web:4e0c34c90e074af06fb985",
    measurementId: "G-GV4TENJXMR"
};

const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(app)
const auth = getAuth()
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ login_hint: 'select account'});
const signInWithGoogle = () => signInWithPopup(auth, provider)

export const createUserProfileDocument = async (userAuth, additionalData = {})=>{
    if(!userAuth) return;
    const { email } = userAuth.reloadUserInfo
    const createdAt = new Date()
    const docSnap = await getDoc(doc(fireStore, "users", userAuth.uid))
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const { displayName, email } = docSnap.data()
        try {
            await updateDoc(doc(collection(fireStore, "users"), userAuth.uid), {
                displayName, email, createdAt, ...additionalData
            });
        }catch (err){
            console.log(`##Error found in FireStore`, err)
        }
    } else {
        // doc.data() will be undefined in this case
        const data = {
            email: email,createdAt,
            displayName: !additionalData.displayName? userAuth.displayName : additionalData.displayName,
        }

        await setDoc(doc(fireStore, "users", userAuth.uid), data);
    }
}

export { auth, fireStore, signInWithGoogle }
