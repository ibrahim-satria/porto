document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Navbar Responsif & Menu Toggle ---
    const menuIcon = document.getElementById('menu-icon');
    const navList = document.getElementById('nav-list');
    const header = document.querySelector('header');

    if (menuIcon && navList) {
        menuIcon.addEventListener('click', () => {
            navList.classList.toggle('active');
            const icon = menuIcon.querySelector('i');
            if (navList.classList.contains('active')) {
                icon.classList.replace('bx-menu', 'bx-x');
            } else {
                icon.classList.replace('bx-x', 'bx-menu');
            }
        });

        // Close menu on link click
        document.querySelectorAll('#nav-list li a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                const icon = menuIcon.querySelector('i');
                if (icon) icon.classList.replace('bx-x', 'bx-menu');
            });
        });
    }

    // --- 2. Sticky Header & Active Link Tracking ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- 3. Scroll Reveal Animation ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // --- 4. Typing Effect for Hero Subtitle ---
    const textElement = document.querySelector('.hero-text h3');
    if (textElement) {
        const text = textElement.innerText;
        textElement.innerText = "";
        let i = 0;
        function type() {
            if (i < text.length) {
                textElement.innerText += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        }
        type();
    }

    // --- 5. Logika Form Kontak (Formspree) ---
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            fetch("https://formspree.io/f/xlgkkkwk", { 
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert("Thank you! Your message has been sent successfully.");
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            alert(data["errors"].map(error => error["message"]).join(", "));
                        } else {
                            alert("Oops! There was a problem submitting your form");
                        }
                    })
                }
            })
            .catch(error => {
                alert("Oops! There was a problem submitting your form");
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});