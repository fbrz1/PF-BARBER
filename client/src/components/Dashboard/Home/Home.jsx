import React from 'react'
import "../Home/Home.scss"
import NavbarDash from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import Widget from '../Widget/Widget'


function HomeDash() {
  return (


    <div className='home'>
      <Sidebar />

      <div className="homeContainer">
        container
        <div className="widgets">
          <Widget type = "user"/>
          <Widget type = "order"/>
          <Widget type = "earning"/>
          <Widget type = "balance"/>
        </div>
        {/* container aca iria navbar */}

      <div className="homeContainer"> 
        {/* container */}

        <NavbarDash/>
       Welcome
      </div>

      </div>
    </div>
  )
}

export default HomeDash