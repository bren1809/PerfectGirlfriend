const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
const alertButton = document.getElementById('liveAlertBtn');
const modal = document.getElementById("exampleModal");
const caracteristicas = document.querySelectorAll('.animation-mouse');
const navbar = document.getElementById('navbar');

function adjustAlertPosition() {
    if (navbar.style.top === '-95px') {
        alertPlaceholder.style.top = '0';
    } else {
        alertPlaceholder.style.top = '97px';
    }

}

window.addEventListener('scroll', () => {
    adjustAlertPosition();
}
);

adjustAlertPosition();

// Função para criar o alerta
function showAlert(message, type) {
    const alertHTML = `
    <div class="alert alert-${type} alert-dismissible fade show d-flex align-items-center" role="alert" style="margin: 0; border-radius: 0;">
        <i class="bi bi-exclamation-triangle-fill me-2"></i> <!-- Ícone de alerta -->
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;

  // Insere o alerta no placeholder
  alertPlaceholder.innerHTML = alertHTML;

  // Remove o alerta automaticamente após 5 segundos
  setTimeout(() => {
    const alertElement = document.querySelector('.alert');
    if (alertElement) {
      alertElement.classList.remove('show');
      alertElement.classList.add('fade');
      setTimeout(() => alertElement.remove(), 200); // Remove o elemento após a transição
    }
  }, 6000);
}

// Adiciona o evento de clique ao botão
alertButton.addEventListener('click', () => {
  showAlert(
    'Essa opção está indisponível e sem informações. Tente novamente mais tarde',
    'danger'
  );
});
  
  // Adiciona o evento de clique a cada tópico


  caracteristicas.forEach(caracteristica => {
    caracteristica.addEventListener('click', () => {
      if (caracteristica.classList.contains('active')) {
        caracteristica.classList.remove('active'); // Remove o destaque se já estiver ativo
      } else {
        // Remove a classe 'active' de todos os tópicos
        caracteristicas.forEach(c => c.classList.remove('active'));
        // Adiciona a classe 'active' ao tópico clicado
        caracteristica.classList.add('active');
}
    });
  });


      // Detectar quando o modal é aberto
  modal.addEventListener("show.bs.modal", () => {
    document.body.classList.add("modal-open");
  });

  // Detectar quando o modal é fechado
  modal.addEventListener("hidden.bs.modal", () => {
    document.body.classList.remove("modal-open");
  });



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