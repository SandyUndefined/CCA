document.addEventListener("DOMContentLoaded", function () {
    const handleMobileMenu = () => {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.left');
        const navMenu2 = document.querySelector('.right');

        if (hamburger && navMenu && navMenu2) {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            navMenu2.classList.toggle('active');
        }
    };

    const handleCloseMenu = () => {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.left');

        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    };

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', handleMobileMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', handleCloseMenu);
    });

    return () => {
        if (hamburger) {
            hamburger.removeEventListener('click', handleMobileMenu);
        }
        navLinks.forEach(link => {
            link.removeEventListener('click', handleCloseMenu);
        });
    };
});

document.getElementById('navToggler').addEventListener('click', navToggle);

function navToggle() {
  const navMenu = document.getElementById('navMenu');
  const navToggler = document.getElementById('navToggler');

  // Toggle the active class for the menu
  navMenu.classList.toggle('navb__active');

  // Toggle the active class for the toggler icon
  navToggler.classList.toggle('toggle');
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
  
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
  
      if (data.password !== data.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
  
      try {
        const response = await fetch('YOUR_BACKEND_URL/user/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          console.log('User signed up successfully!');
          window.location.href = './login'; // Redirect to login page
        } else {
          console.error('Error signing up:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    });
  });
  


  