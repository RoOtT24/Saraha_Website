import React from 'react'
import { Link } from 'react-router-dom'
import cookie from 'react-cookies'

const Navbar = ({user, setUser}) => {
  const logout = ()=>{
    setUser(null)
    cookie.remove('token')
  }
  return (
    <nav className="navbar navbar-expand-lg bg-custom navbar-dark bg-dark">
  <div className="container">
    <Link className="navbar-brand" to="/">
      <img src='/assets/img/logo300.png' width={54} alt="" /> </Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      Menu <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto ">
        {
          user?<>
           <li className="nav-item">
            <Link className="nav-link" to="/home">Users List</Link>
          </li>
           <li className="nav-item">
            <Link className="nav-link" to="/messages">My Messages</Link>
          </li>
           <li className="nav-item">
            <a className="nav-link" href="#" onClick={logout}>Logout</a>
          </li>
          </>
          :<>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          </>
        
        }
        
      </ul>
    </div>
  </div>
</nav>

  )
}

export default Navbar