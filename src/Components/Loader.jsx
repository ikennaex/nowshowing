import React from 'react'
import "../styles/loader.css"

const Loader = () => {
  return (
    <div className=''>
      <svg className='loader-svg' viewBox="25 25 50 50">
  <circle className='loader-circle' r="20" cy="50" cx="50"></circle>
</svg>
    </div>
  )
}

export default Loader
