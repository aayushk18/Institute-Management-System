import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../utils/useAuthStore';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuthStore()

    const staff = {
        userType: 'staff'
    }
    const student = {
        userType: 'student'
    }
    const admin = {
        userType: 'admin'
    }


    const handleLogin = (e) => {
        e.preventDefault();

        console.log('Login ID:', loginId, 'Password:', password);

    };

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md  w-full bg-white p-8 shadow-lg rounded-xl">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block  text-gray-700 mb-1">Login ID</label>
                        <input
                            type="text"
                            placeholder="Write Login ID"
                            value={loginId}
                            onChange={(e) => setLoginId(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Write Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => navigate('/forgot-password')}
                            className="text-sm text-gray-500 hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>
                    <button
                        type="submit"
                        onClick={() => login(admin)}
                        className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;










// import React from 'react'
// import { useAuthStore } from '../utils/useAuthStore'

// const Login = () => {

//     const { login } = useAuthStore()

//     const staff = {
//         userType: 'staff'
//     }
//     const student = {
//         userType: 'student'
//     }
//     const admin = {
//         userType: 'admin'
//     }


//     return (
//         <div className='w-screen h-screen flex flex-row items-center justify-center'>


//             <div className='w-1/3 justify-items-center '>
//                 <div className='text-5xl p-10 font-semibold text-green-500'>Login </div>
//                 <form className='justify-center  flex flex-col gap-6' action="" method="post">

//                     <input type="text" className='placeholder:text-md border-2 placeholder:text-green-600 rounded-md border-green-500 p-3' placeholder='Write Login ID' />

//                     <input type="text" className='placeholder:text-md border-2 placeholder:text-green-600 rounded-md border-green-500 p-3' placeholder='Write Password' />
//                     <button className=' p-3 rounded-md bg-green-500 text-white font-semibold text-xl' onClick={() => login(admin)}>Login</button>

//                 </form>





//             </div>

//             <div className='bg-green-500  w-2/3 h-full'>


//             </div>



//         </div>
//     )
// }

// export default Login