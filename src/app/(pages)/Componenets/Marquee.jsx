import React from 'react'

function Marquee() {
  return (
    <div className='bg-white py-3'>
      <marquee behavior="smooth" direction="left" scrollamount="20" className="font-light text-xl md:text-2xl">Have questions or need help? Reach out to our team anytime - we’re here to assist you.</marquee>
    </div>
  )
}

export default Marquee
