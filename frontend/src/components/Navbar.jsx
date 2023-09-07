import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

export const Navbar = () => {
    const [nav, setNav] = useState(false);

    const handleSwitchNav = () => {
        setNav(!nav);
    }
    return (
        <div className="sticky top-0 z-50 bg-[#000900] w-full h-20">
            <div className="flex justify-between items-center h-20 mx-auto px-4 max-w-[1240px] text-white">
                <h1 className='w-full text-3xl font-bold text-[#00df9a]'>
                    {process.env.REACT_APP_SITE_NAME}
                </h1>
                <ul className="hidden md:flex">
                    <li className="p-4">HOME</li>
                    <li className="p-4">COMPANY</li>
                    <li className="p-4">ABOUT</li>
                    <li className="p-4">BLOG</li>
                    <li className="p-4">CONTACT</li>
                </ul>
                <div onClick={handleSwitchNav} className={!nav ? "block md:hidden" : "block z-20"}>
                    {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                </div>
                <div className={nav ?
                    'fixed left-0 top-0 w-[50%] h-full border-r border-r-gray-900 bg-[#0F172A] ease-in-out duration-300 z-10'
                    :
                    'fixed left-[-100%]'}>
                    <h1 className='w-full text-3xl fonr-bold text-[#00df9a] m-4'>
                        {process.env.REACT_APP_SITE_NAME}
                    </h1>
                    <ul className="p-4">
                        <li className="p-4 border-b border-gray-600">HOME</li>
                        <li className="p-4 border-b border-gray-600">COMPANY</li>
                        <li className="p-4 border-b border-gray-600">ABOUT</li>
                        <li className="p-4 border-b border-gray-600">BLOG</li>
                        <li className="p-4">CONTACT</li>
                    </ul>
                </div>
                <div onClick={handleSwitchNav} className={nav ?
                    'fixed right-0 top-0 w-[100%] h-full border-r border-r-gray-900 bg-[#0F172A]/[0.4] z-0'
                    :
                    'fixed right-[-100%]'}>


                </div>
            </div>

        </div>
    )
}
