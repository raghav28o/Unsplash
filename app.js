let searchparam = location.search.split("=").pop();
const access_key = "sd2MIqx5C98XgfVAE4pfFOjksKAsrAtdszSCPFY0K7o";

const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=30`;
const search_photo_url = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${searchparam}&per_page=50`;

const gallery = document.querySelector(".gallery");

let allImages;
let currentImage = 0;
// console.log(random_photo_url);

const getImages = () => {
  fetch(random_photo_url)
    .then((res) => res.json())
    .then((data) => {
      allImages = data;
      makeImages(allImages);
    });
};

const searchImages = () => {
  fetch(search_photo_url)
    .then((res) => res.json())
    .then((data) => {
      allImages = data.results;
      makeImages(allImages);
    });
};

const makeImages = (data) => {
  data.forEach((item, index) => {
    let img = document.createElement("img");
    img.src = item.urls.regular;
    img.className = "gallery-img";
    gallery.appendChild(img);
    img.addEventListener("click", () => {
      currentImage = index;
      showPopup(item);
    });
  });
};

const showPopup = (item) => {
  let popup = document.querySelector(".image-popup");
  const downloadBtn = document.querySelector(".download-btn");
  const closeBtn = document.querySelector(".close-btn");
  const image = document.querySelector(".large-img");

  popup.classList.remove("hide");
  downloadBtn.href = item.links.html;
  image.src = item.urls.regular;

  closeBtn.addEventListener("click", () => {
    popup.classList.add("hide");
  });
};

if (searchparam == "") {
  getImages();
} else {
  searchImages();
}
// getImages();
// searchImages();s

// controls
const preBtns = document.querySelector(".pre-btn");
const nxtBtns = document.querySelector(".nxt-btn");

preBtns.addEventListener("click", () => {
  if (currentImage > 0) {
    currentImage--;
    showPopup(allImages[currentImage]);
  }
});

nxtBtns.addEventListener("click", () => {
  if (currentImage < allImages.length - 1) {
    currentImage++;
    showPopup(allImages[currentImage]);
  }
});
