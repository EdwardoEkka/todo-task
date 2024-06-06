// src/app/auth/page.js
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../../firebase';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    const handleAuth = async () => {
        try {
            if (isLogin) {
                await auth.signInWithEmailAndPassword(email, password);
            } else {
                await auth.createUserWithEmailAndPassword(email, password);
            }
            router.push('/');
        } catch (error) {
            console.error("Authentication error:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-md rounded px-8 py-6">
                <h1 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Login' : 'Sign Up'}</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <button
                        onClick={handleAuth}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    >
                        {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
