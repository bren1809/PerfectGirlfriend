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

// Marcadores personalizados
const lugares = [
  {
    coords: [-19.9175, -43.9346],
    title: "Primeiro Beijo",
    icon: L.divIcon({
      html: '<i class="bi bi-heart-fill fs-4 text-danger"></i>',
      className: 'bg-transparent border-0'
    }),
    popup: "Aquele momento mágico no parque ❤️"
  },
  {
    coords: [-19.9190, -43.9380],
    title: "Restaurante Favorito",
    icon: L.divIcon({
      html: '<i class="bi bi-shop-window fs-4" style="color: #A6DE8E"></i>', // Loja/restaurante
    className: 'bg-transparent border-0'
    }),
    popup: "Onde comemos a melhor comida da cidade 🍴"
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
