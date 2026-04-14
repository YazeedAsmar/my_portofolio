// script.js for Space Portfolio
document.addEventListener('DOMContentLoaded', () => {
    initParticleBackground();
    initTypingEffect();
    initScrollAnimations();
    initScrollProgressBar();
    renderCertificates();
});

// 1. Particle Background (Space Theme)
function initParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.id = 'space-canvas';
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    let width, height, particles;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.8 + 0.2; // Brighter particles
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }
        draw() {
            ctx.fillStyle = `rgba(180, 200, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    particles = [];
    // Increase for larger screens to keep density consistent
    const particleCount = (width > 768) ? 150 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// 2. Typing Effect for Hero Section
function initTypingEffect() {
    const textElement = document.querySelector('.typing-text');
    if (!textElement) return;
    
    const texts = [
        "BI / ML Developer",
        "Machine Learning Engineer",
        "Data Scientist"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before typing new word
        }

        setTimeout(type, typeSpeed);
    }
    
    type();
}

// 3. Scroll Animations (Intersection Observer)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// 4. Scroll Progress Bar
function initScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    document.body.prepend(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });
}

// 5. Dynamic Certificates Rendering
const certificatesData = [
    {
        title: "Microsoft Power BI Data Analyst (PL-300)",
        provider: "Microsoft",
        year: "2026",
        description: "Designing and building scalable data models, cleaning and transforming data, and enabling advanced analytic capabilities that provide meaningful business value.",
        image: "assets/parachot16.png", // Fallback image if Microsoft not present
        tags: ["Power BI", "Data Modeling", "DAX", "Analytics"]
    },
    {
        title: "AWS Certified AI Practitioner",
        provider: "Amazon Web Services",
        year: "2025",
        description: "Applying AI and Machine Learning solutions using AWS cloud services. Understanding of core ML concepts and model deployment.",
        image: "assets/AWS.jpeg",
        tags: ["Cloud Architecture", "AWS", "Machine Learning", "AI Solutions"]
    },
    {
        title: "Robotna+ Automation & AI Training",
        provider: "Robotna+",
        year: "2025",
        description: "AI Agent and automation systems development. Hands-on training with building automated workflows and integrating AI capabilities.",
        image: "assets/robotna.png",
        tags: ["n8n", "Automation", "AI Agents", "Workflows"]
    },
    {
        title: "Data Analysis Program",
        provider: "Parachot16 Initiative",
        year: "2025",
        description: "Advanced programming and software development focusing on end-to-end Data Analysis, combining Excel, SQL, Python, and Power BI.",
        image: "assets/parachot16.png",
        tags: ["Excel", "SQL", "Python", "Power BI"]
    },
    {
        title: "Web Development Certificate",
        provider: "Zain Jordan",
        year: "2022",
        description: "A complete web development course focusing on modern HTML, CSS, JavaScript, and responsive design skills.",
        image: "assets/zain.jpeg",
        tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"]
    }
];

function renderCertificates() {
    const grid = document.getElementById('certificates-grid');
    if (!grid) return;

    certificatesData.forEach(cert => {
        const tagsHtml = cert.tags.map(tag => `<span>${tag}</span>`).join('');
        
        const cardHtml = `
            <div class="cert-card animate-on-scroll">
                <div class="cert-image-wrapper">
                    <img src="${cert.image}" alt="${cert.title}" class="cert-image" onerror="this.src=''; this.style.display='none';">
                </div>
                <div class="cert-info">
                    <h3 class="cert-name">${cert.title}</h3>
                    <div class="cert-provider"><i class="fas fa-building"></i> ${cert.provider}</div>
                </div>
                <div class="cert-overlay">
                    <div class="cert-overlay-content">
                        <h3 class="overlay-title">${cert.title}</h3>
                        <div class="overlay-meta">
                            <span class="overlay-provider"><i class="fas fa-building"></i> ${cert.provider}</span>
                            <span class="overlay-year"><i class="fas fa-calendar-alt"></i> ${cert.year}</span>
                        </div>
                        <p class="overlay-desc">${cert.description}</p>
                        <div class="overlay-tags">
                            ${tagsHtml}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        grid.innerHTML += cardHtml;
    });

    // Re-initialize scroll animations for the new dynamically added cards
    if (typeof initScrollAnimations === 'function') {
        initScrollAnimations();
    }
}
