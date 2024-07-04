document.addEventListener("DOMContentLoaded", function () {
  let assets = "https://assets.domain.org";
  let rHost = "domain.org";
  let localhost = window.location.origin;
  let host;

  if (window.location.origin.includes(rHost)) {
    host = assets;
  } else {
    host = assets;
    // host = localhost;
  }

  let imgs = document.querySelectorAll("img");
  let pagePath = window.location.pathname;

  imgs.forEach((img) => {
    if (img.src.includes("/assets:/")) {
      let imgFile = img.src.split("/assets:/")[1];
      img.src = host + pagePath + imgFile;
    }
  });
});
