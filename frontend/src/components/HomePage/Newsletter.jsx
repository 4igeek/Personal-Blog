import React from 'react'

export const Newsletter = () => {
    return (
        <div className="w-full py-32 text-white bg-fixed bg-center bg-cover paralax">
            <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3">
                <div className="lg:col-span-2 my-2 px-4 mt-4">
                    <h1 className="font-bold md:text-4xl sm:text-3xl text-2xl md:py-4 py-2">
                        Want to future proof your business?
                    </h1>
                    <p>
                        As a developer with a BSc in Computer Science (Artificial Intelligence) I'm passionate about the web.
                    </p>
                </div>
                <div className="my-4 px-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between w-full">
                        <input className="p-3 flex w-full rounded-md px-4 mx-2"
                            type="email" name="" id="newsletter-signup" placeholder="Enter email" />
                        <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-[#000300] uppercase'>
                            Submit
                        </button>
                    </div>
                    <p className="px-2" >Learn more about our <span className="text-[#00df9a]">Privacy Policy</span>.</p>
                </div>
            </div>
        </div>
    )
}
