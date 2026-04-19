const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const infoPanel = document.getElementById("infoPanel");

// Variabile pentru deplasare
let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let lastMouseX = 0;
let lastMouseY = 0;

// Generare stele de fundal (mai variate și mai multe)
const backgroundStars = Array.from({ length: 7000 }, () => ({
  x: Math.random() * canvas.width * 5 - canvas.width * 2,
  y: Math.random() * canvas.height * 5 - canvas.height * 2,
  radius: Math.random() * 4 + 1,
  alpha: Math.random() * 0.8 + 0.2,
  delta: Math.random() * 0.02
}));

// Definirea constelațiilor (poziții diferite și scalate pentru efect WOW)
const constellations = {
  ursaMajor: {
    name: "Carul Mare",
    stars: [
      [250, 450], [420, 450], [540, 400],
      [600, 550], [800, 550], [840, 400],
      [100, 500], [840, 400]
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
      [0, 6], [5, 7], [7, 2]
    ]
  },
  cassiopeia: {
    name: "Cassiopeia",
    stars: [
      [1800, 200], [1880, 120], [1960, 200],
      [2040, 120], [2120, 200]
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4]
    ]
  },
  orion: {
    name: "Orion",
    stars: [
      [800, 850], [800, 1100], [1050, 1050], [1050, 900],
      [1050, 900], [1050, 1050], [1250, 1150], [1250, 850]
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [3, 4], [2, 5]
    ]
  },
  cygnus: {
    name: "Cygnus",
    stars: [
      [2200, 600], [2200, 760], [2200, 920],
      [2200, 1080], [2200, 1240], [2080, 920], [2320, 920],
      [1920, 850], [2500, 850]
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [5, 6], [5, 7], [6, 8]
    ]
  }
};

// Desenează fundalul cu stele
function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#001d3d");
  gradient.addColorStop(1, "#000000");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  backgroundStars.forEach(star => {
    star.alpha += star.delta;
    if (star.alpha <= 0.2 || star.alpha >= 1) star.delta *= -1;

    ctx.beginPath();
    ctx.arc(star.x + offsetX, star.y + offsetY, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();
  });
}

// Desenează constelațiile
function drawConstellations() {
  Object.keys(constellations).forEach(key => {
    const constellation = constellations[key];
    const stars = constellation.stars;

    // Desenează liniile animate între stele
    if (constellation.connections) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.lineWidth = 2;
      constellation.connections.forEach(([start, end]) => {
        ctx.moveTo(stars[start][0] + offsetX, stars[start][1] + offsetY);
        ctx.lineTo(stars[end][0] + offsetX, stars[end][1] + offsetY);
      });
      ctx.stroke();
    }

    // Desenează stelele cu efect de glow
    stars.forEach(([x, y]) => {
      const gradient = ctx.createRadialGradient(
        x + offsetX, y + offsetY, 0,
        x + offsetX, y + offsetY, 20
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, 15, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, 6, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    });
  });
}

// Afișează informații despre constelație
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  let found = false;

  // Parcurge toate constelațiile
  Object.keys(constellations).forEach(key => {
    const constellation = constellations[key];
    constellation.stars.forEach(([x, y]) => {
      // Calculează distanța dintre clic și stea
      const distance = Math.sqrt((mouseX - (x + offsetX)) ** 2 + (mouseY - (y + offsetY)) ** 2);
      if (distance < 20) { // Dacă clicul este aproape de o stea
        const dataElement = document.getElementById(`${key}Data`);
        const name = dataElement.getAttribute("data-name");
        const info = dataElement.getAttribute("data-info");
        const imageSrc = dataElement.querySelector("img").src;

        // Afișează panoul cu informațiile constelației
        showInfoPanel(name, info, imageSrc);
        found = true;
      }
    });
  });

  if (!found) {
    closeInfoPanel(); // Ascunde panoul dacă nu s-a găsit nicio constelație
  }
});

function showInfoPanel(name, info, imageSrc) {
  const infoPanel = document.getElementById("infoPanel");
  document.getElementById("infoTitle").textContent = name;
  document.getElementById("infoImage").src = imageSrc;
  document.getElementById("infoImage").alt = name;
  document.getElementById("infoText").textContent = info;

  infoPanel.classList.add("active"); // Adaugă clasa pentru a afișa panoul
}

function closeInfoPanel() {
  const infoPanel = document.getElementById("infoPanel");
  infoPanel.classList.remove("active"); // Elimină clasa pentru a ascunde panoul
}

// Detectează mișcarea mouse-ului pentru deplasare
canvas.addEventListener("mousedown", (e) => {
  isDragging = true;
  const rect = canvas.getBoundingClientRect();
  lastMouseX = e.clientX - rect.left;
  lastMouseY = e.clientY - rect.top;
});

canvas.addEventListener("mouseup", () => {
  isDragging = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    offsetX += (mouseX - lastMouseX);
    offsetY += (mouseY - lastMouseY);

    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }
});

// Animație
function animate() {
  drawBackground();
  drawConstellations();
  requestAnimationFrame(animate);
}

animate();





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