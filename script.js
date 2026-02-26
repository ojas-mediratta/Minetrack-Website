// MineTrack JavaScript functionality

// citation stuff
const bibliographyDatabase = {
    "scaramuzza2011": "D. Scaramuzza and F. Fraundorfer, 'Visual Odometry [Tutorial],' IEEE Robotics & Automation Magazine, vol. 18, no. 4, pp. 80-92, 2011.",
    "nister2004": "D. Nister, O. Naroditsky, and J. Bergen, 'Visual odometry,' in Proceedings of the 2004 IEEE Computer Society Conference on Computer Vision and Pattern Recognition, 2004.",
    "minecraft2011": "Mojang Studios, 'Minecraft', 2011. [Video game].",
    "wang2018": "S. Wang, R. Clark, H. Wen, and N. Trigoni, “End-to-end, sequence-to-sequence probabilistic visual odometry through deep neural networks,” The International Journal of Robotics Research, vol. 37, no. 4–5, pp. 513–542, Apr. 2018, doi: 10.1177/0278364917734298.",
    "modality2023": "M. Memmel, R. Bachmann, and A. Zamir, “Modality-Invariant Visual Odometry for Embodied Vision,” presented at the Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, 2023, pp. 21549–21559. Accessed: Feb. 25, 2026. [Online]. Available: https://openaccess.thecvf.com/content/CVPR2023/html/Memmel_Modality-Invariant_Visual_Odometry_for_Embodied_Vision_CVPR_2023_paper.html",
    "endtoend2025": "A. O. Françani and M. R. O. A. Maximo, “Transformer-Based Model for Monocular Visual Odometry: A Video Understanding Approach,” IEEE Access, vol. 13, pp. 13959–13971, 2025, doi: 10.1109/ACCESS.2025.3531667.",
    "metrics2014": "T. Ciarfuglia, G. Costante, P. Valigi, E. Ricci, “Evaluation for non-geometric methods for visual odometry” Robotics and Autonomous Systems, vol. 62, issue 12, p. 1717, August 2014. Available: https://doi.org/10.1016/j.robot.2014.08.001",
    "kitti": "A. Geiger, P. Lenz, and R. Urtasun, “Are we ready for autonomous driving? The KITTI vision benchmark suite,” in 2012 IEEE Conference on Computer Vision and Pattern Recognition, Jun. 2012, pp. 3354–3361. doi: 10.1109/CVPR.2012.6248074.",
    "pose": "J. Sturm, N. Engelhard, F. Endres, W. Burgard, and D. Cremers, “A benchmark for the evaluation of RGB-D SLAM systems,” in 2012 IEEE/RSJ International Conference on Intelligent Robots and Systems, Oct. 2012, pp. 573–580. doi: 10.1109/IROS.2012.6385773."
};

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

// manage citations
document.addEventListener('DOMContentLoaded', function() {
    const citeElements = document.querySelectorAll('.cite');
    const bibliographySection = document.getElementById('bibliography-list');
    
    if (citeElements.length === 0 || !bibliographySection) return;

    let currentCiteNumber = 1;
    const assignedNumbers = {};

    citeElements.forEach(el => {
        const refId = el.getAttribute('data-ref');
        
        // If this is a new reference, assign it the next available number
        if (!assignedNumbers[refId]) {
            assignedNumbers[refId] = currentCiteNumber++;
            
            // Create the list item in the bibliography
            const li = document.createElement('li');
            li.id = `ref-${refId}`;
            
            // Look up the citation text, or provide a fallback if it's missing
            const citationText = bibliographyDatabase[refId] || "Citation missing for: " + refId;
            li.innerHTML = `[${assignedNumbers[refId]}] ${citationText}`;
            bibliographySection.appendChild(li);
        }
        
        // Replace the HTML element with an IEEE formatted bracketed link
        const citeNum = assignedNumbers[refId];
        el.innerHTML = `<a href="#ref-${refId}">[${citeNum}]</a>`;
    });
});