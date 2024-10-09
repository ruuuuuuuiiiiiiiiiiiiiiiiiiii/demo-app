import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const HeaderComponent = () => {

  const navigator = useNavigate();

  return (
    <div>
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className='navbar-brand ml-2' onClick={() => {navigator('/dashboard')}}>Video Rental System</a>
            <div className="" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className='nav-link' to='/rentals'>Rental</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className='nav-link' to='/customers'>Customer</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className='nav-link' to='/movies'>Movie</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className='nav-link' to='/genres'>Genre</NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </header>
    </div>
  )
}

export default HeaderComponent