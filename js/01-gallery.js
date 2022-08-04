import { galleryItems } from "./gallery-items.js";

const galleryDiv = document.querySelector(".gallery");

renderGalleryMarkup();

galleryDiv.addEventListener("click", onGalleryClick);

function createGalleryMarkup() {
  return galleryItems.reduce(
    (acc, { preview, original, description }) =>
      (acc += `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`),
    ""
  );
}
function renderGalleryMarkup() {
  const markup = createGalleryMarkup();
  galleryDiv.insertAdjacentHTML("beforeend", markup);
}

function onGalleryClick(event) {
  event.preventDefault();
  const target = event.target;
  const isImgTag = target.nodeName;
  if (isImgTag !== "IMG") {
    return;
  }
  const imgOriginUrl = target.dataset.source;
  createModal(imgOriginUrl);
}

function createModal(url) {
  const modal = basicLightbox.create(
    `
    <img src="${url}" width="800" height="600">
`,
    {
      onShow: () => {
        window.addEventListener("keydown", onEscapeClick);
      },
      onClose: () => {
        window.removeEventListener("keydown", onEscapeClick);
      },
    }
  );
  modal.show();

  function onEscapeClick(event) {
    if (event.code === "Escape") {
      modal.close();
    }
  }
}
