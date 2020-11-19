import React from 'react'
import HeroImage from '../assets/images/Hero.png'
import { Image, Jumbotron, Row, Col, Button } from 'react-bootstrap'

const Hero = () => {
    return (
        <div className='hero'>
            <Jumbotron>
                <Row style={{  }}>
                    <Col md={6} style={{ marginTop: '100px', marginLeft: '50px' }}>
                        <h1>Looking for a new Tools?</h1>
                        <h4>Time to upgrade !!</h4>
                        <Button style={{ marginTop: '30px' }}>Shop now</Button>

                    </Col>

                    <Col md={5}>
                        <Image src={HeroImage} style={{ marginTop: '60px', width: '450px' }}/>
                    </Col>
                </Row>
            </Jumbotron>
            
        </div>
    )
}

export default Hero
