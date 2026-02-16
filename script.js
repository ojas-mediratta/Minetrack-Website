// MineTrack JavaScript functionality

// GitHub button handler
document.addEventListener('DOMContentLoaded', function() {
    const githubBtn = document.getElementById('github-btn');
    
    if (githubBtn) {
        githubBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Replace this URL with your actual GitHub repository
            const githubURL = 'https://github.com/yourusername/minetrack-project';
            
            // Uncomment the line below when you have your GitHub repo ready
            // window.open(githubURL, '_blank');
            
            // Temporary alert - remove this when you add your real GitHub link
            alert('Add your GitHub repository URL in script.js!');
        });
    }
    
    // Add smooth scrolling for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add some interactive animations
function addHoverEffects() {
    const visualShowcase = document.querySelector('.placeholder-visual');
    
    if (visualShowcase) {
        visualShowcase.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        visualShowcase.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// Initialize hover effects when DOM is loaded
document.addEventListener('DOMContentLoaded', addHoverEffects);