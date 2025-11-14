import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SectionExperience from './components/SectionExperience'
import SectionTarot from './components/SectionTarot'
import SectionChocolates from './components/SectionChocolates'
import ProductCard from './components/ProductCard'
import SectionHowItWorks from './components/SectionHowItWorks'
import SectionReviews from './components/SectionReviews'
import SectionFAQ from './components/SectionFAQ'
import CTAFinal from './components/CTAFinal'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import VideoModal from './components/VideoModal'
import PolicyModal from './components/PolicyModal'
import MusicPlayer from './components/MusicPlayer'
import Success from './pages/Success'
import Failure from './pages/Failure'
import Pending from './pages/Pending'

function HomePage({ onCartClick, onVideoClick, onPolicyClick }) {
  return (
    <>
      <Navbar onCartClick={onCartClick} />
      <main>
        <Hero onVideoClick={onVideoClick} />
        <SectionExperience />
        <SectionTarot />
        <SectionChocolates />
        
        {/* Sección de Producto */}
        <section id="producto" className="section-container">
          <ProductCard onAddToCart={onCartClick} />
        </section>
        
        <SectionHowItWorks />
        <SectionReviews />
        <SectionFAQ />
        <CTAFinal />
      </main>
      <Footer onPolicyClick={onPolicyClick} />
    </>
  )
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [policyModalContent, setPolicyModalContent] = useState(null)

  const openPolicyModal = (type) => {
    setPolicyModalContent(type)
  }

  const closePolicyModal = () => {
    setPolicyModalContent(null)
  }

  return (
    <div className="relative min-h-screen">
      {/* Fondo estrellado */}
      <div className="stars-background" />
      
      {/* Rutas */}
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              onCartClick={() => setIsCartOpen(true)}
              onVideoClick={() => setIsVideoOpen(true)}
              onPolicyClick={openPolicyModal}
            />
          } 
        />
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />
        <Route path="/pending" element={<Pending />} />
      </Routes>
      
      {/* Modals y Drawers */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
      <PolicyModal 
        isOpen={policyModalContent !== null} 
        onClose={closePolicyModal}
        type={policyModalContent}
      />
      
      {/* Music Player */}
      <MusicPlayer />
    </div>
  )
}

export default App

