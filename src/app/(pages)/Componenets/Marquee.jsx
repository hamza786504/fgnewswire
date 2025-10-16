import React from 'react'

function Marquee() {
  return (
    <div className='bg-white py-3'>
      <marquee behavior="smooth" direction="left" scrollamount="20" className="font-light text-xl md:text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, at!</marquee>
    </div>
  )
}

export default Marquee
