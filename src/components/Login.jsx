import React, { useContext, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link } from 'react-router-dom';
import { app } from '../firebase/firebase.config';
import { UserInfoContext } from '../App';

const auth = getAuth(app);
const Login = () => {
    const [userInfo, setUserInfo] = useContext(UserInfoContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const formRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        console.log(email);
        console.log(password);
        setErrorMessage('');
        setSuccessMessage('');
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setUserInfo(result.user);
                formRef.current.reset();
                setSuccessMessage('Successfully logged in');
            })
            .catch(error => {
                console.log(error.message);
                setErrorMessage(error.code);
            })
    }

    const handleGoogleSignIn = () => {
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log(result.user);
                setUserInfo(result.user);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleGitHubSignIn = () => {
        const gitHubProvider = new GithubAuthProvider();
        signInWithPopup(auth, gitHubProvider)
            .then(result => {
                console.log(result.user);
                setUserInfo(result.user)
            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleResetPassword = () => {
        setErrorMessage('');
        const email = emailRef.current.value;
        if(!email){
            setErrorMessage('enter your email');
            return;
        }
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setSuccessMessage('Password reset email sent!')
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    return (
        <div className='container mx-auto my-5'>
            <div className="bg-gray-100 flex flex-col gap-5 items-center justify-center h-screen">
                <div className="bg-white p-8 rounded shadow-md w-96">
                    <h2 className="text-2xl font-semibold mb-4">Login</h2>

                    <form onSubmit={handleSubmit} ref={formRef}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-600 text-sm font-medium mb-2">Email</label>
                            <input type="email" id="email" name="email" required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" ref={emailRef} />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">Password</label>
                            <input type="password" id="password" name="password" required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" ref={passwordRef} />
                        </div>
                        {
                            errorMessage &&
                            <div className='mb-3'>
                                <p className='text-red-400'>{errorMessage}</p>
                            </div>
                        }
                        {
                            successMessage &&
                            <>
                                <div className='mb-3'>
                                    <p className='text-blue-400'>{successMessage}</p>
                                </div>
                                {
                                    setTimeout(() => {
                                        setSuccessMessage('');
                                    }, 5000)
                                }
                            </>
                        }

                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue mb-4">
                            Log In
                        </button>
                        <p>Forget password ? <span className='text-blue-500 cursor-pointer' onClick={handleResetPassword}>Reset</span></p>
                    </form>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Login using social media</h2>
                    <div className='flex gap-5 bg-blue-400 text-white p-1 items-center rounded-sm cursor-pointer' onClick={handleGoogleSignIn}>
                        <FontAwesomeIcon icon={faGoogle} className='text-2xl p-3 bg-white text-black rounded-sm' />
                        <p className='text-xl font-semibold'>Sign in with Google</p>
                    </div>
                    <div className='flex gap-5 bg-black mt-5 text-white p-1 items-center rounded-sm cursor-pointer' onClick={handleGitHubSignIn}>
                        <FontAwesomeIcon icon={faGithub} className='text-2xl p-3 bg-white text-black rounded-sm' />
                        <p className='text-xl font-semibold'>Sign in with GitHub</p>
                    </div>
                    <div className='mt-5'>
                        <p className='text-center'>Don't have account? <Link to='/register' className='text-blue-500'> Register </Link>here</p>
                    </div>
                    <div className='mt-5'>
                        <p className='text-center'>Or login using<Link to='/phone_verify' className='text-blue-500'> Phone Number </Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;