import React from 'react'
import HeroImage from '../assets/images/bg.jpg'
import { Image } from 'react-bootstrap'

const Hero = () => {
    return (
        <div className='hero'>
            <Image src={HeroImage} />
        </div>
    )
}

export default Hero
