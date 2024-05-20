import React from 'react'
import AboutHero from '../components/about-page/about-hero/AboutHero'
import AboutWhatwedo from '../components/about-page/about-whatwedo/AboutWhatwedo'
import AboutAbout from '../components/about-page/about-about/AboutAbout'
import AboutTestimonials from '../components/about-page/about-testimonials/AboutTestimonials'
import AboutTeam from '../components/about-page/about-team/AboutTeam'

export default function page() {
  return (
    <div className='mt-16'>
      <AboutHero />
      <AboutWhatwedo />
      <AboutAbout />
      <AboutTestimonials />
      <AboutTeam />
    </div>
  )
}
