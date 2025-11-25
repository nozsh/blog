// document.addEventListener("DOMContentLoaded", function () {
//   // Определяем высоту фиксированного header
//   let headerHeight = document.querySelector("header").offsetHeight;

//   document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
//     anchor.addEventListener("click", function (e) {
//       e.preventDefault();
//       let id = this.getAttribute("href").substr(1);
//       let targetElement = document.querySelector(
//         `[id='${decodeURIComponent(id)}']`
//       );

//       // Вычисляем позицию с учетом высоты заголовка
//       let targetPosition =
//         targetElement.getBoundingClientRect().top +
//         window.scrollY -
//         headerHeight +
//         -20;

//       if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
//         window.scrollTo({
//           top: targetPosition,
//           behavior: "smooth",
//         });
//       } else {
//         window.scrollTo(0, targetPosition);
//       }

//       if (id === "top") {
//         history.replaceState(null, null, " ");
//       } else {
//         history.pushState(null, null, `#${id}`);
//       }
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  let headerHeight = document.querySelector("header").offsetHeight;
  let headerHeight20 = 30;
  let targetElement = null;
  let isScrolling = false;
  let userInteracted = false;
  let scrollTimeout = null;

  // Tracking user interactions
  function onUserScroll() {
    if (isScrolling) {
      userInteracted = true;
      isScrolling = false;
    }
  }

  // Adding listener to mouse wheel and touch
  window.addEventListener("wheel", onUserScroll, { passive: true });
  window.addEventListener("touchstart", onUserScroll, { passive: true });

  // Observer for images
  const imageObserver = new IntersectionObserver((entries) => {
    if (!isScrolling || !targetElement || userInteracted) return;

    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target.loading === "lazy") {
        // When image loads adjust position
        entry.target.addEventListener(
          "load",
          () => {
            if (!isScrolling || userInteracted) return;

            let targetPosition =
              targetElement.getBoundingClientRect().top +
              window.scrollY -
              headerHeight +
              -headerHeight20;

            // Smooth
            if (
              !window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ) {
              window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
              });
            } else {
              window.scrollTo(0, targetPosition);
            }
          },
          { once: true }
        );
      }
    });
  });

  // Наблюдаем за всеми lazy изображениями
  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    imageObserver.observe(img);
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      let id = this.getAttribute("href").substr(1);
      targetElement = document.querySelector(
        `[id='${decodeURIComponent(id)}']`
      );

      let targetPosition =
        targetElement.getBoundingClientRect().top +
        window.scrollY -
        headerHeight +
        -headerHeight20;

      isScrolling = true;
      userInteracted = false;

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Очищаем предыдущий таймаут
        clearTimeout(scrollTimeout);

        // Останавливаем отслеживание через 3 секунды
        scrollTimeout = setTimeout(() => {
          if (userInteracted) {
            isScrolling = false;
            return;
          }

          // Финальная плавная корректировка
          let finalPosition =
            targetElement.getBoundingClientRect().top +
            window.scrollY -
            headerHeight +
            -headerHeight20;

          if (Math.abs(window.scrollY - finalPosition) > 10) {
            if (
              !window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ) {
              window.scrollTo({
                top: finalPosition,
                behavior: "smooth",
              });
            } else {
              window.scrollTo(0, finalPosition);
            }
          }

          isScrolling = false;
        }, 3000);
      } else {
        window.scrollTo(0, targetPosition);
        isScrolling = false;
      }

      if (id === "top") {
        history.replaceState(null, null, " ");
      } else {
        history.pushState(null, null, `#${id}`);
      }
    });
  });
});
