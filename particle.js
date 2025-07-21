// Create particles
document.addEventListener('DOMContentLoaded', function() {
    for (let i = 0; i < 30; i++) {
        createParticle();
    }
});

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random properties
    const size = Math.random() * 6 + 2;
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    const opacity = Math.random() * 0.6 + 0.1;
    const duration = Math.random() * 25 + 10;
    const delay = Math.random() * 5;
    
    // Apply styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;
    particle.style.opacity = opacity;
    particle.style.animation = `float ${duration}s linear ${delay}s infinite`;
    particle.style.setProperty('--random-x', Math.random() * 40 - 20);
    
    document.body.appendChild(particle);
    
    // Remove particle after animation completes to prevent DOM overload
    setTimeout(() => {
        particle.remove();
        createParticle(); // Create new particle
    }, duration * 1000);
}