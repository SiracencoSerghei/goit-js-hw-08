//   1. import the galleryItems array
//   2. create murkup template for each galleriItem.
//   3. append the galleru markup to the DOM (div.gallery).
//   4.set up a click eventLictener on the gallery element (div.gallery).
//   5. make the functions to open and close the original image.

import { galleryItems } from './gallery-items.js';

const galleryItemsMarkup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<div class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" alt="${description}" data-source="${original}"></a></div>`
  )
  .join('');

const gallery = document.querySelector('.gallery');
gallery.innerHTML = galleryItemsMarkup;

gallery.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();
  const link = event.target.closest('.gallery__link');
  if (!link) {
    return;
  }
  const originalUrl = event.target.dataset.source;
  const description = document.querySelector('.gallery__image').alt;
  openModal(originalUrl, description);
}

function openModal(url, description) {
  const instance = basicLightbox.create(`
    <img src="${url}" width="800" height="600" alt="${description}">
  `);
  instance.show();

  window.addEventListener('keydown', closeEscapeModal);
}

function closeEscapeModal(event) {
  if (event.code === 'Escape') {
    const modal = document.querySelector('.basicLightbox');
    if (modal) {
      modal.remove();
    }
  }
  window.removeEventListener('keydown', closeEscapeModal);
}

//  solution with class

// class Gallery {
//   constructor() {
//     this.galleryItemsMarkup = galleryItems
//       .map(
//         ({ preview, original, description }) =>
//           `<div class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" alt="${description}" data-source="${original}"></a></div>`
//       )
//       .join("");
//     this.gallery = document.querySelector(".gallery");
//     this.gallery.innerHTML = this.galleryItemsMarkup;

//     this.gallery.addEventListener("click", this.onGalleryClick.bind(this));
//   }

//   onGalleryClick(event) {
//     event.preventDefault();
//     const link = event.target.closest(".gallery__link");
//     if (!link) {
//       return;
//     }
//     const originalUrl = event.target.dataset.source;
//     const description = link.querySelector(".gallery__image").alt;
//     this.openModal(originalUrl, description);
//   }

//   openModal(url, description) {
//     const instance = basicLightbox.create(`
//       <img src="${url}" width="800" height="600" alt="${description}">
//     `);
//     instance.show();
//     window.addEventListener("keydown", this.closeEscapeModal.bind(this));
//   }

//   closeEscapeModal(event) {
//     if (event.code === "Escape") {
//       const modal = document.querySelector(".basicLightbox");
//       if (modal) {
//         modal.remove();
//       }
//     }
//     window.removeEventListener("keydown", this.closeEscapeModal.bind(this));
//   }
// }

// const gallery = new Gallery();
