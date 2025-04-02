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




  // Perguntas do quiz
const quizQuestions = [
  {
    question: "Qual é o doce favorito da Gabriely?",
    options: ["Mousse de maracujá", "Doce de leite", "Torta de limão", "Chocolate"],
    answer: "Chocolate"
  },
  {
    question: "Qual é o hobby favorito da Gabriely?",
    options: ["Academia", "Assistir séries", "Cozinhar", "Ler livros"],
    answer: "Academia"
  },
  {
    question: "Qual é a cor favorita da Gabriely?",
    options: ["Rosa", "Verde", "Azul", "Preto"],
    answer: "Verde"
  },
  {
    question: "Qual é o maior sonho da Gabriely?",
    options: ["Viajar pelo mundo", "Ter uma casa própria", "Ser reconhecida profissionalmente", "Ter uma família feliz"],
    answer: "Viajar pelo mundo"
  },
  {
    question: "Qual é o nome da mãe da Gabriely?",
    options: ["Maria", "Cecília", "Roberta", "Carla"],
    answer: "Cecília"
  }
];

// Gera o quiz dinamicamente
const quizContainer = document.getElementById("quiz-container");

quizQuestions.forEach((q, index) => {
  const card = document.createElement("div");
  card.classList.add("quiz-card");

  const questionHTML = `
    <h5>${index + 1}. ${q.question}</h5>
    <div>
      ${q.options
        .map(
          (option, i) => `
        <div class="form-check fade-in">
          <input class="form-check-input fade-in" type="radio" name="question${index}" id="q${index}o${i}" value="${option}">
          <label class="form-check-label fade-in" for="q${index}o${i}">
            ${option}
          </label>
        </div>
      `
        )
        .join("")}
    </div>
  `;

  card.innerHTML = questionHTML;
  quizContainer.appendChild(card);
});

// Calcula o resultado do quiz
document.getElementById("submitQuiz").addEventListener("click", () => {
  let score = 0;
  let allAnswered = true;

  quizQuestions.forEach((q, index) => {
    const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
    if (!selectedOption) {
      allAnswered = false;
    } else if (selectedOption.value === q.answer) {
      score++;
    }
  });

  const quizResult = document.getElementById("quizResult");

  if (!allAnswered) {
    // Exibe mensagem de erro se nem todas as perguntas foram respondidas
    quizResult.textContent = "Por favor, selecione uma resposta para todas as perguntas antes de enviar!";
    quizResult.style.color = "#FF6B6B"; // Cor vermelha para mensagem de erro
  } else {
    // Exibe o resultado se todas as perguntas foram respondidas
    const resultText = `Você acertou ${score} de ${quizQuestions.length} perguntas!`;
    quizResult.textContent = resultText;
    quizResult.style.color = score === quizQuestions.length ? "#A6DE8E" : "#FF6B6B"; // Verde para todas corretas, vermelho para erros

      document.querySelectorAll("input[type='radio']").forEach((input) => {
        input.disabled = true;
      });
  }

  
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
