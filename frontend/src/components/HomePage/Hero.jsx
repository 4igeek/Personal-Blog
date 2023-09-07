import React from 'react';
import Typed from 'react-typed';
import '../../assets/css/bg-images.css';

export const Hero = () => {
    return (
        <div className="text-white flex items-center justify-center h-screen bg-fixed bg-center bg-cover paralax mb-0">
            <div className="max-w-[850px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
                <p className="text-[#00df9a] font-bold p-2">
                    WEB INFRUSTRUCTURE THAT IS SOOOO {new Date().getFullYear()}
                </p>
                <h1 className="font-bold md:text-7xl sm:text-6xl text-4xl md:py-2">
                    What the freak? 🚀
                    {/* Looking the business ‍🚀 */}
                </h1>
                <div className="flex justify-center items-center">
                    <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
                        fast, flexible
                    </p>
                    <Typed
                        className="md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2"
                        strings={[
                            'websites', 'web applications', 'personal blogs', 'e-commerce sites', 'search optimisation', 'list building',
                            'code optimisation'
                        ]}
                        typeSpeed={40} backSpeed={60} loop />
                </div>
                <p className="md:text-2xl text-xl font-bold text-gray-400">
                    Welcome to the future of web and app dev.
                </p>
                <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-[#000300] uppercase'>
                    Get started now
                </button>
            </div>
        </div>
    )
}
