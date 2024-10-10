"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Profile = () => {
    const router = useRouter();
    const [userID, setUserID] = useState('');

    useEffect(() => {
        const getUserData = async () => {
            const response: any = await axios.get('/api/users/me');
            console.log(response);
            setUserID(response.data.data._id);
        }
        getUserData();
    }, [])

    const logOut = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Log out successful');
            router.push('/login');
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    return <div>
        <h1>Profile</h1>
        <h2>{userID === '' ? 'Nothing' : <Link href={`/profile/${userID}`}>{userID}</Link>}</h2>
        <br />
        <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            onClick={logOut}>
            LOG OUT
        </button>
    </div>;
};

export default Profile;
