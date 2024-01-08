import React, { useEffect, useState, useRef } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
// import { jwtDecode } from "jwt-decode";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import LoginValidation from './LoginValidation';
import Preloader from '../pages/Preloader';

function Login({ URL }) {
    const [credentials, setCredentials] = useState({
        'email': '',
        'password': ''
    })
    const navigate = useNavigate()
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const [clickLogin, setClickedLogin] = useState(false)
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [readOnly, setReadOnly] = useState(true);
    const [preloader, setPreloder] = useState(false)

    function handleCredentialChange(e) {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        if (clickLogin) {
            let tempError = LoginValidation({ ...credentials, [e.target.name]: e.target.value })
            setErrors(tempError)
        }
        else {
            setErrors({})
        }
    }

    async function handleLogin(e) {
        e.preventDefault()
        let tempError = LoginValidation(credentials)
        setErrors(tempError)
        setClickedLogin(true)
        if (tempError.email){
            emailInputRef.current.focus();
        }
        else if (tempError.password){
            passwordInputRef.current.focus();
        }
        if (!tempError.email && !tempError.password) {
            setPreloder(true)
            const form = new FormData();
            form.append('username', credentials.email)
            form.append('password', credentials.password)
            const fetchReq = {
                method: 'POST',
                headers: {
                    'Constent-Type': 'application/json',
                },
                body: form
            }
            const response = await fetch(URL + 'auth/signin/', fetchReq)
            const status_code = response.status
            const data = await response.json()
            setPreloder(false)
            if (status_code == 401) {
                tempError = {}
                if (data.detail === 'User not found') {
                    tempError.email = data.detail
                    if (emailInputRef.current) {
                        emailInputRef.current.focus();
                    }
                }
                else {
                    tempError.password = data.detail
                    if (passwordInputRef.current) {
                        passwordInputRef.current.focus();
                    }
                }
                setErrors(tempError)
                setClickedLogin(false)
            }
            else if (status_code == 200) {
                console.log(data,data.email,data.access_token)
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('email', data.email)
                localStorage.setItem('username', data.username)
                console.log('Logging you in ......')
                navigate('/chat')
            }
            setClickedLogin(false)
        }

    };
    function handleShowPassword() {
        setShowPassword(!showPassword)
    }

    return (
        <div>
            {preloader ? (
                <Preloader />

            ): (
                <section className="bg-white dark:bg-gray-900">

            <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                <form className="w-full max-w-md">
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
                    </div>

                    <h1 className="mt-4 text-2xl font-semibold tracking-wide text-center text-gray-800 capitalize md:text-3xl dark:text-white">
                        welcome Back
                    </h1>

                    <div className="relative flex items-center mt-8">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </span>

                        <input
                            ref={emailInputRef}
                            type="email"
                            name='email'
                            value={credentials.email}
                            onChange={handleCredentialChange}
                            required
                            readOnly={readOnly}
                            onFocus={() => setReadOnly(false)}
                            onBlur={() => {
                                setReadOnly(true);
                            }}

                            className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 ${errors.email == null ? 'dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300' : 'border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300'} focus:outline-none focus:ring focus:ring-opacity-40`}
                            placeholder="Email address"

                        />


                        {/* {errors.email && <p className=''>{errors.email}</p>} */}
                    </div>
                    {errors.email &&
                        <span className='mt-2 text-sm text-red-500'>
                            {errors.email}
                        </span>
                    }


                    <div className="relative flex items-center mt-4">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>

                        <input
                            ref={passwordInputRef}
                            name='password'
                            value={credentials.password}
                            required
                            onChange={handleCredentialChange}
                            type={showPassword ? "text" : "password"}
                            className={`block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 ${errors.password == null ? 'dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300' : 'border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300'} focus:outline-none focus:ring focus:ring-opacity-40`}
                            placeholder="Password"
                        />
                        {showPassword ? (
                            <EyeIcon onClick={handleShowPassword} className="h-5 w-5 text-gray-500 my-auto absolute inset-y-0 right-3 items-center cursor-pointer" />
                        ) : (
                            <EyeSlashIcon onClick={handleShowPassword} className="h-5 w-5 text-gray-500 my-auto absolute inset-y-0 right-3 items-center cursor-pointer" />
                        )
                        }
                    </div>
                    {errors.password &&
                        <span className='mt-2 text-sm text-red-500'>
                            {errors.password}
                        </span>
                    }

                    <div className="mt-6">
                        <button
                            onClick={handleLogin}
                            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            Sign in
                        </button>

                        {/* <p className="mt-4 text-center text-gray-600 dark:text-gray-400">or sign in with</p> */}

                        {/* <a href="#" class="flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <svg class="w-6 h-6 mx-2" viewBox="0 0 40 40">
                                <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                                <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                                <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                                <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                            </svg>

                            <span  class="mx-2">Sign in with Google</span>
                        </a> */}
                        {/* <div >
                            <LoginSocialGoogle
                                
                                client_id={'473534712585-h7a40hi55fs8oo350rnud634ksuvsb0v.apps.googleusercontent.com'}
                                scope="openid profile email"
                                discoveryDocs="claims_supported"
                                access_type="offline"
                                onResolve={({ provider, data }) => {
                                    console.log(provider)
                                    console.log(data,'************');

                                    
                                }}
                                onReject={(err) => {
                                    console.log(err);
                                }}
                            >
                                <GoogleLoginButton
                                />
                            </LoginSocialGoogle>
                        </div> */}
                        <div id='SignInDiv'>

                        </div>

                        <div className="mt-6 text-center ">
                            <Link to='/signup' className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                                Don’t have an account yet? Sign up
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </section>


                )}
        </div>
    );
};

export default Login;
