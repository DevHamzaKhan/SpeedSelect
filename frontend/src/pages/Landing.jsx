import CTA from "@/components/CTA"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import HiringSection from "@/components/HiringSection"
import HowItWorks from "@/components/HowItWorks"
import Navbar from "@/components/Navbar"
import Section1 from "@/components/Section1"
import Section2 from "@/components/Section2"
import Section3 from "@/components/Section3"

const Landing = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Section1 />
      <HowItWorks />
      <Section2 />
      <HiringSection />
      <CTA />
      <Footer />
    </>
  )
}

export default Landing