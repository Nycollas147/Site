/* ==============================
   CONFIGURAÇÃO
============================== */

const CONFIG = {
  senhaAdmin: "122admin",
  storage: "safeway_feedbacks",
  usuarios: "usuarios",
  tema: "safeway_tema",
  daltonico: "safeway_daltonico"
};

let usuarioLogado = null;


/* ==============================
   LINHAS
============================== */

const linhas = {

  "122":{
    nome:"Barueri (Petrobras) / Osasco (Vila Yara)",
    cor:"#1769ff",

    terminais:[
      {
        nome:"Terminal / Rua Dom Feliciano - Barueri",
        lat:-23.50294,
        lng:-46.81775
      },
      {
        nome:"Terminal Urbano Amador Aguiar - Vila Yara",
        lat:-23.54630,
        lng:-46.77310
      }
    ],

    pontos:[
      [-23.50294,-46.81775],
      [-23.50420,-46.81700],
      [-23.50560,-46.81550],
      [-23.50750,-46.81310],
      [-23.50900,-46.81120],
      [-23.51200,-46.81020],
      [-23.51600,-46.80930],
      [-23.52000,-46.81130],
      [-23.52400,-46.81100],
      [-23.52800,-46.80550],
      [-23.53020,-46.79300],
      [-23.53100,-46.78700],
      [-23.53280,-46.77900],
      [-23.53800,-46.77350],
      [-23.54630,-46.77310]
    ]
  },

  "020":{
    nome:"Helena Maria / Vila Yara",
    cor:"#ff6600",

    terminais:[
      {
        nome:"Terminal Vila Yara",
        lat:-23.5450,
        lng:-46.7730
      },
      {
        nome:"Terminal Helena Maria",
        lat:-23.5700,
        lng:-46.7500
      }
    ],

    pontos:[
      [-23.5450,-46.7730],
      [-23.5380,-46.7740],
      [-23.5320,-46.7750],
      [-23.5260,-46.7720],
      [-23.5200,-46.7680],
      [-23.5350,-46.7600],
      [-23.5480,-46.7550],
      [-23.5600,-46.7520],
      [-23.5700,-46.7500]
    ]
  },

  "022":{
    nome:"Alphaville / Osasco Centro",
    cor:"#8b00ff",

    terminais:[
      {
        nome:"Terminal Alphaville",
        lat:-23.5000,
        lng:-46.8480
      },
      {
        nome:"Terminal Osasco Centro",
        lat:-23.5290,
        lng:-46.7735
      }
    ],

    pontos:[
      [-23.5000,-46.8480],
      [-23.5050,-46.8400],
      [-23.5100,-46.8300],
      [-23.5150,-46.8200],
      [-23.5200,-46.8050],
      [-23.5250,-46.7900],
      [-23.5290,-46.7735]
    ]
  },

  "024":{
    nome:"Barueri Jardim Silveira / Vila Yara",
    cor:"#e60012",

    terminais:[
      {
        nome:"Estação Jardim Silveira",
        lat:-23.5125,
        lng:-46.8710
      },
      {
        nome:"Terminal Vila Yara",
        lat:-23.5463,
        lng:-46.7731
      }
    ],

    pontos:[
      [-23.5125,-46.8710],
      [-23.5100,-46.8550],
      [-23.5080,-46.8350],
      [-23.5120,-46.8150],
      [-23.5220,-46.8000],
      [-23.5350,-46.7850],
      [-23.5463,-46.7731]
    ]
  },

  "036":{
    nome:"Osasco Jardim Veloso / São Paulo Pirituba",
    cor:"#00a86b",

    terminais:[
      {
        nome:"Jardim Veloso",
        lat:-23.5550,
        lng:-46.8120
      },
      {
        nome:"Terminal Pirituba",
        lat:-23.5045,
        lng:-46.7085
      }
    ],

    pontos:[
      [-23.5550,-46.8120],
      [-23.5450,-46.8050],
      [-23.5350,-46.7900],
      [-23.5250,-46.7700],
      [-23.5150,-46.7500],
      [-23.5100,-46.7300],
      [-23.5045,-46.7085]
    ]
  }
};


/* ==============================
   MAPA
============================== */

const mapa = L.map("map")
.setView([-23.520,-46.820],12);

L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom:19,
    attribution:"© OpenStreetMap contributors"
  }
).addTo(mapa);


let camadas=[];
let marcadorOnibus=null;
let animacao=null;
let rotaAtual=null;
let linhaAtual=null;


/* ==============================
   ÍCONE ÔNIBUS
============================== */

const iconeOnibus=L.divIcon({

  className:"bus-icon",

  html:`
    <div style="
      width:42px;
      height:42px;
      border-radius:50%;
      background:#fff;
      border:3px solid #1769ff;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:27px;
      box-shadow:0 3px 10px rgba(0,0,0,.35);
    "></div>
  `,

  iconSize:[42,42],
  iconAnchor:[21,21]
});


/* ==============================
   UTILIDADES
============================== */

function toast(text){

  const t=document.getElementById("toast");

  t.textContent=text;
  t.classList.add("show");

  clearTimeout(toast.timer);

  toast.timer=setTimeout(()=>{
    t.classList.remove("show");
  },2800);
}


function escapar(texto){

  const div=document.createElement("div");

  div.textContent=String(texto);

  return div.innerHTML;
}


/* ==============================
   CARDS
============================== */

function criarCards(){

  const container=document.getElementById("listaLinhas");

  Object.entries(linhas).forEach(([numero,linha])=>{

    const card=document.createElement("button");

    card.className="line";

    card.onclick=()=>buscarLinha(numero);

    card.innerHTML=`
      <span
        class="number"
        style="background:${linha.cor}"
      >
        ${numero}
      </span>

      <h3>${escapar(linha.nome)}</h3>

      <small>
         Acompanhar ônibus
      </small>
    `;

    container.appendChild(card);

  });
}


/* ==============================
   LIMPAR
============================== */

function limparMapa(){

  if(animacao){
    cancelAnimationFrame(animacao);
    animacao=null;
  }

  camadas.forEach(c=>{
    if(mapa.hasLayer(c)){
      mapa.removeLayer(c);
    }
  });

  camadas=[];

  if(marcadorOnibus){
    mapa.removeLayer(marcadorOnibus);
    marcadorOnibus=null;
  }

  rotaAtual=null;
  linhaAtual=null;

  document.getElementById("mapInfo")
    .textContent="Selecione uma linha";

  document.getElementById("mapBadge")
    .textContent=" Sistema online";

  document.getElementById("resultado").innerHTML=`
    <div class="result-head">
      <h2> SafeWay</h2>
      <span class="status">● Online</span>
    </div>
    <p>Mapa limpo. Selecione uma linha para começar.</p>
  `;

  toast(" Mapa limpo.");

}


/* ==============================
   BUSCAR LINHA
============================== */

async function buscarLinha(numeroManual){

  const numero=numeroManual ||
    document.getElementById("linha")
    .value.trim().replace(/\D/g,"");

  if(!numero){
    toast("Digite o número da linha.");
    return;
  }

  const linha=linhas[numero];

  if(!linha){
    toast("❌ Linha não cadastrada.");
    return;
  }

  document.getElementById("linha").value=numero;

  limparMapa();

  linhaAtual=numero;

  /* TERMINAIS */

  linha.terminais.forEach(terminal=>{

    const marker=L.marker([
      terminal.lat,
      terminal.lng
    ])
    .addTo(mapa)
    .bindPopup(`
      <b> Terminal</b><br><br>
      ${escapar(terminal.nome)}
    `);

    camadas.push(marker);

  });


  /* ROTA APROXIMADA VISÍVEL */

  const base=L.polyline(
    linha.pontos,
    {
      color:linha.cor,
      weight:5,
      opacity:.35,
      dashArray:"8,8"
    }
  ).addTo(mapa);

  camadas.push(base);

  mapa.fitBounds(
    base.getBounds(),
    {padding:[30,30]}
  );


  document.getElementById("mapInfo")
    .textContent=`Linha ${numero}`;

  document.getElementById("mapBadge")
    .textContent=` Linha ${numero}`;


  document.getElementById("resultado").innerHTML=`

    <div class="result-head">

      <h2> Linha ${numero}</h2>

      <span class="status">
         Ônibus em movimento
      </span>

    </div>

    <p>
      ${escapar(linha.nome)}
    </p>

    <div class="info">

      <div class="info-card">
        <strong> Saída</strong>
        <small>
          ${escapar(linha.terminais[0].nome)}
        </small>
      </div>

      <div class="info-card">
        <strong> Chegada</strong>
        <small>
          ${escapar(linha.terminais[1].nome)}
        </small>
      </div>

    </div>

    <div class="route-status" id="routeStatus">
      ⏳ Calculando a rota correta pelas ruas...
    </div>

    <button class="end-trip"
            onclick="finalizarViagem()">
       Finalizar viagem e avaliar
    </button>

    <button class="clear"
            onclick="limparMapa()">
       Limpar mapa
    </button>

  `;


  /* ROTA REAL */

  try{

    const coordenadas=linha.pontos
      .map(p=>`${p[1]},${p[0]}`)
      .join(";");

    const url=
      "https://router.project-osrm.org/route/v1/driving/"
      +coordenadas
      +"?overview=full&geometries=geojson";

    const response=await fetch(url);

    const data=await response.json();

    if(
      data.code!=="Ok" ||
      !data.routes?.length
    ){
      throw new Error();
    }

    const ruas=data.routes[0]
      .geometry
      .coordinates
      .map(p=>[p[1],p[0]]);


    if(base && mapa.hasLayer(base)){
      mapa.removeLayer(base);

      camadas=camadas.filter(c=>c!==base);
    }


    rotaAtual=L.polyline(
      ruas,
      {
        color:linha.cor,
        weight:7,
        opacity:.95,
        lineCap:"round",
        lineJoin:"round"
      }
    ).addTo(mapa);

    camadas.push(rotaAtual);

    mapa.fitBounds(
      rotaAtual.getBounds(),
      {padding:[30,30]}
    );


    const status=document.getElementById("routeStatus");

    if(status){
      status.innerHTML=
        "✅ Rota pelas ruas carregada. O ônibus seguirá esta rota.";
    }


    /* ÔNIBUS SEGUE A ROTA REAL */

    animarOnibus(ruas,numero,linha);

  }
  catch{

    const status=document.getElementById("routeStatus");

    if(status){
      status.innerHTML=
        "⚠️ Não foi possível carregar a rota pelas ruas. Mostrando trajeto aproximado.";
    }

    animarOnibus(linha.pontos,numero,linha);

  }

}


/* ==============================
   ÔNIBUS ANDANDO
============================== */

function animarOnibus(pontos,numero,linha){

  if(animacao){
    cancelAnimationFrame(animacao);
  }

  if(marcadorOnibus){
    mapa.removeLayer(marcadorOnibus);
  }


  marcadorOnibus=L.marker(
    pontos[0],
    {
      icon:iconeOnibus,
      zIndexOffset:2000
    }
  )
  .addTo(mapa)
  .bindPopup(`
    <b> Linha ${numero}</b><br>
    ${escapar(linha.nome)}
    <br><br>
     Ônibus em movimento
  `);


  let segmento=0;
  let progresso=0;


  function mover(){

    if(!pontos.length){
      return;
    }

    const inicio=pontos[segmento];

    const fim=
      pontos[(segmento+1)%pontos.length];


    progresso+=0.0018;


    if(progresso>=1){

      progresso=0;

      segmento++;

      if(segmento>=pontos.length-1){
        segmento=0;
      }

    }


    const lat=
      inicio[0]+
      (fim[0]-inicio[0])*progresso;

    const lng=
      inicio[1]+
      (fim[1]-inicio[1])*progresso;


    marcadorOnibus.setLatLng([lat,lng]);


    animacao=
      requestAnimationFrame(mover);

  }

  mover();
}


/* ==============================
   LOCALIZAÇÃO
============================== */

function minhaLocalizacao(){

  if(!navigator.geolocation){
    toast("Seu navegador não suporta localização.");
    return;
  }

  navigator.geolocation.getCurrentPosition(

    position=>{

      const local=[
        position.coords.latitude,
        position.coords.longitude
      ];

      const marker=L.marker(local)
        .addTo(mapa)
        .bindPopup("<b> Você está aqui</b>")
        .openPopup();

      const circle=L.circle(
        local,
        {
          radius:position.coords.accuracy,
          color:"#1769ff",
          fillColor:"#1769ff",
          fillOpacity:.12
        }
      ).addTo(mapa);

      camadas.push(marker,circle);

      mapa.setView(local,16);

      toast(" Localização encontrada.");

    },

    ()=>{
      toast("❌ Não foi possível obter sua localização.");
    },

    {
      enableHighAccuracy:true,
      timeout:15000,
      maximumAge:5000
    }

  );
}


/* ==============================
   FINALIZAR VIAGEM
============================== */

function finalizarViagem(){

  if(!linhaAtual){
    toast("Nenhuma viagem ativa.");
    return;
  }

  abrirFeedback();

  document.getElementById("feedbackInfo")
    .textContent=
      ` Viagem da linha ${linhaAtual} finalizada. Avalie sua experiência.`;

}


/* ==============================
   MODAIS
============================== */

function fecharModais(){

  document.querySelectorAll(".modal-bg")
    .forEach(m=>m.style.display="none");

}

function fecharFora(event){

  if(event.target===event.currentTarget){
    fecharModais();
  }

}

function abrirUsuario(){

  fecharModais();

  atualizarStatusUsuario();

  document.getElementById("usuarioModal")
    .style.display="flex";

}

function abrirFeedback(){

  if(!usuarioLogado){
    toast("Faça login primeiro.");
    abrirUsuario();
    return;
  }

  fecharModais();

  atualizarStatusUsuario();

  document.getElementById("feedbackModal")
    .style.display="flex";

  consultarFeedbacks();

}

function abrirAdmin(){

  fecharModais();

  document.getElementById("adminModal")
    .style.display="flex";

}

function abrirDoacao(){

  fecharModais();

  document.getElementById("pixModal")
    .style.display="flex";

}



/* ==============================
   CADASTRO / LOGIN DE USUÁRIO
============================== */

function obterUsuarios(){
  try{
    return JSON.parse(
      localStorage.getItem(CONFIG.usuarios)
    ) || [];
  }
  catch{
    return [];
  }
}

function cadastrarUsuario(){

  const nome=document
    .getElementById("usuarioNome")
    .value.trim();

  const senha=document
    .getElementById("usuarioSenha")
    .value;

  if(!nome || !senha){
    toast("Preencha todos os campos.");
    return;
  }

  const usuarios=obterUsuarios();

  const jaExiste=usuarios.some(
    u=>u.nome.toLowerCase()===nome.toLowerCase()
  );

  if(jaExiste){
    toast("Esse nome já está cadastrado.");
    return;
  }

  usuarios.push({nome,senha});

  localStorage.setItem(
    CONFIG.usuarios,
    JSON.stringify(usuarios)
  );

  toast("✅ Cadastro realizado!");
}

function loginUsuario(){

  const nome=document
    .getElementById("usuarioNome")
    .value.trim();

  const senha=document
    .getElementById("usuarioSenha")
    .value;

  const usuarios=obterUsuarios();

  const usuario=usuarios.find(
    u=>u.nome.toLowerCase()===nome.toLowerCase()
      && u.senha===senha
  );

  if(!usuario){
    toast("❌ Nome ou senha incorreto.");
    return;
  }

  usuarioLogado=usuario.nome;

  atualizarStatusUsuario();

  document.getElementById("usuarioSenha").value="";

  toast("✅ Bem-vindo, "+usuarioLogado+"!");

  fecharModais();
}

function atualizarStatusUsuario(){

  const texto=usuarioLogado
    ? "👤 Usuário logado: "+usuarioLogado
    : "Usuário: não conectado";

  const status=document.getElementById("statusUsuario");
  if(status) status.textContent=texto;

  const feedbackStatus=document.getElementById("nomeUsuarioLogado");
  if(feedbackStatus) feedbackStatus.textContent=texto;

  const botao=document.getElementById("userButton");
  if(botao){
    botao.title=usuarioLogado
      ? "Usuário logado: "+usuarioLogado
      : "Cadastro / Login";
  }
}

/* ==============================
   ESTRELAS
============================== */

let notaSelecionada=0;

function estrela(nota){

  notaSelecionada=nota;

  document.querySelectorAll(".star")
    .forEach((s,i)=>{
      s.classList.toggle(
        "active",
        i<nota
      );
    });

  const textos=[
    "",
    "Muito ruim",
    "Ruim",
    "Regular",
    "Muito bom",
    "Excelente!"
  ];

  document.getElementById("rating")
    .textContent=textos[nota];

}


/* ==============================
   FEEDBACK
============================== */

function obterFeedbacks(){

  try{
    return JSON.parse(
      localStorage.getItem(CONFIG.storage)
    ) || [];
  }
  catch{
    return [];
  }

}

function salvarFeedbacks(lista){

  localStorage.setItem(
    CONFIG.storage,
    JSON.stringify(lista)
  );

}


function enviarFeedback(){

  if(!usuarioLogado){
    toast("Faça login primeiro.");
    abrirUsuario();
    return;
  }

  const mensagem=document
    .getElementById("textoFeedback")
    .value.trim();

  if(!notaSelecionada){
    toast("⭐ Escolha uma nota.");
    return;
  }

  if(mensagem.length<5){
    toast("Escreva um pouco mais.");
    return;
  }

  const lista=obterFeedbacks();

  lista.push({

    id:Date.now(),

    nome:usuarioLogado,

    mensagem,

    nota:notaSelecionada,

    linha:linhaAtual || "",

    data:new Date().toLocaleString("pt-BR")

  });

  salvarFeedbacks(lista);

  document.getElementById("textoFeedback")
    .value="";

  notaSelecionada=0;

  document.querySelectorAll(".star")
    .forEach(s=>s.classList.remove("active"));

  document.getElementById("rating")
    .textContent="Escolha uma nota";

  toast("✅ Avaliação enviada!");

  consultarFeedbacks();

}


/* ==============================
   CONSULTAR
============================== */

function consultarFeedbacks(){

  const container=document
    .getElementById("meusFeedbacks");

  if(!usuarioLogado){
    container.innerHTML="<p>Faça login para visualizar seus feedbacks.</p>";
    return;
  }

  const resultados=obterFeedbacks()
    .filter(item=>
      item.nome.toLowerCase()===usuarioLogado.toLowerCase()
    );

  if(!resultados.length){
    container.innerHTML="<p>Nenhum feedback encontrado.</p>";
    return;
  }

  container.innerHTML=resultados
    .slice()
    .reverse()
    .map(item=>`

      <div class="feedback">

        <strong>${escapar(item.nome)}</strong>

        <div class="feedback-stars">
          ${"★".repeat(item.nota)}
          ${"☆".repeat(5-item.nota)}
        </div>

        <div>${escapar(item.mensagem)}</div>

        <small>
          Linha: ${escapar(item.linha || "-")}<br>
          ${escapar(item.data)}
        </small>

      </div>

    `)
    .join("");

}


/* ==============================
   ADMINISTRADOR
============================== */

function loginAdmin(){

  const senha=document
    .getElementById("senhaAdmin")
    .value;


  if(senha!==CONFIG.senhaAdmin){

    toast("❌ Senha incorreta.");

    return;
  }


  const feedbacks=obterFeedbacks();

  const painel=document
    .getElementById("painelAdmin");


  painel.innerHTML=`

    <hr>

    <p>
       Total de avaliações:
      <b>${feedbacks.length}</b>
    </p>

    ${
      feedbacks.length
      ?
      feedbacks
      .slice()
      .reverse()
      .map(item=>`

        <div class="feedback">

          <strong>
            ${escapar(item.nome)}
          </strong>

          <div class="feedback-stars">
            ${"★".repeat(item.nota)}
            ${"☆".repeat(5-item.nota)}
          </div>

          <div>
            ${escapar(item.mensagem)}
          </div>

          <small>
            Linha: ${escapar(item.linha || "-")}<br>
            ${escapar(item.data)}
          </small>

          <br>

          <button
            class="delete"
            onclick="apagarFeedback(${item.id})">
            ️ Apagar
          </button>

        </div>

      `)
      .join("")
      :
      "<p>Nenhuma avaliação.</p>"
    }

  `;

}


function apagarFeedback(id){

  if(!confirm("Deseja apagar este feedback?")){
    return;
  }

  const novaLista=obterFeedbacks()
    .filter(item=>item.id!==id);

  salvarFeedbacks(novaLista);

  loginAdmin();

  toast("️ Feedback apagado.");
}


/* ==============================
   PIX
============================== */

async function copiarPix(){

  const input=document
    .getElementById("pixCode");

  try{

    await navigator.clipboard
      .writeText(input.value);

    toast("✅ Pix copiado!");

  }
  catch{

    input.select();

    document.execCommand("copy");

    toast("✅ Pix copiado!");

  }

}


/* ==============================
   TEMA
============================== */

function alternarTema(){

  document.body.classList.toggle("dark");

  const dark=document.body
    .classList.contains("dark");

  localStorage.setItem(
    CONFIG.tema,
    dark?"dark":"light"
  );

  document.getElementById("themeButton")
    .textContent=dark?"☀️":"🌙";

}


function carregarTema(){

  if(
    localStorage.getItem(CONFIG.tema)
    ==="dark"
  ){

    document.body.classList.add("dark");

    document.getElementById("themeButton")
      .textContent="☀️";

  }

}


/* ==============================
   DALTONISMO
============================== */

function alternarDaltonico(){

  document.body.classList.toggle("colorblind");

  const ativo=document.body
    .classList.contains("colorblind");

  localStorage.setItem(
    CONFIG.daltonico,
    ativo?"on":"off"
  );

  toast(
    ativo
    ? "👓 Modo daltônico ativado."
    : "👓 Modo daltônico desativado."
  );

}


function carregarDaltonico(){

  if(
    localStorage.getItem(CONFIG.daltonico)
    ==="on"
  ){
    document.body.classList.add("colorblind");
  }

}


/* ==============================
   TECLADO
============================== */

document.getElementById("linha")
.addEventListener("keydown",event=>{

  if(event.key==="Enter"){
    buscarLinha();
  }

});

document.addEventListener("keydown",event=>{

  if(event.key==="Escape"){
    fecharModais();
  }

});


/* ==============================
   INICIAR
============================== */

criarCards();
carregarTema();
carregarDaltonico();



/* ==============================
   TELA INICIAL
============================== */
function atualizarTamanhoMapa(){
  if(!document.body.classList.contains("started")) return;

  // O mapa é criado enquanto a tela principal ainda está escondida.
  // Quando ela aparece, o Leaflet precisa recalcular o tamanho do container.
  requestAnimationFrame(()=>{
    mapa.invalidateSize({pan:false});
  });

  // Segunda verificação após a transição/layout terminar.
  setTimeout(()=>{
    mapa.invalidateSize({pan:false});
  },350);
}

function iniciarSafeWay(){
  document.body.classList.add("started");

  atualizarTamanhoMapa();

  setTimeout(()=>{
    const campo=document.getElementById("linha");
    if(campo) campo.focus();
  },300);
}

function voltarTelaInicial(){
  document.body.classList.remove("started");

  const sobre=document.getElementById("welcomeAbout");
  if(sobre) sobre.classList.remove("show");

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });
}

// Mantém o mapa correto caso o tamanho da janela/orientação mude.
window.addEventListener("resize", atualizarTamanhoMapa);

function mostrarSobre(){
  document.getElementById("welcomeAbout").classList.toggle("show");
}
