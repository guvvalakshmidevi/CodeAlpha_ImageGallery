/* =========================
   IMAGE GALLERY
========================= */

const galleryItems = Array.from(
    document.querySelectorAll(".gallery-item")
);

const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");

const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

const zoomIn = document.getElementById("zoomIn");
const zoomOut = document.getElementById("zoomOut");
const zoomReset = document.getElementById("zoomReset");

let visibleItems = galleryItems;
let currentIndex = 0;
let zoomLevel = 1;


/* =========================
   FILTER
========================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;

        /* Active button */
        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        /* Filter images */
        visibleItems = galleryItems.filter(item => {

            const category = item.dataset.category;

            return filter === "all" || category === filter;

        });

        /* Show / hide */
        galleryItems.forEach(item => {

            if (visibleItems.includes(item)) {

                item.style.display = "";

            } else {

                item.style.display = "none";

            }

        });

    });

});


/* =========================
   OPEN LIGHTBOX
========================= */

function openLightbox(item) {

    currentIndex = visibleItems.indexOf(item);

    if (currentIndex === -1) return;

    zoomLevel = 1;

    updateLightbox();

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
}


/* =========================
   UPDATE LIGHTBOX
========================= */

function updateLightbox() {

    const item = visibleItems[currentIndex];

    if (!item) return;

    const image = item.querySelector("img");
    const title = item.querySelector("h3");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    if (title) {
        lightboxTitle.textContent = title.textContent;
    }

    zoomLevel = 1;

    applyZoom();
}


/* =========================
   IMAGE CLICK
========================= */

galleryItems.forEach(item => {

    item.addEventListener("click", event => {

        /* Ignore view button separately */
        if (event.target.closest(".view-btn")) {
            event.stopPropagation();
        }

        openLightbox(item);

    });

});


/* =========================
   ZOOM
========================= */

function applyZoom() {

    lightboxImage.style.transform =
        `scale(${zoomLevel})`;

    zoomReset.textContent =
        `${Math.round(zoomLevel * 100)}%`;
}


/* Zoom In */

zoomIn.addEventListener("click", event => {

    event.stopPropagation();

    if (zoomLevel < 3) {

        zoomLevel += 0.25;

        applyZoom();

    }

});


/* Zoom Out */

zoomOut.addEventListener("click", event => {

    event.stopPropagation();

    if (zoomLevel > 1) {

        zoomLevel -= 0.25;

        applyZoom();

    }

});


/* Reset */

zoomReset.addEventListener("click", event => {

    event.stopPropagation();

    zoomLevel = 1;

    applyZoom();

});


/* =========================
   MOUSE WHEEL ZOOM
========================= */

lightboxImage.addEventListener("wheel", event => {

    event.preventDefault();

    if (event.deltaY < 0 && zoomLevel < 3) {

        zoomLevel += 0.25;

    }

    if (event.deltaY > 0 && zoomLevel > 1) {

        zoomLevel -= 0.25;

    }

    applyZoom();

});


/* =========================
   NEXT
========================= */

lightboxNext.addEventListener("click", event => {

    event.stopPropagation();

    if (visibleItems.length === 0) return;

    currentIndex++;

    if (currentIndex >= visibleItems.length) {

        currentIndex = 0;

    }

    updateLightbox();

});


/* =========================
   PREVIOUS
========================= */

lightboxPrev.addEventListener("click", event => {

    event.stopPropagation();

    if (visibleItems.length === 0) return;

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = visibleItems.length - 1;

    }

    updateLightbox();

});


/* =========================
   CLOSE
========================= */

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

    zoomLevel = 1;

}

lightboxClose.addEventListener(
    "click",
    closeLightbox
);


/* =========================
   CLICK OUTSIDE IMAGE
========================= */

lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


/* =========================
   KEYBOARD
========================= */

document.addEventListener("keydown", event => {

    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") {

        closeLightbox();

    }

    if (event.key === "ArrowRight") {

        lightboxNext.click();

    }

    if (event.key === "ArrowLeft") {

        lightboxPrev.click();

    }

    if (event.key === "+") {

        zoomIn.click();

    }

    if (event.key === "-") {

        zoomOut.click();

    }

});


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}


/* Close mobile menu */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks?.classList.remove("active");

    });

});