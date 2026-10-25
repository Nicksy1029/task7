(function () {
  "use strict";

  var track = document.getElementById("track");
  var slides = track.getElementsByClassName("slider__slide");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");
  var pager = document.getElementById("pager");

  var currentPage = 0;

  // Сколько слайдов показывать на экране (3 — десктоп, 1 — смартфон)
  function getVisibleCount() {
    if (window.matchMedia("(max-width: 640px)").matches) {
      return 1;
    }
    if (window.matchMedia("(max-width: 900px)").matches) {
      return 2;
    }
    return 3;
  }

  // Сколько всего «страниц» (позиций) в слайдере
  function getMaxPage() {
    var visible = getVisibleCount();
    return Math.max(0, slides.length - visible);
  }

  // Пересчёт положения ленты и активной точки пейджера
  function update() {
    var visible = getVisibleCount();
    var maxPage = getMaxPage();

    if (currentPage > maxPage) {
      currentPage = maxPage;
    }
    if (currentPage < 0) {
      currentPage = 0;
    }

    var slideWidth = 100 / visible;
    track.style.transform = "translateX(-" + (currentPage * slideWidth) + "%)";

    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage >= maxPage;

    updatePager(maxPage);
  }

  // Создание и обновление точек пейджера
  function updatePager(maxPage) {
    var pagesCount = maxPage + 1;

    // Если количество страниц изменилось — пересоздаём точки
    if (pager.children.length !== pagesCount) {
      pager.innerHTML = "";
      for (var i = 0; i < pagesCount; i++) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "pager__dot";
        dot.setAttribute("aria-label", "Страница " + (i + 1));
        dot.setAttribute("data-page", String(i));
        pager.appendChild(dot);
      }
    }

    var dots = pager.getElementsByClassName("pager__dot");
    for (var j = 0; j < dots.length; j++) {
      if (j === currentPage) {
        dots[j].classList.add("pager__dot--active");
      } else {
        dots[j].classList.remove("pager__dot--active");
      }
    }
  }

  // Обработчики стрелок
  prevBtn.addEventListener("click", function () {
    if (currentPage > 0) {
      currentPage -= 1;
      update();
    }
  });

  nextBtn.addEventListener("click", function () {
    if (currentPage < getMaxPage()) {
      currentPage += 1;
      update();
    }
  });

  // Обработчик клика по пейджеру (делегирование)
  pager.addEventListener("click", function (event) {
    var target = event.target;
    if (target.classList.contains("pager__dot")) {
      currentPage = parseInt(target.getAttribute("data-page"), 10);
      update();
    }
  });

  // Пересчёт при изменении размера окна
  window.addEventListener("resize", function () {
    update();
  });

  // Инициализация
  update();
})();