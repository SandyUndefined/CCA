import React from 'react'

function Header() {
  return (
    <div>
     <nav class="nav">
      <div class="left">
        <img src="./images/white logo.png" alt="" />
        <a target="_blank" href="https://www.iitmandi.ac.in"></a>
        <a href="/">Home</a>
        <a
          target="_blank"
          href="https://www.canva.com/design/DAFl-x-HX70/AciH_KN62I30I3ZYvdQ2tw/view?utm_content=DAFl-x-HX70&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink"
          >About
          </a>
        <a href="http://faculty.iitmandi.ac.in/~tushar" target="_blank">
            Contact
        </a>
      </div>
      <div class="right">
        <a href="/login">Login</a>
        <p>/</p>
        <a href="/registration">Register</a>
      </div>
    </nav>
    </div>
  )
}

export default Header