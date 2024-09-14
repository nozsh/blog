let imgURL = "https://assets.nozsh.su/img/blog/";
let imgPATH = "@img/";

// /my/link/url/
// url be extracted from url
function extractLastPartFromUrl(url) {
  let ELPFU_regex = /\/([^\/]+)\/$/;
  let ELPFU_match = url.match(ELPFU_regex);
  if (ELPFU_match && ELPFU_match[1]) {
    return ELPFU_match[1];
  } else {
    return null;
  }
}

function addBaseUrl(relativePath) {
  let replaceIT = window.location.href + imgPATH;
  let replaceON = imgURL + extractLastPartFromUrl(window.location.href) + "/";
  return relativePath.replace(replaceIT, replaceON);
}

document.addEventListener("DOMContentLoaded", () => {
  let imgElements = document.querySelectorAll("img[src*='" + imgPATH + "']");

  imgElements.forEach((imgElement) => {
    imgElement.src = addBaseUrl(imgElement.src);
  });
});
