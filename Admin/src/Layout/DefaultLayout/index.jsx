import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Layouts/Header'
import Footer from '../../components/Layouts/Footer'

const index = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default index
