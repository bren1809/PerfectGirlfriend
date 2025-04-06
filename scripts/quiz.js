// Gera o quiz dinamicamente
const quizContainer = document.getElementById("quiz-privilegiado");

const quizQuestions = [
  {
    question: "Quando se beijamos pela primeira vez?",
    options: ["18/09", "25/11", "15/04", "20/10"],
    answer: "18/09"
  },
  {
    question: "Qual foi o primeiro presente que te dei?",
    options: ["Carta feito à mão", "Açaí", "Pulseira preta", "Barrinha da Bold"],
    answer: "Barrinha da Bold"
  },
  {
    question: "Onde se vimos pela primeira vez?",
    options: ["Quadra da Escola", "Na rua da sua casa", "Na porta do banheiro da escola", "Na sala de aula"],
    answer: "Na porta do banheiro da escola"
  },
  {
    question: "Qual foi o lugar que saímos pela primeira vez?",
    options: ["Restaurante perto da sua casa", "No shopping", "Hambúrgueria no Santa Efigiênia", "No grota"],
    answer: "No shopping"
  },
  {
    question: "Qual foi o primeiro elogio que fiz para você?",
    options: ["Seu sotaque", "Sua beleza", "Seu cabelo", "Seus olhos"],
    answer: "Seu cabelo"
  }
];

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