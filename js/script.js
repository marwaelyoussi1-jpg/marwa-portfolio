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

    // Fermer le menu après avoir choisi une page
    navbar.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Ouvrir le menu");
        });
    });
}

// MENU DEROULANT PROFIL

const profileDropdown = document.querySelector(".nav-dropdown");
const profileButton = document.getElementById("profile-dropdown");

if (profileDropdown && profileButton) {

    profileButton.addEventListener("click", function () {
        profileDropdown.classList.toggle("open");
    });

    // Fermer le menu après avoir choisi une rubrique
    profileDropdown.querySelectorAll(".dropdown-menu a").forEach(link => {
        link.addEventListener("click", function () {
            profileDropdown.classList.remove("open");
        });
    });

    // Fermer si on clique ailleurs
    document.addEventListener("click", function (event) {
        if (!profileDropdown.contains(event.target)) {
            profileDropdown.classList.remove("open");
        }
    });
}
/* =================================
   GALERIE PHOTOS INTERACTIVE
================================= */

const gallery = document.querySelector(".stm-gallery");

if (gallery) {

    const photos = gallery.querySelectorAll(".stm-photo img");

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxCounter = document.getElementById("lightbox-counter");

    const closeButton = document.getElementById("lightbox-close");
    const prevButton = document.getElementById("lightbox-prev");
    const nextButton = document.getElementById("lightbox-next");

    let currentIndex = 0;

    function showPhoto(index) {

        currentIndex = (index + photos.length) % photos.length;

        const photo = photos[currentIndex];

        lightboxImage.src = photo.src;
        lightboxImage.alt = photo.alt;

        const caption = photo.parentElement.querySelector("p");

        lightboxCaption.textContent = caption ? caption.textContent : "";

        lightboxCounter.textContent =
            `${currentIndex + 1} / ${photos.length}`;
    }

    function openLightbox(index) {

        showPhoto(index);

        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {

        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    }

    photos.forEach((photo, index) => {

        photo.addEventListener("click", () => {
            openLightbox(index);
        });

    });

    nextButton.addEventListener("click", () => {
        showPhoto(currentIndex + 1);
    });

    prevButton.addEventListener("click", () => {
        showPhoto(currentIndex - 1);
    });

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });

    document.addEventListener("keydown", (event) => {

        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            showPhoto(currentIndex + 1);
        }

        if (event.key === "ArrowLeft") {
            showPhoto(currentIndex - 1);
        }

    });

}

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

        const photos = Array.from(gallery.querySelectorAll(".stm-photo img"));

        photos.forEach((photo, index) => {

            photo.addEventListener("click", () => {
                openLightbox(photos, index);
            });

        });

    });

    nextButton.addEventListener("click", () => {
        showPhoto(currentIndex + 1);
    });

    prevButton.addEventListener("click", () => {
        showPhoto(currentIndex - 1);
    });

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });

    document.addEventListener("keydown", event => {

        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            showPhoto(currentIndex + 1);
        }

        if (event.key === "ArrowLeft") {
            showPhoto(currentIndex - 1);
        }

    });

}
/* MENU DEROULANT EXPERIENCES */

const experienceDropdown = document.querySelector(".nav-dropdown");
const experienceToggle = document.querySelector(".dropdown-toggle");

if (experienceDropdown && experienceToggle) {
    experienceToggle.addEventListener("click", function(event) {
        if (window.innerWidth <= 700) {
            event.preventDefault();
            experienceDropdown.classList.toggle("open");
        }
    });
}