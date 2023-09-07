import React from 'react'

export const Button = (props) => {
    const { text, center, bg, color, width } = props;
    return (
        <button className={center ?
            `bg-[${bg}] w-[${width}] rounded-md font-medium my-6 mx-auto py-3 text-[${color}] uppercase`
            :
            `bg-[${bg}] w-[${width}] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 text-[${color}] uppercase`
        }>
            {text}
        </button>
    )
}
