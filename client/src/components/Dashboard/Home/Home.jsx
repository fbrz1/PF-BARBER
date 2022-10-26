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

      </div>
    </div>
  )
}

export default HomeDash