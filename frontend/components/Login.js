
import Image from 'next/image'
import React, { useState } from 'react'


function Login() {
    const [registerScreen, setRegisterScreen] = useState(false);
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: '',
        age: '',
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserDetails(prev => ({ ...prev, [name]: value }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userDetails);

        if (registerScreen) {
            fetch('/register', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(userDetails)
            })
        } else {
            fetch('/login', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(userDetails)
            })
                .then(res => res.json())
                .then(data => localStorage.setItem("token", data.token));
        }
        setUserDetails({
            email: '',
            password: '',
            age: '',
        });
        setRegisterScreen(false);
    }

    return (
        <div className="flex justify-center items-center xl:max-w-4xl md:max-w-3xl m-auto min-h-screen">
            <div className='flex border rounded-lg shadow-lg bg-white '>
                <div className='relative max-h-fit w-[340px]'>
                    <Image className=' rounded-tl-lg rounded-bl-lg' src='/netflix-logo.jpg' fill />
                </div>
                <div className="flex flex-col justify-center p-10 ">
                    <h1 className="font-extrabold text-gray-800 px-0 sm:px-4 md:px-0 text-3xl sm:text-4xl xl:text-5xl mb-2 md:mb-3 lg:mb-4 tracking-tighter md:leading-5 ">Fletnix.</h1>
                    <h4 className="md:text-lg text-base font-medium mb-6 md:mb-12 leading-3 lg:leading-3 ">Welcome back ! Please enter your details..</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                            <input type="email" name='email' id="email" value={userDetails.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                        </div>
                        <div className="mb-6">
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name='password' id="password" value={userDetails.password} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                        </div>
                        {registerScreen ?
                            <>
                                <div className="mb-6">
                                    <label for="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                                    <input type="number" name='age' id="age" value={userDetails.age} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                                </div>
                                <button type='submit' className="hover:scale-105 transition-all duration-150 ease-out font-bold py-2 w-full text-white bg-gray-600 rounded-lg cursor-pointer">Create account</button>
                            </> :
                            <button type='submit' className="hover:scale-105 transition-all duration-150 ease-out font-bold py-2 w-full text-white bg-gray-600 rounded-lg cursor-pointer">Sign In</button>
                        }
                    </form>
                    {registerScreen ?
                        <p className='mt-6 text-center'>Already have an account ? <span onClick={() => setRegisterScreen(false)} className='text-red-700 font-semibold cursor-pointer '>Sign in</span></p> :
                        <p className='mt-6 text-center'>Don't have an account ? <span onClick={() => setRegisterScreen(true)} className='text-red-700 font-semibold cursor-pointer '>Sign up</span></p>
                    }
                </div>
            </div>

        </div>
    )
}

export default Login