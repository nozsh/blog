let imgURL = "https://assets.nozsh.com/img/blog/";
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
  let urlWithoutHash = window.location.href.split("#")[0]; // Fix /my/link/url/#abracadabra
  let replaceIT = urlWithoutHash + imgPATH;
  let replaceON = imgURL + extractLastPartFromUrl(urlWithoutHash) + "/";
  return relativePath.replace(replaceIT, replaceON);
}

document.addEventListener("DOMContentLoaded", () => {
  let imgElements = document.querySelectorAll("img[src*='" + imgPATH + "']");

  imgElements.forEach((imgElement) => {
    imgElement.src = addBaseUrl(imgElement.src);
  });
});
