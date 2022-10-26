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
      <NavbarDash/>
        <div className="widgets"> 
        
   
          <Widget type = "user"/>
          <Widget type = "order"/>
          <Widget type = "earning"/>
          <Widget type = "balance"/>
        </div>

      <div className="homeContainer"> 
       
      </div>

      </div>
    </div>
  )
}

export default HomeDash