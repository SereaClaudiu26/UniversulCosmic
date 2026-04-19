document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    menuToggle.addEventListener('click', function() {
        navbar.classList.toggle('active');
        menuToggle.innerHTML = navbar.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Explore button
    document.getElementById('exploreBtn').addEventListener('click', function() {
        document.getElementById('planets').scrollIntoView({ behavior: 'smooth' });
    });

    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#4e54c8", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }

    // Load content
    loadContent('planetsContainer', planetsData, 'planet');
    loadContent('starsContainer', starsData, 'star');
    loadContent('galaxiesContainer', galaxiesData, 'galaxy');

    // Modal functionality
    const modal = document.getElementById('infoModal');
    const closeModal = document.querySelector('.close-modal');

    closeModal.addEventListener('click', function() {
        modal.classList.remove('show');
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Scroll animations
    initScrollAnimations();
});

// Content data - TOATE PLANETELE
const planetsData = [
    {
        name: "Mercur",
        image: "imagini/mercur.jpg",
        description: "Cea mai mică planetă din sistemul nostru solar și cea mai apropiată de Soare.",
        details: {
            "Distanța de la Soare": "57.9 milioane km",
            "Diametru": "4.880 km",
            "Perioadă orbitală": "88 zile pământești",
            "Temperatură": "-173°C la 427°C",
            "Atmosferă": "Practic inexistentă",
            "Gravitație": "0.38g"
        }
    },
    {
        name: "Venus",
        image: "imagini/Venus.jpg",
        description: "Cunoscută ca planeta geamăn a Pământului din cauza dimensiunii similare.",
        details: {
            "Distanța de la Soare": "108.2 milioane km",
            "Diametru": "12.104 km",
            "Perioadă orbitală": "225 zile",
            "Temperatură": "462°C (media)",
            "Atmosferă": "96.5% CO₂, presiune 92x Pământ",
            "Rotatie": "243 zile (retrogradă)"
        }
    },
    {
        name: "Pământ",
        image: "imagini/caracteristicile-planetei-terra.webp",
        description: "Singura planetă cunoscută care susține viața.",
        details: {
            "Distanța de la Soare": "149.6 milioane km",
            "Diametru": "12.742 km",
            "Perioadă orbitală": "365.25 zile",
            "Temperatură": "-89°C la 58°C",
            "Satelit natural": "Luna",
            "Compoziție atmosferă": "78% N₂, 21% O₂"
        }
    },
    {
        name: "Marte",
        image: "imagini/marte.jpg",
        description: "Cunoscută ca Planeta Roșie datorită oxidului de fier de pe suprafața sa.",
        details: {
            "Distanța de la Soare": "227.9 milioane km",
            "Diametru": "6.779 km",
            "Perioadă orbitală": "687 zile",
            "Temperatură": "-153°C la 20°C",
            "Sateliți": "Phobos și Deimos",
            "Atmosferă": "95% CO₂, subțire"
        }
    },
    {
        name: "Jupiter",
        image: "imagini/Jupiter.jpg",
        description: "Cea mai mare planetă din sistemul nostru solar, un gigant gazos.",
        details: {
            "Distanța de la Soare": "778.3 milioane km",
            "Diametru": "139.820 km",
            "Perioadă orbitală": "11.9 ani",
            "Luni cunoscute": "79",
            "Mareea Roșie": "Furtună antică de 400+ ani",
            "Tip": "Gigant gazos"
        }
    },
    {
        name: "Saturn",
        image: "imagini/saturn.webp",
        description: "Cunoscut pentru inelele sale spectaculoare formate din gheață și particule de praf.",
        details: {
            "Distanța de la Soare": "1.4 miliarde km",
            "Diametru": "116.460 km",
            "Perioadă orbitală": "29.5 ani",
            "Luni cunoscute": "82",
            "Inele": "7 inele principale",
            "Densitate": "Mai mică decât apa"
        }
    },
    {
        name: "Uranus",
        image: "imagini/Uranus.jpg",
        description: "Gigant de gheață cu o axă de rotație înclinată extrem.",
        details: {
            "Distanța de la Soare": "2.9 miliarde km",
            "Diametru": "50.724 km",
            "Perioadă orbitală": "84 ani",
            "Luni": "27 cunoscute",
            "Inclinație axială": "98° (pe o parte)",
            "Culoare": "Cian datorită metanului"
        }
    },
    {
        name: "Neptun",
        image: "imagini/Neptune.png",
        description: "Cea mai îndepărtată planetă de Soare, cu vânturi cele mai puternice.",
        details: {
            "Distanța de la Soare": "4.5 miliarde km",
            "Diametru": "49.244 km",
            "Perioadă orbitală": "165 ani",
            "Luni": "14 cunoscute",
            "Vânturi": "Peste 2.000 km/h",
            "Descoperire": "1846 (prin calcul)"
        }
    },

];

const starsData = [
    {
        name: "Soarele",
        image: "imagini/soarele.jpg",
        description: "Steaua noastră, sursa principală de energie pentru viața pe Pământ.",
        details: {
            "Tip": "G2V (pitică galbenă)",
            "Vârstă": "4.6 miliarde de ani",
            "Diametru": "1.392.700 km",
            "Temperatură la suprafață": "5.500°C",
            "Masa": "333.000 de mase terestre",
            "Compoziție": "73% H, 25% He, 2% metale"
        }
    },
    {
        name: "Sirius",
        image: "imagini/Sirius.webp",
        description: "Cea mai strălucitoare stea de pe cerul nopții, situată în constelația Câinele Mare.",
        details: {
            "Distanță de la Pământ": "8,6 ani-lumină",
            "Magnitudine aparentă": "-1,46",
            "Tip spectral": "A1V",
            "Temperatură": "9.940 K",
            "Masa": "2,02 mase solare",
            "Sistem": "Stea binară (Sirius A și B)"
        }
    },
    {
        name: "Betelgeuse",
        image: "imagini/Betelgeuse.jpg",
        description: "Supergigantă roșie în constelația Orion, una dintre cele mai mari stele cunoscute.",
        details: {
            "Distanță de la Pământ": "aproximativ 642,5 ani-lumină",
            "Magnitudine aparentă": "0,42 (variabilă)",
            "Rază": "~887 raze solare",
            "Temperatură": "3.500 K",
            "Luminozitate": "120.000x Soarele",
            "Stadiu": "Va exploda ca supernovă"
        }
    }
];

const galaxiesData = [
    {
        name: "Calea Lactee",
        image: "imagini/Galaxia-Calea-Lactee.jpg",
        description: "Galaxia noastră, care conține între 100-400 de miliarde de stele.",
        details: {
            "Tip": "Spirală barată",
            "Diametru": "100.000-180.000 ani-lumină",
            "Vârstă": "13,51 miliarde de ani",
            "Număr de stele": "100-400 miliarde",
            "Masa": "1,5 trilioane de mase solare",
            "Grup": "Grupul Local"
        }
    },
    {
        name: "Andromeda (M31)",
        image: "imagini/Andromede.jpg",
        description: "Cea mai apropiată galaxie de Calea Lactee și cea mai mare din Grupul Local.",
        details: {
            "Distanță de la Pământ": "2,5 milioane ani-lumină",
            "Tip": "Spirală",
            "Diametru": "220.000 ani-lumină",
            "Număr de stele": "1 trilion",
            "Coliziune viitoare": "Cu Calea Lactee în ~4,5 miliarde ani",
            "Sateliți": "Peste 20 de galaxii pitice"
        }
    }
];

// Content loading function
function loadContent(containerId, data, type) {
    const container = document.getElementById(containerId);
    
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-aos', 'fade-up');
        
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="card-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <button class="learn-more cosmic-button">Află mai multe</button>
            </div>
        `;
        
        card.addEventListener('click', function() {
            openModal(item);
        });
        
        container.appendChild(card);
    });
}

// Modal functions
function openModal(item) {
    const modal = document.getElementById('infoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalAdditionalInfo = document.getElementById('modalAdditionalInfo');
    
    modalTitle.textContent = item.name;
    modalImage.src = item.image;
    modalImage.alt = item.name;
    modalDescription.textContent = item.description;
    
    // Add additional info
    modalAdditionalInfo.innerHTML = '';
    if (item.details) {
        for (const [key, value] of Object.entries(item.details)) {
            const infoItem = document.createElement('div');
            infoItem.className = 'info-item';
            infoItem.innerHTML = `<strong>${key}:</strong> <span>${value}</span>`;
            modalAdditionalInfo.appendChild(infoItem);
        }
    }
    
    modal.classList.add('show');
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });
}

// Add floating animation to some elements
function addFloatingAnimation() {
    const elements = document.querySelectorAll('.card, .cosmic-button');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        el.classList.add('floating');
    });
}

// Call floating animation after everything is loaded
window.addEventListener('load', function() {
    addFloatingAnimation();
});


document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.menu-button');
    const sidebar = document.querySelector('.sidebar');
    const closeButton = document.querySelector('.close-button');
    const homeButton = document.querySelector('.home-button');
    
    // Crearea overlay-ului dinamic 
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
        
        // înălțimea submeniurilor deschise
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