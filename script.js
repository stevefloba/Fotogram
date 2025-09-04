const imageFolder = "./assets/img/show/";
const imageFiles = [
    "foto0.jpg",
    "foto1.jpg",
    "foto2.jpg",
    "foto3.jpg",
    "foto4.jpg",
    "foto5.jpg",
    "foto6.jpg",
    "foto7.jpg",
    "foto8.jpg",
    "foto9.jpg",
    "foto10.jpg",
    "foto11.jpg",
    "foto12.jpg",
    "foto13.jpg",
    "foto14.jpg",
    "foto15.jpg",
    "foto16.jpg",
    "foto17.jpg",
    "foto18.jpg",
    "foto19.jpg",
    "foto20.jpg",
    "foto21.jpg",
    "foto22.jpg",
    "foto23.jpg",
    "foto24.jpg",
    "foto25.jpg",
    "foto26.jpg",
    "foto27.jpg",
    "foto28.jpg",
    "foto29.jpg",
    "foto30.jpg"
];

const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.getElementById('loadMore');

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let imagesPerLoad = 12;   // 3 Reihen á 4 Bilder (je nach Bildschirmbreite variabel)
let currentIndex = 0;
let slides = [];

// Bilder laden
function loadImages() {
    const end = Math.min(currentIndex + imagesPerLoad, imageFiles.length);

    for (let i = currentIndex; i < end; i++) {
        const img = document.createElement("img");
        img.src = imageFolder + imageFiles[i];
        img.alt = imageFiles[i];
        img.addEventListener('click', () => openLightbox(i));
        gallery.appendChild(img);
        slides.push(img);
    }

    currentIndex = end;

    if (currentIndex >= imageFiles.length) {
        loadMoreBtn.style.display = "none"; // Button ausblenden wenn alle Bilder da sind
    }
}

// Initiale Ladung
loadImages();

// Button-Event
loadMoreBtn.addEventListener('click', loadImages);

// -------------------
// Lightbox
// -------------------
let lightboxIndex = 0;

function openLightbox(i) {
    lightboxIndex = i;
    lightbox.style.display = 'flex';
    lightboxImg.src = slides[lightboxIndex].src;
}

function showLightboxSlide(i) {
    lightboxIndex = (i + slides.length) % slides.length;
    lightboxImg.src = slides[lightboxIndex].src;
}

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightboxPrev.addEventListener('click', () => showLightboxSlide(lightboxIndex - 1));
lightboxNext.addEventListener('click', () => showLightboxSlide(lightboxIndex + 1));

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});