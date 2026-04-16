// MineTrack site functionality

const bibliographyDatabase = {
    "scaramuzza2011": "D. Scaramuzza and F. Fraundorfer, 'Visual Odometry [Tutorial],' IEEE Robotics & Automation Magazine, vol. 18, no. 4, pp. 80-92, Dec. 2011. doi: 10.1109/MRA.2011.943233.",
    "nister2004": "D. Nister, O. Naroditsky, and J. Bergen, 'Visual odometry,' in Proceedings of the 2004 IEEE Computer Society Conference on Computer Vision and Pattern Recognition, 2004, vol. 1, pp. I-652-I-659. doi: 10.1109/CVPR.2004.1315094.",
    "orbslam2015": "R. Mur-Artal, J. M. M. Montiel, and J. D. Tardos, 'ORB-SLAM: A Versatile and Accurate Monocular SLAM System,' IEEE Transactions on Robotics, vol. 31, no. 5, pp. 1147-1163, Oct. 2015. doi: 10.1109/TRO.2015.2463671.",
    "minecraft2011": "Mojang Studios, 'Minecraft', 2011. [Video game].",
    "wang2018": "S. Wang, R. Clark, H. Wen, and N. Trigoni, 'End-to-end, sequence-to-sequence probabilistic visual odometry through deep neural networks,' The International Journal of Robotics Research, vol. 37, no. 4-5, pp. 513-542, Apr. 2018. doi: 10.1177/0278364917734298.",
    "deepvo2017": "S. Wang, R. Clark, H. Wen, and N. Trigoni, 'DeepVO: Towards End-to-End Visual Odometry with Deep Recurrent Convolutional Neural Networks,' in 2017 IEEE International Conference on Robotics and Automation (ICRA), 2017, pp. 2043-2050. doi: 10.1109/ICRA.2017.7989236.",
    "modality2023": "M. Memmel, R. Bachmann, and A. Zamir, 'Modality-Invariant Visual Odometry for Embodied Vision,' presented at the Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, 2023, pp. 21549-21559. Accessed: Feb. 25, 2026. [Online]. Available: https://openaccess.thecvf.com/content/CVPR2023/html/Memmel_Modality-Invariant_Visual_Odometry_for_Embodied_Vision_CVPR_2023_paper.html",
    "endtoend2025": "A. O. Francani and M. R. O. A. Maximo, 'Transformer-Based Model for Monocular Visual Odometry: A Video Understanding Approach,' IEEE Access, vol. 13, pp. 13959-13971, 2025. doi: 10.1109/ACCESS.2025.3531667.",
    "metrics2014": "T. Ciarfuglia, G. Costante, P. Valigi, and E. Ricci, 'Evaluation for non-geometric methods for visual odometry,' Robotics and Autonomous Systems, vol. 62, issue 12, p. 1717, August 2014. Available: https://doi.org/10.1016/j.robot.2014.08.001",
    "kitti": "A. Geiger, P. Lenz, and R. Urtasun, 'Are we ready for autonomous driving? The KITTI vision benchmark suite,' in 2012 IEEE Conference on Computer Vision and Pattern Recognition, Jun. 2012, pp. 3354-3361. doi: 10.1109/CVPR.2012.6248074.",
    "pose": "J. Sturm, N. Engelhard, F. Endres, W. Burgard, and D. Cremers, 'A benchmark for the evaluation of RGB-D SLAM systems,' in 2012 IEEE/RSJ International Conference on Intelligent Robots and Systems, Oct. 2012, pp. 573-580. doi: 10.1109/IROS.2012.6385773.",
    "moratuwage2016": "A. M. Moratuwage, D. Wang, and S. Wang, 'Review of visual odometry types, approaches, challenges and applications,' SpringerPlus, vol. 5, no. 1, 2016.",
    "monocularsurvey2023": "E. P. Herrera-Granda, J. C. Torres-Cantero, and D. H. Peluffo-Ordonez, 'Monocular Visual SLAM, Visual Odometry, and Structure from Motion Methods Applied to 3D Reconstruction: A Comprehensive Survey,' SSRN, 2023. doi: 10.2139/ssrn.4546921.",
    "monocularsurvey2024": "E. P. Herrera-Granda, J. C. Torres-Cantero, and D. H. Peluffo-Ordonez, 'Monocular Visual SLAM, Visual Odometry, and Structure from Motion Methods Applied to 3D Reconstruction: A Comprehensive Survey,' Heliyon, vol. 10, no. 18, e37356, Sep. 2024. doi: 10.1016/j.heliyon.2024.e37356.",
    "nnsvg": "A. LeNail, 'NN-SVG: Publication-Ready Neural Network Architecture Schematics,' 2019. [Online]. Available: https://alexlenail.me/NN-SVG/"
};

document.addEventListener("DOMContentLoaded", function () {
    initNavShadow();
    initFadeAnimations();
    initSmoothScrolling();
    initArchiveDropdown();
    initScrollSpy();
    initCitations();
    initImageLightbox();
});

function initNavShadow() {
    const nav = document.querySelector("nav");
    if (!nav) {
        return;
    }

    const updateShadow = function () {
        nav.classList.toggle("scrolled", window.scrollY > 10);
    };

    updateShadow();
    window.addEventListener("scroll", updateShadow, { passive: true });
}

function initFadeAnimations() {
    const fadeElements = document.querySelectorAll(".fade-in");
    if (!fadeElements.length) {
        return;
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

    fadeElements.forEach(function (element) {
        observer.observe(element);
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener("click", function (event) {
            const href = this.getAttribute("href");
            if (!href || href === "#") {
                return;
            }

            const target = document.querySelector(href);
            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });
}

function initArchiveDropdown() {
    const toggle = document.querySelector("[data-archive-toggle]");
    const panel = document.querySelector("[data-archive-panel]");
    const label = document.querySelector("[data-archive-label]");
    if (!toggle || !panel) {
        return;
    }

    const pageLabelMap = {
        "proposal.html": "Proposal",
        "midterm.html": "Midterm Checkpoint"
    };

    const currentPage = window.location.pathname.split("/").pop();
    const archivedLabel = pageLabelMap[currentPage];

    if (label && archivedLabel) {
        label.textContent = archivedLabel;
        toggle.classList.add("active");
        toggle.setAttribute("aria-current", "page");
    }

    const setOpenState = function (isOpen) {
        toggle.setAttribute("aria-expanded", String(isOpen));
        panel.hidden = false;
        panel.style.maxHeight = isOpen ? panel.scrollHeight + "px" : "0px";
        panel.style.opacity = isOpen ? "1" : "0";
        panel.classList.toggle("open", isOpen);

        if (!isOpen) {
            window.setTimeout(function () {
                if (!panel.classList.contains("open")) {
                    panel.hidden = true;
                }
            }, 260);
        }
    };

    setOpenState(false);

    toggle.addEventListener("click", function () {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        setOpenState(!isOpen);
    });
}

function initScrollSpy() {
    const scrollSpyContainer = document.querySelector("[data-scrollspy]");
    const reportMain = document.querySelector("[data-report-content]");
    if (!scrollSpyContainer || !reportMain) {
        return;
    }

    const sections = Array.from(reportMain.querySelectorAll("[data-spy-section]"));
    if (!sections.length) {
        return;
    }

    const list = document.createElement("ul");
    list.className = "scrollspy-list";
    scrollSpyContainer.classList.add("scrollspy-track");

    const links = [];
    const observedTargets = [];

    sections.forEach(function (section, sectionIndex) {
        if (!section.id) {
            section.id = "section-" + (sectionIndex + 1);
        }

        section.classList.add("section-anchor");

        const sectionHeading = section.querySelector("h2");
        const sectionLabel = section.getAttribute("data-nav-label") || (sectionHeading ? sectionHeading.textContent.trim() : "Section " + (sectionIndex + 1));
        const sectionLink = createScrollSpyItem(section.id, sectionLabel, "");
        list.appendChild(sectionLink.item);
        links.push({ target: section, link: sectionLink.link });
        observedTargets.push(section);

        const subsections = Array.from(section.querySelectorAll("h4"));
        subsections.forEach(function (subsection, subsectionIndex) {
            if (!subsection.id) {
                subsection.id = section.id + "-subsection-" + (subsectionIndex + 1);
            }

            subsection.classList.add("section-anchor");
            const subsectionLink = createScrollSpyItem(subsection.id, subsection.textContent.trim(), "subsection");
            list.appendChild(subsectionLink.item);
        });
    });

    scrollSpyContainer.replaceChildren(list);

    const setActiveLink = function (activeId) {
        links.forEach(function (entry) {
            const isActive = entry.target.id === activeId;
            entry.link.classList.toggle("active", isActive);
            if (isActive) {
                entry.link.setAttribute("aria-current", "true");
            } else {
                entry.link.removeAttribute("aria-current");
            }
        });
    };

    const observer = new IntersectionObserver(function (entries) {
        const visibleEntries = entries
            .filter(function (entry) { return entry.isIntersecting; })
            .sort(function (a, b) { return b.boundingClientRect.top - a.boundingClientRect.top; })
            .reverse();

        if (visibleEntries.length > 0) {
            setActiveLink(visibleEntries[0].target.id);
        }
    }, {
        rootMargin: "-18% 0px -68% 0px",
        threshold: [0, 0.2, 0.5, 1]
    });

    observedTargets.forEach(function (target) {
        observer.observe(target);
    });

    setActiveLink(observedTargets[0].id);

    const syncScrollSpyPosition = function () {
        const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
        const trackRange = scrollSpyContainer.scrollHeight - scrollSpyContainer.clientHeight;

        if (scrollRange <= 0 || trackRange <= 0) {
            scrollSpyContainer.scrollTop = 0;
            return;
        }

        const progress = Math.min(1, Math.max(0, window.scrollY / scrollRange));
        scrollSpyContainer.scrollTop = progress * trackRange;
    };

    syncScrollSpyPosition();
    window.addEventListener("scroll", syncScrollSpyPosition, { passive: true });
    window.addEventListener("resize", syncScrollSpyPosition, { passive: true });
}

function createScrollSpyItem(targetId, label, modifierClass) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#" + targetId;
    link.textContent = label;
    if (modifierClass) {
        link.classList.add("scrollspy-" + modifierClass);
    }
    item.appendChild(link);
    return { item: item, link: link };
}

function initCitations() {
    const citeElements = document.querySelectorAll(".cite");
    const bibliographySection = document.getElementById("bibliography-list");
    if (!citeElements.length || !bibliographySection) {
        return;
    }

    let currentCiteNumber = 1;
    const assignedNumbers = {};

    citeElements.forEach(function (element) {
        const refId = element.getAttribute("data-ref");
        if (!refId) {
            return;
        }

        if (!assignedNumbers[refId]) {
            assignedNumbers[refId] = currentCiteNumber++;

            const item = document.createElement("li");
            item.id = "ref-" + refId;
            item.innerHTML = "[" + assignedNumbers[refId] + "] " + (bibliographyDatabase[refId] || ("Citation missing for: " + refId));
            bibliographySection.appendChild(item);
        }

        element.innerHTML = '<a href="#ref-' + refId + '">[' + assignedNumbers[refId] + "]</a>";
    });
}

function initImageLightbox() {
    const clickableImages = Array.from(document.querySelectorAll("img"))
        .filter(function (image) {
            return !image.closest("[data-lightbox-ignore]") && image.closest("main");
        });

    if (!clickableImages.length) {
        return;
    }

    const overlay = document.createElement("div");
    overlay.className = "image-lightbox";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = [
        '<div class="image-lightbox-backdrop" data-lightbox-close></div>',
        '<button type="button" class="image-lightbox-close" aria-label="Close image viewer" data-lightbox-close>&times;</button>',
        '<div class="image-lightbox-panel" role="dialog" aria-modal="true" aria-label="Expanded image">',
        '<img class="image-lightbox-image" alt="">',
        "</div>"
    ].join("");
    document.body.appendChild(overlay);

    const overlayImage = overlay.querySelector(".image-lightbox-image");
    const closeTargets = overlay.querySelectorAll("[data-lightbox-close]");
    let lastFocusedElement = null;

    const applyResponsiveZoomScale = function () {
        if (!overlay.classList.contains("is-open") || !overlayImage) {
            return;
        }

        const imageRect = overlayImage.getBoundingClientRect();
        if (!imageRect.width || !imageRect.height) {
            return;
        }

        const computedStyles = window.getComputedStyle(overlayImage);
        const activeScale = parseFloat(computedStyles.getPropertyValue("--lightbox-zoom-scale")) || 1.25;
        const baseWidth = imageRect.width / activeScale;
        const baseHeight = imageRect.height / activeScale;

        const maxViewportWidth = window.innerWidth * 0.92;
        const maxViewportHeight = window.innerHeight * 0.86;
        const widthScaleLimit = maxViewportWidth / baseWidth;
        const heightScaleLimit = maxViewportHeight / baseHeight;
        const scale = Math.max(1, Math.min(1.8, widthScaleLimit, heightScaleLimit));

        overlayImage.style.setProperty("--lightbox-zoom-scale", scale.toFixed(3));
    };

    const closeOverlay = function () {
        if (!overlay.classList.contains("is-open")) {
            return;
        }

        overlay.classList.remove("is-open");
        overlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("lightbox-open");

        window.setTimeout(function () {
            overlayImage.style.removeProperty("--lightbox-zoom-scale");
            overlayImage.src = "";
            overlayImage.alt = "";
            if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
                lastFocusedElement.focus();
            }
            lastFocusedElement = null;
        }, 220);
    };

    const openOverlay = function (image) {
        if (!image || (!image.currentSrc && !image.src)) {
            return;
        }

        lastFocusedElement = document.activeElement;
        overlayImage.src = image.currentSrc || image.src;
        overlayImage.alt = image.alt || "Expanded image";
        overlayImage.classList.add("is-zoomed");
        overlay.classList.add("is-open");
        overlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-open");

        if (overlayImage.complete) {
            requestAnimationFrame(applyResponsiveZoomScale);
        } else {
            overlayImage.addEventListener("load", function handleImageLoad() {
                overlayImage.removeEventListener("load", handleImageLoad);
                requestAnimationFrame(applyResponsiveZoomScale);
            });
        }

        window.setTimeout(function () {
            const closeButton = overlay.querySelector(".image-lightbox-close");
            if (closeButton) {
                closeButton.focus();
            }
        }, 0);
    };

    clickableImages.forEach(function (image) {
        image.classList.add("clickable-image");
        image.setAttribute("role", "button");
        image.setAttribute("tabindex", "0");
        image.setAttribute("aria-label", image.alt ? "Open image: " + image.alt : "Open image in enlarged view");

        image.addEventListener("click", function () {
            openOverlay(image);
        });

        image.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openOverlay(image);
            }
        });
    });

    closeTargets.forEach(function (target) {
        target.addEventListener("click", closeOverlay);
    });

    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            closeOverlay();
        }
    });

    window.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeOverlay();
        }
    });

    window.addEventListener("resize", function () {
        if (overlay.classList.contains("is-open")) {
            requestAnimationFrame(applyResponsiveZoomScale);
        }
    }, { passive: true });
}
