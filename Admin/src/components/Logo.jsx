import React, { useEffect, useState } from 'react'

const Logo = ({ rounded = false, className = '', url = '' }) => {
    return (
    <div className={(rounded ? 'rounded-full' : '') + ` overflow-hidden ` + className}>
      <img src={url} alt="logo" className="w-fit h-fit object-cover" />
    </div>
  )
}

export default Logo
