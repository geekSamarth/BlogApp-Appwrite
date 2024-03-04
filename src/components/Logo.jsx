import React from 'react'
import logo from "../assets/logo.png"

function Logo({width='200px'}) {
  return (
    <div>
      <img src={logo} alt="logo" width={width}  />
    </div>
  )
}

export default Logo
