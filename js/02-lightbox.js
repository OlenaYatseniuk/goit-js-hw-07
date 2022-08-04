import { galleryItems } from "./gallery-items.js";
console.log(SimpleLightbox);

const galleryDiv = document.querySelector(".gallery");
renderGalleryMarkup();

function createGalleryMarkup() {
  return galleryItems.reduce(
    (acc, { preview, original, description }) =>
      (acc += `
  <a class="gallery__item" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      alt="${description}"
    />
  </a>`),
    ""
  );
}
function renderGalleryMarkup() {
  const markup = createGalleryMarkup();
  galleryDiv.insertAdjacentHTML("beforeend", markup);
}

var lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});
