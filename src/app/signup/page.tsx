"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const SignUpPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: '',
        username: ''
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);


    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/signup', user);
            console.log('Signup success', response.data);
            router.push('/login');
        } catch (error: any) {
            console.log('Signup failed: ' + error.message)
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className={'flex flex-col items-center justify-center min-h-screen py-2 antialiased'}>
            <h1>{loading ? 'Processing' : 'Signup'}</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => {
                    setUser({ ...user, username: e.target.value })
                }}
                placeholder="Username"
            />
            <label htmlFor="email">Email</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => {
                    setUser({ ...user, email: e.target.value })
                }}
                placeholder="Email"
            />
            <label htmlFor="password">Password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => {
                    setUser({ ...user, password: e.target.value })
                }}
                placeholder="Password"
            />
            <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                disabled={buttonDisabled}
                onClick={onSignup}>
                SIGN UP
            </button>
            <Link href="/login">Visit Login</Link>
        </div>
    )
}

export default SignUpPage