import React, { useEffect } from 'react';
// import firebaseui from 'firebaseui';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { getAuth } from 'firebase/auth';
import { app, firebaseConfig } from '../firebase/firebase.config';


const PhoneVerify = () => {
    // const auth = getAuth(app);
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    useEffect(() => {
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
        ui.start('.firebase-phone-verify', {
            signInOptions: [
                firebase.auth.PhoneAuthProvider.PROVIDER_ID
            ],
            signInSuccessUrl: 'http://localhost:5173/success_message'
        })
    })

    return (
        <div className='firebase-phone-verify'>

        </div>
    );
};

export default PhoneVerify;