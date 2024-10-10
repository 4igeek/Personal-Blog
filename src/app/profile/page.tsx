"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Profile = () => {
    const router = useRouter();

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
        Profile
        <br />
        <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            onClick={logOut}>
            LOG OUT
        </button>
    </div>;
};

export default Profile;
