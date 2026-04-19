document.addEventListener('DOMContentLoaded', function() {
    // Meniu mobil
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle meniu
        navLinks.classList.toggle('active');
        
        // Animație burger
        burger.classList.toggle('toggle');
        
        // Animație link-uri
        navItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
    
    // Schimbare nav la scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Buton explorare
    const exploreBtn = document.getElementById('explore-btn');
    exploreBtn.addEventListener('click', () => {
        document.querySelector('#about').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Scroll animat pentru link-uri meniu
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.querySelector('a').getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Închide meniul mobil dacă este deschis
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
                navItems.forEach(link => {
                    link.style.animation = '';
                });
            }
            
            // Scroll către secțiunea țintă
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Animație stele pentru fundal
    createStars();
    
    // Efect paralax pentru secțiuni
    setupParallax();
    
    // Animație coliziune galaxii
    setupCollisionAnimation();
    
    // Observator pentru animații la scroll
    setupScrollAnimations();
});

// Funcție pentru crearea stelelor animate
function createStars() {
    const header = document.querySelector('header');
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Poziție aleatorie
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Mărime aleatorie
        const size = Math.random() * 3;
        
        // Durată animație aleatorie
        const duration = Math.random() * 10 + 5;
        
        // Întârziere aleatorie
        const delay = Math.random() * 5;
        
        // Opacitate aleatorie
        const opacity = Math.random() * 0.5 + 0.5;
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;
        star.style.opacity = opacity;
        
        header.appendChild(star);
    }
    
    // Adăugăm stilurile pentru stele
    const style = document.createElement('style');
    style.textContent = `
        .star {
            position: absolute;
            background-color: white;
            border-radius: 50%;
            pointer-events: none;
            animation: twinkle linear infinite;
        }
        
        @keyframes twinkle {
            0% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.5); opacity: 1; }
            100% { transform: scale(1); opacity: 0.3; }
        }
    `;
    document.head.appendChild(style);
}

// Funcție pentru setup efect paralax
function setupParallax() {
    const parallaxSections = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        parallaxSections.forEach(section => {
            const speed = 0.5;
            const offset = scrollPosition * speed;
            section.style.backgroundPositionY = `${offset}px`;
        });
    });
}

// Funcție pentru animația de coliziune
function setupCollisionAnimation() {
    const collisionElement = document.querySelector('.collision-animation');
    
    // Cream particule pentru efect
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Proprietăți aleatorii
        const size = Math.random() * 5 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        collisionElement.appendChild(particle);
    }
    
    // Adăugăm stilurile pentru particule
    const style = document.createElement('style');
    style.textContent = `
        .particle {
            position: absolute;
            background-color: white;
            border-radius: 50%;
            pointer-events: none;
            animation: float linear infinite;
            opacity: 0.7;
        }
        
        @keyframes float {
            0% { transform: translate(0, 0); opacity: 0.7; }
            25% { transform: translate(20px, -20px); opacity: 0.9; }
            50% { transform: translate(40px, 0); opacity: 0.7; }
            75% { transform: translate(20px, 20px); opacity: 0.5; }
            100% { transform: translate(0, 0); opacity: 0.7; }
        }
    `;
    document.head.appendChild(style);
}

// Funcție pentru animații la scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Elemente de animat
    const elementsToAnimate = document.querySelectorAll('.about-content, .fact-card, .gallery-item, .future-content');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    // Adăugăm stilurile pentru animații
    const style = document.createElement('style');
    style.textContent = `
        .about-content {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease;
        }
        
        .about-content.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .fact-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .fact-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .gallery-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .gallery-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .future-content {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease;
        }
        
        .future-content.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.menu-button');
    const sidebar = document.querySelector('.sidebar');
    const closeButton = document.querySelector('.close-button');
    const homeButton = document.querySelector('.home-button');
    
    // Crearea overlay-ului dinamic (dacă nu există deja în HTML)
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
    }
    
    // Funcția principală de toggle sidebar
    function toggleSidebar() {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
        
        // Blocăm scroll-ul când sidebar-ul este deschis
        document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : 'auto';
        
        // Animație buton meniu (transformă în X)
        if (sidebar.classList.contains('open')) {
            menuButton.innerHTML = '&times;';
            menuButton.style.fontSize = '28px';
            menuButton.setAttribute('aria-expanded', 'true');
        } else {
            menuButton.innerHTML = '&#9776;';
            menuButton.style.fontSize = '24px';
            menuButton.setAttribute('aria-expanded', 'false');
        }
    }
    
    // Evenimente pentru deschidere/închidere
    menuButton.addEventListener('click', toggleSidebar);
    closeButton.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);
    
    // Funcționalitate submenuri
    document.querySelectorAll('.menu-item.has-submenu > a').forEach(item => {
        // Adăugăm săgeată dinamic dacă nu există
        if (!item.querySelector('.arrow')) {
            const arrow = document.createElement('span');
            arrow.className = 'arrow';
            arrow.innerHTML = '▼';
            arrow.style.marginLeft = 'auto';
            arrow.style.transition = 'transform 0.3s ease';
            item.appendChild(arrow);
        }
        
        item.addEventListener('click', function(e) {
            // Verificăm dacă facem click pe săgeată sau pe link
            const isArrowClick = e.target.classList.contains('arrow');
            const isSubmenuToggle = this.parentElement.classList.contains('has-submenu');
            
            if (isSubmenuToggle && !isArrowClick && e.target === this) {
                e.preventDefault();
                const submenu = this.nextElementSibling;
                const arrow = this.querySelector('.arrow');
                
                // Toggle vizibilitate submeniu
                submenu.classList.toggle('open');
                submenu.style.maxHeight = submenu.classList.contains('open') ? submenu.scrollHeight + 'px' : '0';
                submenu.setAttribute('aria-hidden', !submenu.classList.contains('open'));
                
                // Rotire săgeată
                if (submenu.classList.contains('open')) {
                    arrow.style.transform = 'rotate(180deg)';
                    this.setAttribute('aria-expanded', 'true');
                } else {
                    arrow.style.transform = 'rotate(0deg)';
                    this.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
    
    // Închidere sidebar la click pe link-uri (exceptând elementele cu submeniu)
    document.querySelectorAll('.sidebar .menu-item:not(.has-submenu) > a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                toggleSidebar();
            }
        });
    });
    
    // Închidere sidebar la resize dacă ecranul devine mare
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && sidebar.classList.contains('open')) {
            toggleSidebar();
        }
        
        // Actualizăm înălțimea submeniurilor deschise
        document.querySelectorAll('.submenu-right.open').forEach(submenu => {
            submenu.style.maxHeight = submenu.scrollHeight + 'px';
        });
    });
    
    // Funcționalitate specială buton home
    homeButton.addEventListener('click', function(e) {
        if (window.innerWidth < 768) {
            toggleSidebar();
        }
    });
    
    // Îmbunătățire accesibilitate
    document.addEventListener('keydown', function(e) {
        // Închidere cu ESC
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            toggleSidebar();
            menuButton.focus();
        }
    });
    
    // Inițializare stări ARIA și submeniuri
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Toggle menu');
    closeButton.setAttribute('aria-label', 'Close menu');
    
    document.querySelectorAll('.submenu-right').forEach(submenu => {
        submenu.setAttribute('aria-hidden', 'true');
        submenu.style.maxHeight = '0';
    });
    
    // Animație de intrare mai fluidă
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                if (sidebar.classList.contains('open')) {
                    document.querySelectorAll('.menu-item').forEach((item, index) => {
                        item.style.animation = `fadeInRight 0.5s ease ${index * 0.1}s forwards`;
                    });
                } else {
                    document.querySelectorAll('.menu-item').forEach(item => {
                        item.style.animation = '';
                    });
                }
            }
        });
    });
    
    observer.observe(sidebar, {
        attributes: true
    });
});