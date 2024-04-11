import React from 'react'

const Header = () => {
  return (
    <>
    <header>
        <a href="/" className='logo'>playPort</a>
        <nav>
            <ul>
                <li>
                    <a href="/">home</a>
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
