const imageFolder = "./assets/img/show/";
const imageFiles = [
    { file: "foto0.jpg", title: "smiling dog", alt: "auf dem Rücken liegender lächelnder Hund" },
    { file: "foto1.jpg", title: "Herr der Ringe Stuntshow, Training", alt: "Steve packt Ben am Hals und hält ihn in der Luft" },
    { file: "foto2.jpg", title: "Herr der Ringe Stuntshow, Training", alt: "Steve und Ben beim Schwertkampftraining" },
    { file: "foto3.jpg", title: "Herr der Ringe Stuntshow", alt: "Herr der Ringe Stuntshow. Aragon gegen Lurtz Uruk Hai1" },
    { file: "foto4.jpg", title: "Herr der Ringe Stuntshow", alt: "Herr der Ringe Stuntshow. Aragon gegen Lurtz Uruk Hai2" },
    { file: "foto5.jpg", title: "Herr der Ringe Stuntshow", alt: "Herr der Ringe Stuntshow. Aragon gegen Lurtz Uruk Hai3" },
    { file: "foto6.jpg", title: "Herr der Ringe Stuntshow", alt: "Herr der Ringe Stuntshow. Lawrence Makoare versucht Steve/Lurtz Uruk Hai wieder zubeleben" },
    { file: "foto7.jpg", title: "Herr der Ringe Stuntshow", alt: "Herr der Ringe Stuntshow. Aragon gegen Lurtz Uruk Hai4" },
    { file: "foto8.jpg", title: "Mortal Combat Stuntshow", alt: "Mortal Combat Stuntshow. Ankunft der Kämpfer auf der Bühne" },
    { file: "foto9.jpg", title: "Mortal Combat Stuntshow. Backstage", alt: "Mortal Combat Stuntshow. Backstage, Steve mit Girls" },
    { file: "foto10.jpg", title: "Mortal Combat Stuntshow", alt: "Mortal Combat Stuntshow. Verabschiedung auf der Bühne" },
    { file: "foto11.jpg", title: "Mortal Combat Stuntshow", alt: "Mortal Combat Stuntshow. Steve wird umgehauen" },
    { file: "foto12.jpg", title: "Cobra 11, Autobahndreh", alt: "Cobra 11, Autobahndreh. Fliegendes Unfallauto hinter Steve im Flammenmeer1" },
    { file: "foto13.jpg", title: "Cobra 11, Autobahndreh", alt: "Cobra 11, Autobahndreh. Fliegendes Unfallauto hinter Steve im Flammenmeer2" },
    { file: "foto14.jpg", title: "Cobra 11, Autobahndreh", alt: "Cobra 11, Autobahndreh. Fliegendes Unfallauto hinter Steve im Flammenmeer3" },
    { file: "foto15.jpg", title: "Cobra 11, Autobahndreh", alt: "Cobra 11, Autobahndreh. Fliegendes Unfallauto hinter Steve im Flammenmeer4" },
    { file: "foto16.jpg", title: "Cobra 11, Autobahndreh", alt: "Cobra 11, Autobahndreh. Fliegendes Unfallauto hinter Steve im Flammenmeer5" },
    { file: "foto17.jpg", title: "Don 2. The King is Back", alt: "Don 2. The King is Back. Don's Widersacher nnebeneinander kommen auf die Kamera zu1" },
    { file: "foto18.jpg", title: "Don 2. The King is Back", alt: "Don 2. The King is Back. Don's Widersacher nnebeneinander kommen auf die Kamera zu2" },
    { file: "foto19.jpg", title: "Don 2. The King is Back", alt: "Don 2. The King is Back. Don's Widersacher nnebeneinander kommen auf die Kamera zu3" },
    { file: "foto20.jpg", title: "ARD Oskar Kinomagazin", alt: "Steve schlägt golden angemalt einen großen Gong vom ersten Programm" },
    { file: "foto21.jpg", title: "Steve bringt der Katze das driften bei", alt: "Steve bringt der Katze das driften bei. Steve und Walter im Gespräch" },
    { file: "foto22.jpg", title: "Steve bringt der Katze das driften bei", alt: "Steve bringt der Katze das driften bei. Steve und Walter posen" },
    { file: "foto23.jpg", title: "Steve bringt der Katze das driften bei", alt: "Steve bringt der Katze das driften bei. Steve, Walter, D. Katzenberger zeigen Daumen hoch" },
    { file: "foto24.jpg", title: "Steve bringt der Katze das driften bei", alt: "Steve bringt der Katze das driften bei. Steve mit Katzenberger im Arm" },
    { file: "foto25.jpg", title: "Ninja-Mama-Dreh", alt: "Ninja-Mama-Dreh. Steve steht mit Pistole und Anzug auf Boot" },
    { file: "foto26.jpg", title: "Ninja-Mama-Dreh", alt: "Ninja-Mama-Dreh. Landender Hubschrauber auf Rollfeld" },
    { file: "foto27.jpg", title: "Ninja-Mama-Dreh", alt: "Ninja-Mama-Dreh. Hubschrauber im Anflug über Dühnen" },
    { file: "foto28.jpg", title: "Steve als Trainer", alt: "Steve als Trainer" },
    { file: "foto29.jpg", title: "Steve's Setcard", alt: "Steve's Setcard" },
    { file: "foto30.jpg", title: "Best Friend, Devil", alt: "Steve's Hund Devil auf Hundehütte am relaxen" }
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
        img.src = imageFolder + imageFiles[i].file;
        img.alt = imageFiles[i].alt;

        // Bildtitel optional unterhalb anzeigen
        const figure = document.createElement("figure");
        const caption = document.createElement("figcaption");

        caption.textContent = imageFiles[i].title;

        figure.appendChild(img);
        figure.appendChild(caption);
        gallery.appendChild(figure);

        img.addEventListener('click', () => openLightbox(i));
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

const lightboxCaption = document.getElementById('lightbox-caption');

function openLightbox(i) {
    lightboxIndex = i;
    lightbox.style.display = 'flex';
    lightboxImg.src = imageFolder + imageFiles[i].file;
    lightboxCaption.textContent = imageFiles[i].title; // Titel anzeigen
}

function showLightboxSlide(i) {
    lightboxIndex = (i + slides.length) % slides.length;
    lightboxImg.src = imageFolder + imageFiles[lightboxIndex].file;
    lightboxCaption.textContent = imageFiles[lightboxIndex].title;
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