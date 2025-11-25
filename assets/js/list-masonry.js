// да, это костыль

document.addEventListener("DOMContentLoaded", function () {
  let isApplied = false;
  let originalArticles = [];
  let mainElement = null;
  let sWidth = 768;

  function initializeVariables() {
    mainElement = document.querySelector(
      "main.main:has(> article.first-entry, > article.post-entry)"
    );
    if (!mainElement) return false;

    originalArticles = Array.from(mainElement.children).filter((child) =>
      child.matches("article.first-entry, article.post-entry")
    );

    return originalArticles.length > 1;
  }

  function applyReorder() {
    if (!mainElement || isApplied) return;

    const pageFooter = mainElement.querySelector("footer.page-footer");
    const reorderedArticles = [];

    for (let i = 0; i < originalArticles.length; i += 2) {
      reorderedArticles.push(originalArticles[i]);
    }
    for (let i = 1; i < originalArticles.length; i += 2) {
      reorderedArticles.push(originalArticles[i]);
    }

    originalArticles.forEach((article) => article.remove());

    reorderedArticles.forEach((article) => {
      if (pageFooter) {
        mainElement.insertBefore(article, pageFooter);
      } else {
        mainElement.appendChild(article);
      }
    });

    isApplied = true;
  }

  function restoreOriginalOrder() {
    if (!mainElement || !isApplied) return;

    const pageFooter = mainElement.querySelector("footer.page-footer");

    const currentArticles = Array.from(mainElement.children).filter((child) =>
      child.matches("article.first-entry, article.post-entry")
    );
    currentArticles.forEach((article) => article.remove());

    originalArticles.forEach((article) => {
      if (pageFooter) {
        mainElement.insertBefore(article, pageFooter);
      } else {
        mainElement.appendChild(article);
      }
    });

    isApplied = false;
  }

  function handleResize() {
    const screenWidth = window.innerWidth;

    if (screenWidth >= sWidth) {
      if (!isApplied) {
        applyReorder();
      }
    } else {
      if (isApplied) {
        restoreOriginalOrder();
      }
    }
  }

  if (initializeVariables()) {
    handleResize();

    window.addEventListener("resize", handleResize);
  }
});
