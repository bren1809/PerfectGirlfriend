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




const backToTopButton = document.getElementById("backToTop");

  // Mostra o botão quando o usuário rolar para baixo
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) { // Exibe o botão após rolar 300px
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });

  // Rola suavemente para o topo ao clicar no botão
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });