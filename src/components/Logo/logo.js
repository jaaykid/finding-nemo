import React from 'react'
import Tilt from 'react-tilt'
import eyes from './finding.png'
import './Logo.css'


const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt className="Tilt" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner pa3 "><img style={{paddingTop: '5px'}} src={eyes} alt="eye logo"/></div>
      </Tilt>
    </div>
  )
}

export default Logo