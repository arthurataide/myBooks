import React from 'react'
import {Link} from 'react-router-dom'
import errorimg from './icons/404error.jpg'

function ErrorPage(){
	return (
      <div>
      <img src={errorimg} style={{width: 400, height: 400, display: 'block', margin: 'auto', position: 'relative' }} />
      <center><Link to="/">Return to Home Page</Link></center>
      </div>
    ) 
}

export default ErrorPage