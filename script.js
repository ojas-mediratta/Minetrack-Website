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
    "pose": "J. Sturm, N. Engelhard, F. Endres, W. Burgard, and D. Cremers, \"A benchmark for the evaluation of RGB-D SLAM systems,\" in 2012 IEEE/RSJ International Conference on Intelligent Robots and Systems, Oct. 2012, pp. 573–580. doi: 10.1109/IROS.2012.6385773.",
    "moratuwage2016": "A. M. Moratuwage, D. Wang, and S. Wang, \"Review of visual odometry types, approaches, challenges and applications,\" SpringerPlus, vol. 5, no. 1, 2016.",
    "monocularsurvey2023": "A. K. et al., \"Monocular Visual SLAM, Visual Odometry and Structure from Motion Methods Applied to 3D Reconstruction: A Comprehensive Survey,\" 2023."
};

document.addEventListener('DOMContentLoaded', function() {

    // ===== Sticky Nav Shadow =====
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 10) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // ===== Scroll-triggered Fade-in Animations =====
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        fadeElements.forEach(function(el) {
            observer.observe(el);
        });
    }

    // ===== GitHub Button Handler =====
    const githubBtn = document.getElementById('github-btn');
    if (githubBtn) {
        githubBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const githubURL = 'https://github.com/yourusername/minetrack-project';
            // Uncomment when ready: window.open(githubURL, '_blank');
            alert('Add your GitHub repository URL in script.js!');
        });
    }

    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== Visual Showcase Hover =====
    const visualShowcase = document.querySelector('.placeholder-visual');
    if (visualShowcase) {
        visualShowcase.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.015)';
        });
        visualShowcase.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // ===== Citation Manager =====
    const citeElements = document.querySelectorAll('.cite');
    const bibliographySection = document.getElementById('bibliography-list');

    if (citeElements.length > 0 && bibliographySection) {
        let currentCiteNumber = 1;
        const assignedNumbers = {};

        citeElements.forEach(function(el) {
            const refId = el.getAttribute('data-ref');

            if (!assignedNumbers[refId]) {
                assignedNumbers[refId] = currentCiteNumber++;
                const li = document.createElement('li');
                li.id = 'ref-' + refId;
                const citationText = bibliographyDatabase[refId] || "Citation missing for: " + refId;
                li.innerHTML = '[' + assignedNumbers[refId] + '] ' + citationText;
                bibliographySection.appendChild(li);
            }

            const citeNum = assignedNumbers[refId];
            el.innerHTML = '<a href="#ref-' + refId + '">[' + citeNum + ']</a>';
        });
    }
});