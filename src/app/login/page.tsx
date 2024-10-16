"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            console.log("Login successful: " + response.data)
            toast.success("Login successful");
            router.push('/profile')
        } catch (error: any) {
            console.log('Login failed: ' + error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={'flex flex-col items-center justify-center min-h-screen py-2 antialiased'}>
            <h1>{loading ? 'Processing' : 'Login'}</h1>
            <hr />
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
                onClick={onLogin}>
                LOGIN
            </button>
            <Link href="/signup">Visit Signup</Link>
        </div>
    )
}

export default LoginPage