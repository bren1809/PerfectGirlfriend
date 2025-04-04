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



  // Coordenadas aproximadas de BH (Latitude, Longitude)
const BH_COORDS = {
  lat: -19.9167, 
  lng: -43.9345,
  tolerance: 0.1 // Graus de tolerância (~11km)
};

function verificaLocalizacao() {
  if (!navigator.geolocation) {
    console.log("Geolocalização não suportada");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;
      
      // Calcula diferença das coordenadas
      const diffLat = Math.abs(userLat - BH_COORDS.lat);
      const diffLng = Math.abs(userLng - BH_COORDS.lng);

      // Verifica se está dentro da área
      if (diffLat < BH_COORDS.tolerance && diffLng < BH_COORDS.tolerance) {
        document.getElementById('mensagemSecreta').classList.remove('d-none');
        document.getElementById('textoSecreto').innerHTML += 
          `<br><small class="text-muted">Precisão: ${position.coords.accuracy.toFixed(1)} metros</small>`;
      } else {
        document.getElementById('mensagemErro').classList.remove('d-none');
      }
    },
    (error) => {
      document.getElementById('mensagemErro').classList.remove('d-none');
      console.error("Erro na geolocalização:", error);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
  );
}

// Executa quando a página carregar
verificaLocalizacao();


// Inicializa o mapa
const map = L.map('mapaAmor').setView([-19.9167, -43.9345], 15); // Coordenadas de BH + zoom


const estiloPersonalizado = {
  colorPrincipal: '#FFB6C1',   // Rosa claro
  estradas: '#FFB6C1',         // Rosa claro para estradas
  fundo: '#0A0A0A',            // Preto profundo
  texto: '#FFB6C1',            // Rosa claro para textos
  destaque: '#FFFFFF'          // Branco para contrastes
};

    
// Adiciona o mapa base (OpenStreetMap)
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '© OpenStreetMap, © CartoDB'
}).addTo(map);



// Adicione após a criação do mapa
const legend = L.control({ position: 'bottomright' });



// Marcadores personalizados dos lugadores
const lugares = [
  // MOMENTOS ROMÂNTICOS (coração vermelho)
  {
    coords: [-19.9032298,-43.9235327,3],
    title: "Primeiro Beijo",
    icon: L.divIcon({
      html: '<i class="bi bi-heart-fill fs-4" style="color: #FF6B6B"></i>',
      className: 'bg-transparent border-0'
    }),
    popup: `
      <b>Nosso primeiro beijo</b><br>
      <small>Perto da sua Casa (o dia mais feliz da minha vida)</small><br>
      <i>18/09/2023</i>
    `
  },
  {
    coords: [-19.907181,-43.9217234,3], 
    title: "Encontros pós escola",
    icon: L.divIcon({
      html: '<i class="bi bi-heart-fill fs-4" style="color: #FF6B6B"></i>',
      className: 'bg-transparent border-0'
    }),
    popup: `
      <b>Nossos encontros pós escola</b><br>
      <small>Praça perto da Escola</small><br><br>
      <div style="display: flex; align-items: center; gap: 10px;">
        <img src="./assets/privilegiado/encontros-escola.jpg" style="border: 1px solid #FFB6C1; border-radius: 5px;" width="50%">
        <p style="margin: 0; color: #FFB6C1;"> Em 2023</p>
      </div>
    `
  },

  // RESTAURANTES/COMIDAS (coração + garfo)
  {
    coords: [-19.920449883092356, -43.91957013288003],
    title: "Primeiro Encontro",
    icon: L.divIcon({
      html: `
        <div style="position:relative">
          <i class="bi bi-heart-fill fs-4" style="color: #FF6B6B"></i>
          <i class="bi bi-utensils-fill fs-6" 
             style="color: white; position: absolute; top: 8px; left: 8px"></i>
        </div>
      `,
      className: 'bg-transparent border-0'
    }),
    popup: `
      <b>Primeiro Encontro 💞</b><br>
      <small>Fomos no Cinema do Boulevard</small><br><br>
      <div style="display: flex; align-items: center; gap: 10px;">
        <img src="./assets/privilegiado/primeiro-encontro.jpg" style="border: 1px solid #FFB6C1; border-radius: 5px;" width="50%">
        <p style="margin: 0; color: #FFB6C1;">30/09/2023</p>
      </div>
    `
  },

  // VIAGENS (mala rosa)
  {
    coords: [-21.187822289750255, -43.97468056697253], // Barroso
    title: "Primeira Viagem",
    icon: L.divIcon({
      html: '<i class="bi bi-suitcase-fill fs-4" style="color: #FFB6C1"></i>',
      className: 'bg-transparent border-0'
    }),
    popup: `
      <b>Nossa primeira viagem juntos</b><br>
      <small>Barroso - MG</small><br><br>
      <div style="display: flex; align-items: center; gap: 10px;">
        <img src="./assets/privilegiado/barroso-nos.jpg" style="border: 2px solid #FFB6C1; border-radius: 5px;" width="50%">
        <p style="margin 0; color: #FFB6C1;">12/10/2024</p>
      </div>
    `
  },

  // FUTUROS PLANOS (estrela)
  {
    coords: [-22.9068, -43.1729], // Rio de Janeiro
    title: "Próxima Viagem",
    icon: L.divIcon({
      html: '<i class="bi bi-stars fs-4" style="color: #A6DE8E"></i>',
      className: 'bg-transparent border-0'
    }),
    popup: `
      <b>Próxima aventura!</b><br>
      <small>Rio de Janeiro</small><br>
      <i>Planejado para Dez/2025</i>
    `
  }
];

// Adiciona os marcadores
lugares.forEach(lugar => {
  L.marker(lugar.coords, { 
    title: lugar.title,
    icon: lugar.icon
  })
  .addTo(map)
  .bindPopup(lugar.popup);
});
