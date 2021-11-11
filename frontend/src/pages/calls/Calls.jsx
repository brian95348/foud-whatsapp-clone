import React from 'react'
import './Calls.css'
import {Link} from 'react-router-dom'

function Calls() {
  
  return (
    <section className="calls-home">
      <div className="calls-text">
        <h1>ooops...empty call log</h1>
        <Link className="shop-link" to="/products">Shop Now</Link>
      </div>
    </section>
  )
}

export default Calls
