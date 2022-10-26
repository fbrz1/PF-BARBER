import React from 'react'
import "../Home/Home.scss"
import NavbarDash from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'


function HomeDash() {
  return (

    
    <div className='home'>
      <Sidebar />
      <div className="homeContainer"> 
        {/* container */}

        <NavbarDash/>
       Welcome
      </div>
      </div>
  )
}

export default HomeDash