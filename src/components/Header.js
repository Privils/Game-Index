import React from 'react'

const Header = () => {
  return (
    <>
    <header>
        <a href="/Game-Index" className='logo'>gameIndex</a>
        <nav>
            <ul>
                <li>
                    <a href="/Game-Index">home</a>
                </li>
                <li>
                    <a href="#">contact</a>
                </li>
                <li>
                    <a href="#">login</a>
                </li>
            </ul>
        </nav>
    </header>
    </>
  )
}

export default Header
