document.addEventListener("DOMContentLoaded", function () {
  // Определяем высоту фиксированного header
  let headerHeight = document.querySelector("header").offsetHeight;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      let id = this.getAttribute("href").substr(1);
      let targetElement = document.querySelector(
        `[id='${decodeURIComponent(id)}']`
      );

      // Вычисляем позицию с учетом высоты заголовка
      let targetPosition =
        targetElement.getBoundingClientRect().top +
        window.scrollY -
        headerHeight +
        -20;

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      } else {
        window.scrollTo(0, targetPosition);
      }

      if (id === "top") {
        history.replaceState(null, null, " ");
      } else {
        history.pushState(null, null, `#${id}`);
      }
    });
  });
});
