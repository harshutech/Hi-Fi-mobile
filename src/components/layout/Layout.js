import React from 'react'
import Header from './Header'
import Footer from './Footer'

function Layout(props) {
  return (
    <div>
        {/* header */}
        <Header/>

        {/* main body */}
        <main style={{minHeight: "80vh"}}>

        {props.children}
        </main>


        {/* footer */}
        <Footer>

        </Footer>

    </div>
  )
}

export default Layout