// Função para ativar a animação quando o elemento entra na viewport
document.addEventListener("DOMContentLoaded", function () {
    const fadeInElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show"); // Adiciona a classe 'show' para ativar a animação
          observer.unobserve(entry.target); // Para de observar o elemento após a animação
        }
      });
    });

    fadeInElements.forEach((element) => {
      observer.observe(element); // Observa cada elemento com a classe 'fade-in'
    });
  });


  // Para esconder o navbar quando rolar o scroll do mouse para baixo
  let lastScrollTop = 0;

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollTop > lastScrollTop && scrollTop < maxScroll) {
      // Scroll down
      navbar.style.top = '-95px'; // Adjust this value based on your navbar height
    } else if (scrollTop < lastScrollTop && scrollTop > 0) {
      // Scroll up
      navbar.style.top = '0';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });



  // Efeito background animado

  gsap.registerPlugin(ScrollTrigger);

/* SMOOTH SCROLL */
const scroller = new LocomotiveScroll({
  el: document.querySelector(".container"),
  smooth: true
});

scroller.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".container", {
  scrollTop(value) {
    return arguments.length
      ? scroller.scrollTo(value, 0, 0)
      : scroller.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
});

ScrollTrigger.addEventListener("refresh", () => scroller.update());

ScrollTrigger.refresh();

/* COLOR CHANGER */
window.addEventListener("load", function () {
  const scrollColorElems = document.querySelectorAll("[data-bgcolor]");
  scrollColorElems.forEach((colorSection, i) => {
    const prevBg = i === 0 ? "" : scrollColorElems[i - 1].dataset.bgcolor;
    const prevText = i === 0 ? "" : scrollColorElems[i - 1].dataset.textcolor;

    ScrollTrigger.create({
      trigger: colorSection,
      scroller: ".container",
      start: "top 50%",
      onEnter: () =>
        gsap.to("body", {
          backgroundColor: colorSection.dataset.bgcolor,
          color: colorSection.dataset.textcolor,
          overwrite: "auto"
        }),
      onLeaveBack: () =>
        gsap.to("body", {
          backgroundColor: prevBg,
          color: prevText,
          overwrite: "auto"
        })
    });
  });
});
