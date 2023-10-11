$(window).on("scroll", function () {
  var scroll = $(window).scrollTop();
  if (scroll < 5) {
    $(".header").removeClass("sticky");
  } else {
    $(".header").addClass("sticky");
  }
});

// offcanvs-menu
$(".bar").click(function () {
  $(".offcanvas-wrapper").addClass("active");
});
$(".offcanvas-cls").click(function () {
  $(".offcanvas-wrapper").removeClass("active");
});

// ANIMATION
window.scrollTo(0, 0);
const expertWrapper = document.querySelectorAll(".expert-wrapper");
expertWrapper.forEach((wrap) => {
  window.addEventListener("load", () => {
    let expertContent = wrap.querySelector(".expert-content");
    let expertBody = wrap.querySelectorAll(".expert-body");
    let wrapInner = wrap.querySelector(".expert-inner");
    let navs = wrap.querySelectorAll(".expert-nav li");
    let expertNavBg = wrap.querySelector(".expert-link-bg");
    let counter = 0;
    let gap = 10;

    function expertInit() {
      wrapInner.style.width = wrap.getBoundingClientRect().width + "px";
      expertContent.style.height =
        expertBody[counter].clientHeight + gap * counter + "px";
      for (let i = 0; i < expertBody.length; i++) {
        expertBody[i].style.left =
          (expertContent.clientWidth - expertBody[0].clientWidth) / 2 + "px";
      }

      let currentNav = navs[counter];
      expertNavBg.style.left = currentNav.offsetLeft + "px";
      expertNavBg.style.width = currentNav.clientWidth + "px";
    }
    window.addEventListener("resize", () => {
      setTimeout(() => {
        expertInit();
      }, 500);
    });
    expertInit();

    for (let i = 0; i < expertBody.length; i++) {
      expertBody[i].style.zIndex = i + 1;
      expertBody[i].style.position = "absolute";
      expertBody[i].style.top = gap * i + "px";
    }

    const animationAmount = navs.length;
    wrap.style.height = wrapInner.clientHeight * (animationAmount - 1) + "px";

    let wrapHeight = wrap.offsetHeight;
    let animationPart = wrapHeight / (animationAmount + 1);

    expertNavBg.style.left = navs[0].offsetLeft + "px";
    expertNavBg.style.width = navs[0].clientWidth + "px";

    function expertNavChange(counter) {
      let currentNav = navs[counter];
      for (let i = 0; i < navs.length; i++) {
        if (currentNav != navs[i]) {
          navs[i].classList.remove("active");
        }
      }
      currentNav.classList.add("active");
      expertNavBg.style.left = currentNav.offsetLeft + "px";
      expertNavBg.style.width = currentNav.clientWidth + "px";
    }

    function experBodyChange(counter) {
      for (let i = 0; i < expertBody.length; i++) {
        if (i <= counter) {
          expertBody[i].classList.add("active");
        } else {
          expertBody[i].classList.remove("active");
        }
      }
      expertContent.style.height =
        expertBody[counter].clientHeight + gap * counter + "px";
    }

    // sticky menu
    function offset(elt) {
      var rect = elt.getBoundingClientRect(),
        bodyElt = document.body;
      return {
        top: rect.top + bodyElt.scrollTop,
        left: rect.left + bodyElt.scrollLeft,
      };
    }

    let headerHeight = document.querySelector(".header").clientHeight + 10;
    const top = offset(wrap).top - headerHeight;
    const footTop = offset(wrap).top + wrap.offsetHeight - headerHeight;
    const maxY = footTop - wrapInner.offsetHeight;

    window.addEventListener("scroll", function () {
      let y = document.scrollingElement.scrollTop;
      if (y > top) {
        if (
          y >= top + animationPart * (counter + 1) &&
          counter < animationAmount - 1
        ) {
          counter++;
          expertNavChange(counter);
          experBodyChange(counter);
        }
        if (y <= top + animationPart * counter && counter >= 0) {
          counter--;
          expertNavChange(counter);
          experBodyChange(counter);
        }

        if (y < maxY) {
          wrapInner.style.position = "fixed";
          wrapInner.style.top = headerHeight + "px";
        } else {
          wrapInner.style.position = "absolute";
          wrapInner.style.top = maxY - top + "px";
        }
      } else {
        wrapInner.style.position = "relative";
        wrapInner.style.top = "0px";
      }
    });
  });
});

// slide-up-animation
jQuery(".slidem").prepend(
  jQuery(".slidem > div:last").clone()
); /* copy last div for the first slideup */
jQuery.fn.slideFadeToggle = function (speed, easing, callback) {
  return this.animate(
    { opacity: "toggle", height: "toggle" },
    speed,
    easing,
    callback
  );
}; /* slideup fade toggle code */
var divS = jQuery(".slidem > div") /* get the divs to slideup */,
  sDiv = jQuery(".slidem > div").length /* get the number of divs to slideup */,
  n = 0; /* starting counter */
function slidethem() {
  /* slide fade function */
  jQuery(divS)
    .eq(n)
    .slideFadeToggle(
      1000,
      "swing",
      (n = n + 1)
    ); /* slide fade the div at 1000ms swing and add to counter */
  jQuery(divS).eq(n).show(); /* make sure the next div is displayed */
}
(function slideit() {
  /* slide repeater */
  if (n == sDiv) {
    /* check if at the last div */
    n = 0; /* reset counter */
    jQuery(divS).show(); /* reset the divs */
  }
  slidethem(); /* call slide function */
  if (n == sDiv) {
    /* check if at the last div */
    setTimeout(slideit, 1); /* slide up first div fast */
  } else {
    setTimeout(slideit, 3000); /* slide up every 1000ms */
  }
})();
