import React from 'react'
import "../Home/Home.scss"
import NavbarDash from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import Widget from '../Widget/Widget'
import Featured from '../Featured/Featured'


function HomeDash() {
  return (


    <div className='home'>
      <Sidebar />

<<<<<<< HEAD
      <div className="homeContainer">
        <NavbarDash />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>

        <div className='charts'>
          <Featured />
          <h2 style={{flex: 4}}>Componente barbi</h2>
        </div>
=======
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
>>>>>>> 49e3a3107a255ce304038d04167759ea7b389cf0

      </div>
    </div>
  )
}

export default HomeDash