import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import { Container } from 'react-bootstrap'

const App = () => {
  return (
    <div>
      <Header />
      <Hero />

      <Container>
        <HomeScreen />
      </Container>

      <Footer />
    </div>
  )
}

export default App
