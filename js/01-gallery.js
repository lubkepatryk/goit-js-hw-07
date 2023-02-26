import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryContainer = document.querySelector(".gallery");
const itemsMarkup = createGalleryItemsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML("beforeend", itemsMarkup);
galleryContainer.addEventListener("click", onImgClickCreateModal);

function createGalleryItemsMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </div>`;
    })
    .join("");
}

function onImgClickCreateModal(event) {
  event.preventDefault();

  const isItemImage = event.target.classList.contains("gallery__image");

  if (!isItemImage) {
    return;
  }

  const currentImgUrl = event.target.dataset.source;

  const instance = basicLightbox.create(
    `<img src="${currentImgUrl}" width="800" height="auto"/>`,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", onEscKeyPress);
      },
      onClose: (instance) => {
        window.removeEventListener("keydown", onEscKeyPress);
      },
    }
  );

  instance.show();

  function onEscKeyPress(event) {
    const ESC_KEY = "Escape";

    const isEscKey = event.code === ESC_KEY;

    if (isEscKey) {
      instance.close();
    }
  }
}
