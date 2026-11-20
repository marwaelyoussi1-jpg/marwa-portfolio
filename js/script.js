/* =================================
   MENU MOBILE
================================= */

const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {
        const isOpen = navbar.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Fermer le menu" : "Ouvrir le menu"
        );
    });

    // Fermer le menu après avoir choisi une rubrique
    navbar.querySelectorAll("a:not(.dropdown-toggle)").forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Ouvrir le menu");
        });
    });
}


/* =================================
   MENUS DÉROULANTS
   PROFIL ET EXPÉRIENCES
================================= */

const dropdowns = document.querySelectorAll(".nav-dropdown");

dropdowns.forEach(dropdown => {

    const toggle = dropdown.querySelector(".dropdown-toggle");

    if (!toggle) return;

    toggle.addEventListener("click", event => {

        if (window.innerWidth <= 700) {
            event.preventDefault();

            // Fermer les autres menus déroulants
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove("open");
                }
            });

            dropdown.classList.toggle("open");
        }
    });

    // Fermer le sous-menu après avoir choisi une rubrique
    dropdown.querySelectorAll(".dropdown-menu a").forEach(link => {
        link.addEventListener("click", () => {
            dropdown.classList.remove("open");

            if (navbar) {
                navbar.classList.remove("active");
            }

            if (menuToggle) {
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Ouvrir le menu");
            }
        });
    });

});

// Fermer les menus déroulants si on clique ailleurs
document.addEventListener("click", event => {
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove("open");
        }
    });
});


/* =================================
   GALERIES PHOTOS INTERACTIVES
================================= */

const galleries = document.querySelectorAll(".stm-gallery");
const lightbox = document.getElementById("lightbox");

if (galleries.length > 0 && lightbox) {

    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxCounter = document.getElementById("lightbox-counter");

    const closeButton = document.getElementById("lightbox-close");
    const prevButton = document.getElementById("lightbox-prev");
    const nextButton = document.getElementById("lightbox-next");

    let currentPhotos = [];
    let currentIndex = 0;

    function showPhoto(index) {

        if (currentPhotos.length === 0) return;

        currentIndex = (index + currentPhotos.length) % currentPhotos.length;

        const photo = currentPhotos[currentIndex];

        lightboxImage.src = photo.src;
        lightboxImage.alt = photo.alt;

        const caption = photo.parentElement.querySelector("p");

        lightboxCaption.textContent = caption ? caption.textContent : "";

        lightboxCounter.textContent =
            `${currentIndex + 1} / ${currentPhotos.length}`;
    }

    function openLightbox(photos, index) {

        currentPhotos = photos;
        showPhoto(index);

        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {

        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    }

    galleries.forEach(gallery => {

        const photos = Array.from(
            gallery.querySelectorAll(".stm-photo img")
        );

        photos.forEach((photo, index) => {

            photo.addEventListener("click", () => {
                openLightbox(photos, index);
            });

        });

    });

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            showPhoto(currentIndex + 1);
        });
    }

    if (prevButton) {
        prevButton.addEventListener("click", () => {
            showPhoto(currentIndex - 1);
        });
    }

    if (closeButton) {
        closeButton.addEventListener("click", closeLightbox);
    }

    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", event => {

        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowRight") showPhoto(currentIndex + 1);
        if (event.key === "ArrowLeft") showPhoto(currentIndex - 1);

    });
}
