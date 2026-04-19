document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navbar.classList.toggle('active');
            menuToggle.innerHTML = navbar.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navbar && navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Explore button
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            document.getElementById('constelatii').scrollIntoView({ behavior: 'smooth' });
        });
    }

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

    // ==================== DATE CONSTELAȚII ====================
    const constellationsData = [
        {
            name: "Ursa Mare",
            image: "../imagini/ursa-mare.jpg",
            description: "Una dintre cele mai cunoscute constelații, vizibilă tot anul în emisfera nordică. Conține Carul Mare, un asterism iconic folosit pentru a găsi Steua Polară.",
            details: {
                "Stea principală": "Dubhe, Merak (indică Polaris)",
                "Tip": "Emisfera Nord",
                "Mitologie": "Reprezintă nimfa Callisto, transformată în urs de Zeus",
                "Cel mai bun sezon": "Primăvara",
                "Stele vizibile": "Peste 80"
            }
        },
        {
            name: "Orion",
            image: "../imagini/orion-flashcard.jpg",
            description: "Vânătorul uriaș, cu centura formată din trei stele strălucitoare. Vizibilă iarna, este una dintre cele mai ușor de recunoscut constelații.",
            details: {
                "Stea principală": "Betelgeuse, Rigel",
                "Tip": "Emisfera Nord",
                "Mitologie": "Vânătorul gigant din mitologia greacă",
                "Cel mai bun sezon": "Iarna",
                "Obiecte Messier": "M42 (Nebuloasa Orion)"
            }
        },
        {
            name: "Scorpionul",
            image: "../imagini/scorpionul.jpg",
            description: "Constelație zodiacală, inima sa este steaua roșie Antares. Vizibilă mai ales în emisfera sudică în timpul verii.",
            details: {
                "Stea principală": "Antares",
                "Tip": "Zodiacală, Emisfera Sud",
                "Mitologie": "Scorpionul care l-a ucis pe Orion",
                "Cel mai bun sezon": "Vara"
            }
        },
        {
            name: "Lebăda",
            image: "../imagini/lebada.jpg",
            description: "Pasărea cerească în zbor, cunoscută și sub numele de Crucea Nordului. Conține steaua Deneb, una dintre cele mai luminoase.",
            details: {
                "Stea principală": "Deneb",
                "Tip": "Emisfera Nord",
                "Mitologie": "Zeus transformat în lebădă",
                "Cel mai bun sezon": "Vara"
            }
        },
        {
            name: "Crucea Sudului",
            image: "../imagini/istockphoto-2207928685-612x612.jpg",
            description: "Cea mai mică dintre constelații, dar emblematică pentru emisfera sudică. Folosită ca ghid pentru polul sud ceresc.",
            details: {
                "Stea principală": "Acrux",
                "Tip": "Emisfera Sud",
                "Cel mai bun sezon": "Tot anul (emisfera sud)",
                "Țări pe steag": "Australia, Noua Zeelandă, Brazilia"
            }
        },
        {
            name: "Taurul",
            image: "../imagini/taurul.jpg",
            description: "Zodiacal, asociat mitului lui Zeus transformat în taur. Are roiul stelar Hyade și Pleiade, vizibile cu ochiul liber.",
            details: {
                "Stea principală": "Aldebaran",
                "Tip": "Zodiacală",
                "Mitologie": "Zeus răpindu-o pe Europa ca taur",
                "Cel mai bun sezon": "Iarna",
                "Roiuri celebre": "Pleiade (M45), Hyade"
            }
        },
        {
            name: "Cassiopeia",
            image: "../imagini/cassiopeia.jpg",
            description: "Regina arogantă, cu formă de W sau M în funcție de sezon. Vizibilă tot anul în emisfera nordică.",
            details: {
                "Stea principală": "Schedar, Caph",
                "Tip": "Emisfera Nord",
                "Mitologie": "Regina care s-a lăudat cu frumusețea fiicei sale",
                "Supernova": "A explodat în 1572 (Tycho)"
            }
        },
        {
            name: "Andromeda",
            image: "../imagini/andromeda.jpg",
            description: "Prințesa înlănțuită de stâncă, salvată de Perseu. Conține galaxia Andromeda (M31), vizibilă cu ochiul liber.",
            details: {
                "Stea principală": "Alpheratz",
                "Tip": "Emisfera Nord",
                "Mitologie": "Fiica reginei Cassiopeia",
                "Cel mai bun sezon": "Toamna",
                "Galaxia M31": "2,5 milioane ani-lumină"
            }
        },
        {
            name: "Lyra",
            image: "../imagini/lyra.webp",
            description: "Mica liră a lui Orfeu, găzduiește steaua Vega, una dintre cele mai luminoase stele de pe cer.",
            details: {
                "Stea principală": "Vega",
                "Tip": "Emisfera Nord",
                "Mitologie": "Lira lui Orfeu, dusă pe cer de muze",
                "Cel mai bun sezon": "Vara",
                "Nebuloasa Inel": "M57"
            }
        },
        {
            name: "Săgetătorul",
            image: "../imagini/sagetatorul.jpg",
            description: "Arcașul centaur, indică centrul Căii Lactee. Constelație zodiacală spectaculoasă cu multe obiecte deep-sky.",
            details: {
                "Stea principală": "Kaus Australis",
                "Tip": "Zodiacală",
                "Mitologie": "Centaurul înțelept Chiron",
                "Cel mai bun sezon": "Vara",
                "Centrul galaxiei": "Direcția către centrul Căii Lactee"
            }
        },
        {
            name: "Hidra",
            image: "../imagini/HydraCC.jpg",
            description: "Cea mai lungă constelație, întinsă pe cer. Reprezintă șarpele de apă din mitologia greacă.",
            details: {
                "Stea principală": "Alphard",
                "Tip": "Emisfera Sud",
                "Mitologie": "Hidra din al 12-lea muncă al lui Hercule",
                "Lungime": "Peste 100° pe cer"
            }
        },
        {
            name: "Perseu",
            image: "../imagini/perseu.jpg",
            description: "Eroul care a salvat-o pe Andromeda. Constelația conține roiul dublu Perseus și steaua variabilă Algol.",
            details: {
                "Stea principală": "Mirfak",
                "Tip": "Emisfera Nord",
                "Mitologie": "Eroul Perseu, ucigașul Medusei",
                "Roiuri celebre": "Roiul dublu Perseus"
            }
        }
    ];

    // Date pentru mituri
    const mythologyData = [
        {
            name: "Mitul lui Orion",
            image: "../imagini/orion.jpg",
            description: "Orion era un vânător gigantic din mitologia greacă. A fost ucis de un scorpion și apoi așezat pe cer de Zeus.",
            details: {
                "Personaje principale": "Orion, Artemis, Scorpionul",
                "Lecția mitului": "Mândria este pedepsită de zei",
                "Constelații înrudite": "Scorpionul, Canis Major, Canis Minor"
            }
        },
        {
            name: "Mitul Andromedei",
            image: "../imagini/andromeda.jpg",
            description: "Andromeda a fost înlănțuită de o stâncă ca jertfă pentru monstrul Cetus, apoi salvată de Perseu.",
            details: {
                "Personaje principale": "Andromeda, Perseu, Cassiopeia, Cetus",
                "Lecția mitului": "Curajul și iubirea înving",
                "Constelații înrudite": "Perseu, Cassiopeia, Cetus"
            }
        },
        {
            name: "Mitul Ursului Mare",
            image: "../imagini/ursa-mare.jpg",
            description: "Callisto, o nimfă iubită de Zeus, a fost transformată în urs de Hera și apoi așezată pe cer.",
            details: {
                "Personaje principale": "Callisto, Zeus, Hera",
                "Lecția mitului": "Răzbunarea zeiței Hera",
                "Constelații înrudite": "Ursa Mică (Arcas)"
            }
        }
    ];

    // Date pentru ghid de observare
    const guideData = [
        {
            name: "Cum observi Orion",
            image: "../imagini/orion.jpg",
            description: "Orion este vizibilă în timpul iernii. Caută centura formată din trei stele aliniate.",
            details: {
                "Cel mai bun moment": "Decembrie - Martie",
                "Echipament necesar": "Ochiul liber sau binoclu",
                "Obiecte de observat": "Centura lui Orion, Nebuloasa Orion"
            }
        },
        {
            name: "Cum observi Cassiopeia",
            image: "../imagini/cassiopeia.jpg",
            description: "Cassiopeia are forma unui W sau M și este vizibilă tot anul în emisfera nordică.",
            details: {
                "Cel mai bun moment": "Tot anul (circumpolară)",
                "Echipament necesar": "Ochiul liber",
                "Obiecte de observat": "Forma de W, roiuri stelare"
            }
        },
        {
            name: "Cum observi Crucea Sudului",
            image: "../imagini/istockphoto-2207928685-612x612.jpg",
            description: "Crux este vizibilă doar din emisfera sudică. Ajută la găsirea polului sud ceresc.",
            details: {
                "Cel mai bun moment": "Tot anul (emisfera sud)",
                "Echipament necesar": "Ochiul liber",
                "Obiecte de observat": "Sacul de Cărbune (nebuloasă întunecată)"
            }
        }
    ];

    // Load all content
    loadContent('constellationsContainer', constellationsData);
    loadContent('mythologyContainer', mythologyData);
    loadContent('guideContainer', guideData);

    // Modal functionality
    const modal = document.getElementById('infoModal');
    const closeModal = document.querySelector('.close-modal');

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.classList.remove('show');
        });
    }

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // ==================== SIDEBAR LOGIC (PĂSTRAT IDENTIC) ====================
    const menuButton = document.getElementById('menuButton');
    const sidebar = document.getElementById('sidebar');
    const closeButton = document.getElementById('closeButton');
    const homeButton = document.getElementById('homeButton');
    
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
    if (menuButton) menuButton.addEventListener('click', toggleSidebar);
    if (closeButton) closeButton.addEventListener('click', toggleSidebar);
    if (overlay) overlay.addEventListener('click', toggleSidebar);
    
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
    if (homeButton) {
        homeButton.addEventListener('click', function(e) {
            if (window.innerWidth < 768) {
                toggleSidebar();
            }
        });
    }
    
    // Îmbunătățire accesibilitate
    document.addEventListener('keydown', function(e) {
        // Închidere cu ESC
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            toggleSidebar();
            if (menuButton) menuButton.focus();
        }
    });
    
    // Inițializare stări ARIA și submeniuri
    if (menuButton) {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Toggle menu');
    }
    if (closeButton) closeButton.setAttribute('aria-label', 'Close menu');
    
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

// Content loading function
function loadContent(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-aos', 'fade-up');
        
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/300x200?text=${item.name}'">
            <div class="card-content">
                <h3>${item.name}</h3>
                <p>${item.description.substring(0, 100)}${item.description.length > 100 ? '...' : ''}</p>
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