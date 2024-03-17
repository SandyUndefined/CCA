import React, {useState} from 'react'




function Header() {
  const [active, setActive] = useState("nav__menu");
  const [toggleIcon, setToggleIcon] = useState("nav__toggler");

   
  const navToggle = () => {
    active === "nav__menu" ? setActive("nav__menu navb__active") : setActive("nav__menu");

    //toggler icon  

    
    
    toggleIcon === "nav__toggler" ? setToggleIcon("nav__toggler toggle") : setToggleIcon("nav__toggler");
   };
  return (
    <nav className='navb' >

      <a  target='__blank' href="https://www.iitmandi.ac.in" className="brand"><img src="https://sps.iitmandi.ac.in/images/iitlogo.png" /></a>
      <ul className={active}>
        <li className="nav__item"><a href="/#" className="nav__link">Home</a></li>
        
        <li className="nav__item"><a target='__blank' href="https://www.canva.com/design/DAFl-x-HX70/AciH_KN62I30I3ZYvdQ2tw/view?utm_content=DAFl-x-HX70&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink" className="nav__link">About</a></li>
        
        
        <li className="nav__item"><a href="http://faculty.iitmandi.ac.in/~tushar" target="_blank" className="nav__link">Contact</a></li>
        
        <li className="nav__item"><a href="/login" className="nav__link">Login</a></li>
       
        <li className="nav__item"><a href="/registration" className="nav__link">Register</a></li>
      </ul>
      <div onClick={navToggle} className={toggleIcon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>

    </nav>

   

 


  )
}

export default Header






