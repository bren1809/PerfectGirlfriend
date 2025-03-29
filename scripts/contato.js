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



  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); // Impede o envio do formulário
  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const messageFeedback = document.getElementById("messageFeedback");
  
    // Limpa mensagens anteriores
    messageFeedback.textContent = "";
  
    if (!name || !email || !message) {
      // Exibe mensagem de erro se algum campo estiver vazio
      messageFeedback.textContent = "Por favor, preencha todos os campos!";
      messageFeedback.classList.remove("text-success");
      messageFeedback.classList.add("text-danger");
      return;
    }
  
    // Exibe mensagem de sucesso
    messageFeedback.textContent = "Mensagem enviada com sucesso!";
    messageFeedback.classList.remove("text-danger");
    messageFeedback.classList.add("text-success");
  
    // Limpa os campos do formulário
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
  });