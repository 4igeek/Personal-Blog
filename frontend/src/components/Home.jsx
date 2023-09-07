import React from 'react'
import { Hero } from './HomePage/Hero'
import { Websites } from './HomePage/Websites'
import { Newsletter } from './HomePage/Newsletter'
import { Services } from './HomePage/Services'

export const Home = () => {
    return (
        <>
            <Hero />
            <Websites />
            <Newsletter />
            <Services />
        </>
    )
}
