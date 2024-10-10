"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {Axios} from 'axios';

const SignUpPage = () => {
    const [user, setUser] = useState({
        email:'',
        password:'',
        username:''
    });

    const onSignup = () => {

    }
  return (
    <div className={'flex flex-col items-center justify-center min-h-screen py-2 antialiased'}>
        <h1>Signup</h1>
        <hr />
        <label htmlFor="username">Username</label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="username" 
            type="text" 
            value={user.username} 
            onChange={(e)=>{
                setUser({...user, username: e.target.value})
            }} 
            placeholder="Username"
        />
        <label htmlFor="email">Email</label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="email" 
            type="email" 
            value={user.email} 
            onChange={(e)=>{
                setUser({...user, email: e.target.value})
            }} 
            placeholder="Email"
        />
        <label htmlFor="password">Password</label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="password" 
            type="password" 
            value={user.password} 
            onChange={(e)=>{
                setUser({...user, password: e.target.value})
            }} 
            placeholder="Password"
        />
        <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onSignup}>
            SIGN UP
        </button>
        <Link href="/login">Visit Login</Link>
    </div>
  )
}

export default SignUpPage