      const scrollContainer = document.documentElement;
      let scrollPos = 0;
      let targetScroll = 0;
      let easeFactor = 0.05;

      function loadAppropriatePage() {
        if (window.innerWidth < 800) {
          if (!localStorage.getItem('redirectedToMobile')) {
            localStorage.setItem('redirectedToMobile', 'true');
            window.location.href = 'indexMobile.html';
          }
        } 
        else {
          if (localStorage.getItem('redirectedToMobile')) {
            localStorage.removeItem('redirectedToMobile');
            window.location.href = 'index.html';
          }
        }
      }
    
      window.addEventListener('load', loadAppropriatePage);
    
      window.addEventListener('resize', function() {
        loadAppropriatePage();
      });
      
      function smoothScroll() {
        targetScroll = Math.max(0, Math.min(targetScroll, scrollContainer.scrollWidth - scrollContainer.clientWidth));
        scrollPos += (targetScroll - scrollPos) * easeFactor;
        scrollContainer.scrollLeft = scrollPos;
        requestAnimationFrame(smoothScroll);
      }

      document.addEventListener("wheel", (event) => {
        event.preventDefault();
        targetScroll += event.deltaY + event.deltaX;
        targetScroll = Math.max(0, Math.min(targetScroll, scrollContainer.scrollWidth - scrollContainer.clientWidth));
      }, {
        passive: false
      });

      smoothScroll();

      const navBar = document.getElementById("navBar");
      const sectionOne = document.querySelector(".sectionOne");

      function toggleNavBar() {
        if (scrollContainer.scrollLeft > sectionOne.offsetWidth * 0.5) {
          navBar.style.transform = "translate(-50%, 0)";
        } else {
          navBar.style.transform = "translate(-50%, 150%)";
        }
      }

      document.addEventListener("scroll", toggleNavBar);

      document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          const targetClass = event.target.getAttribute("data-target");
          if (targetClass) {
            const targetSection = document.querySelector(targetClass);
            if (targetSection) {
              targetScroll = targetSection.offsetLeft;
            }
          }
        });
      });

      document.querySelectorAll('.workContainer a').forEach(link => {
        link.addEventListener('click', event => {
          event.preventDefault();
          const href = link.getAttribute('href');
      
          localStorage.setItem('scrollX', window.scrollX);
          localStorage.setItem('scrollY', window.scrollY);
          localStorage.setItem('scrollTime', Date.now()); // Save the timestamp too
      
          setTimeout(() => {
            window.location.href = href;
          }, 50);
        });
      });
      
      window.addEventListener('load', () => {
        const scrollX = localStorage.getItem('scrollX');
        const scrollY = localStorage.getItem('scrollY');
        const scrollTime = localStorage.getItem('scrollTime');
      
        if (scrollX !== null && scrollY !== null && scrollTime !== null) {
          const now = Date.now();
          const maxAge = 5 * 60 * 1000; // 5 minutes in milliseconds
      
          if (now - scrollTime < maxAge) {
            window.scrollTo({
              top: parseFloat(scrollY),
              left: parseFloat(scrollX),
              behavior: 'smooth'
            });
          }
      
          localStorage.removeItem('scrollX');
          localStorage.removeItem('scrollY');
          localStorage.removeItem('scrollTime');
        }
      });