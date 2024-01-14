import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons';
import app from '../firebase/firebase.config';

const auth = getAuth(app);

const Register = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPass, setShowPass] = useState(false);
    const formRef = useRef();
    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleRegister = (event) => {
        event.preventDefault();
        const userName = userNameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        console.log(userName);
        console.log(email);
        console.log(password);
        setErrorMessage('');
        setSuccessMessage('');
        if (!/.{8}/.test(password)) {
            setErrorMessage('password must contain at least 8 character');
            return;
        }
        else if (!/(?=.*[A-Z])/.test(password)) {
            setErrorMessage('password must contain at least 1 upperCase');
            return;
        }
        else if (!/(?=.*[0-9])/.test(password)) {
            setErrorMessage('password must contain at least 1 digit');
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setUserName(result.user, userName);
                sendUserVerificationEmail(result.user);
                alert('please verify your email');
                formRef.current.reset();
                setSuccessMessage('Account created successfully');
            })
            .catch(error => {
                console.log(error.message);
                setErrorMessage(error.code)
            })
    }
    const setUserName = (user, userName) => {
        updateProfile(user, { displayName: userName })
        .then(() => {

        })
        .catch(error => {
            console.log(error);
        })
    }
    const sendUserVerificationEmail = (user) => {
        sendEmailVerification(user);
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className='text-xl font-bold'>Register</h1>
            <form onSubmit={handleRegister} ref={formRef} className="w-full max-w-md p-4 bg-white rounded-md shadow-md">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        ref={userNameRef}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        ref={emailRef}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                        Password:
                    </label>
                    <div className='relative'>
                        <input
                            type={showPass ? 'text' : 'password'}
                            id="password"
                            name="password"
                            ref={passwordRef}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                        <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} className='absolute top-3 right-3 cursor-pointer' onClick={() => setShowPass(!showPass)} />
                    </div>
                </div>
                {
                    errorMessage &&
                    <div className='mb-4'>
                        <p className='text-red-400'>{errorMessage}</p>
                    </div>
                }
                {
                    successMessage &&
                    <div className='mb-4'>
                        <p className='text-blue-400'>{successMessage}</p>
                    </div>
                }

                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>
                <div className='mt-5'>
                    <p className='text-center'>Already have an account? <Link to='/login' className='text-blue-500'> login </Link>here</p>
                </div>
            </form>
        </div>
    );
};

export default Register;