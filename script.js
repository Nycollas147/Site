
/* ==============================
   CONFIGURAÇÃO
============================== */

const CONFIG = {

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
        lat:-23.54746,
        lng:-46.76064
      }
    ]
  },

  "020":{
    nome:"Helena Maria / Vila Yara",
    cor:"#ff6600",

    terminais:[
      {
        nome:"Terminal Vila Yara",
        lat:-23.54746,
        lng:-46.76064
      },
      {
        nome:"Terminal Helena Maria",
        lat:-23.49800,
        lng:-46.80107
      }
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
        lat:-23.54746,
        lng:-46.76064
      }
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
    ]
  }
};



Object.assign(linhas, catalogoAdicional);
Object.assign(linhas["020"], {numero:"020",municipal:true,operadora:"Urubupungá",fonte:"https://cmto.com.br/itinerario.php",termos:["vila yara","helena maria"]});
Object.assign(linhas["122"], {numero:"122",municipal:false,operadora:"Anhanguera",tarifa:"6,45",fonte:"https://emtu.sp.gov.br/sistemas/linha/resultado_imp.htm?numlinha=52345",termos:["petrobras","vila yara"]});
for (const id of ["022","024","036"]) Object.assign(linhas[id], {numero:id,legado:true,termos:({"022":["alphaville","osasco"],"024":["silveira","vila yara"],"036":["veloso","pirituba"]})[id]});
const linksPorSentido={"M014": {"ida": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-014-PRES.ALTINO-fd36b2752a0f", "volta": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-014-OLARIADONINO-af10e101350c"}, "M015": {"ida": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-015-VILAYARA-39bd3c9b077b", "volta": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-015-OLARIADONINO-e8f223f72011"}, "M017": {"ida": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-017-VILAYARA-f9662101a746", "volta": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-017-PORTALDOESTEII-1ada8ed7dc7f"}, "020": {"ida": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-020-HELENAMARIA-4812c189bf23", "volta": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-020-VILAYARA-ae84a17e8b3b"}, "M022": {"ida": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-022-VILAYARA-f8a382c81043", "volta": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-022-MUNHOZJR.-7f175b4a2255"}, "M023": {"ida": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-023-LARGODEOSASCO-529a9603229b", "volta": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-023-JD.TRESMONTANHAS-16ca6720d782"}, "M024": {"ida": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-024-VILAYARA-aafd99a00434", "volta": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-024-JD.BARONESAMUNHOZ-6c2838cb29e5"}, "M025": {"ida": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-025-JDDABRILRES.TENDA-71313a81e7a8", "volta": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-025-JDPIRATINIGA-1796b331a539"}, "M026": {"ida": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-026-JD.ADALGISA-b20038646899", "volta": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-026-JD.SANTAFE-ded839596623"}, "M027": {"ida": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-027-VILAYARA-38f8a0f38375", "volta": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-027-VILADOSREMEDIOS-4919aca63726"}, "M031": {"ida": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-031-JARDIMGLORIA-cdae02a4b61c", "volta": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-031-PORTALDOESTEII-5b3b8d4910d4"}, "M033": {"ida": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-033-JD.SANTOANTONIO-ee0679c4d07c", "volta": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-033-JD.DAVILA-b79d89ea2ac8"}, "M036": {"ida": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-036-CONJ.DOSMETALURGICOS-77c7dfbadea0", "volta": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-036-MUNHOZJR.-384878116d37"}, "M037": {"ida": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-037-VILADOSREMEDIOS-3045d6b3010e", "volta": "https://linhas.cittamobi.com.br/linha/transporte_publico-Osasco-UrubupungaMunicipalOsasco-037-JARDIMPADROEIRA-45a513d4dd80"}};
for(const [id,links] of Object.entries(linksPorSentido)) linhas[id].links=links;
// O mapa da operadora define a ida a partir dos Metalúrgicos.
Object.assign(linhas.M036, {nome:"Conjunto dos Metalúrgicos / Jardim Munhoz Júnior",operadora:"Viação Osasco",terminais:[{nome:"Conjunto dos Metalúrgicos",lat:itinerariosMunicipais["M036-ida"].pontos[0][0],lng:itinerariosMunicipais["M036-ida"].pontos[0][1]},{nome:"Jardim Munhoz Júnior",lat:itinerariosMunicipais["M036-volta"].pontos[0][0],lng:itinerariosMunicipais["M036-volta"].pontos[0][1]}],termos:["metalurg","munhoz"],fonte:"https://viacaoosasco.com.br/horarios/consulta/?numlinham=028",links:{ida:"https://viacaoosasco.com.br/horarios/consulta/?numlinham=028",volta:"https://viacaoosasco.com.br/horarios/consulta/?numlinham=028"}});
Object.assign(linhas, catalogoArtesp);
const decretoTarifa="https://osasco.sp.gov.br/wp-content/uploads/2025/12/iomo-2945.pdf";
const linkCMTO="https://cmto.com.br/itinerario.php";
function numeroVisivel(id){return linhas[id]?.numero||id;}
function correspondeNumero(id,busca){const a=numeroVisivel(id).toUpperCase();const b=busca.toUpperCase();return a===b || (/^\d+$/.test(b)&&Number(a.match(/^\d+/)?.[0])===Number(b));}
function sentidosDisponiveis(id){return linhas[id]?.gtfs?["ida","volta"].filter(d=>itinerariosArtesp[id+"-"+d]||rotasOficiais.has(id+"-"+d)):["ida","volta"];}
function categoriaLinha(linha){return linha.legado?"Cadastro antigo · não verificado":linha.municipal?"Municipal · Osasco":"Intermunicipal";}
function geometriaDisponivel(id){return ["ida","volta"].some(d=>itinerariosMunicipais[id+"-"+d]||rotasOficiais.has(id+"-"+d)||itinerariosArtesp[id+"-"+d]);}
function tarifaLinha(linha){return linha.legado?"Não confirmada":linha.municipal?"R$ 6,10 · BEM R$ 5,80":linha.tarifa?"R$ "+linha.tarifa:"Não confirmada";}
function painelTarifa(linha){
 if(linha.legado)return `<details class="dados-linha"><summary>Tarifa</summary><p>Não confirmada: o cadastro antigo não foi validado.</p></details>`;
 if(linha.municipal)return `<details class="dados-linha" open><summary>Tarifas oficiais</summary><div class="fare-grid"><div><small>Convencional</small><strong>R$ 6,10</strong></div><div><small>BEM Comum</small><strong>R$ 5,80</strong></div></div><p>Escolar: desconto de 50%, limitado à cota e ao período letivo. <a href="${decretoTarifa}" target="_blank" rel="noopener">Decreto municipal nº 14.984/2025</a> · em vigor desde 05/01/2026.</p><p>Bilhete único: dois ônibus municipais de linhas diferentes em até 90 minutos, segundo a <a href="https://cmto.com.br/bilhete_unico.php" target="_blank" rel="noopener">CMTO</a>.</p><small>Consulta: 25/11/2026. Não inclui integrações metropolitanas.</small></details>`;
 return `<details class="dados-linha" open><summary>Tarifa oficial</summary><div class="fare-grid"><div><small>Tarifa autorizada</small><strong>${linha.tarifa?"R$ "+linha.tarifa:"Não confirmada"}</strong></div></div><p><a href="${linha.fonte}" target="_blank" rel="noopener">Consultar ARTESP / fonte oficial</a>. Valor sem integrações. ${linha.gtfs?"Base GTFS de 09/11/2026.":"Consulta: 25/11/2026."}</p></details>`;
}

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
let paradasDaLinha=null;
let zoomDasParadas=15;

function atualizarParadas(){
  if(!paradasDaLinha)return;
  if(mapa.getZoom()>=zoomDasParadas){
    if(!mapa.hasLayer(paradasDaLinha))paradasDaLinha.addTo(mapa);
  }else if(mapa.hasLayer(paradasDaLinha)){
    mapa.removeLayer(paradasDaLinha);
  }
}
mapa.on("zoomend",atualizarParadas);
let rotaAtual=null;
let linhaAtual=null;
let consultaRota=0;
let pedidoRota=null;
const rotasOficiais=new Map();
const chaveRotasSalvas="safeway_itinerarios_importados_v1";
function pontoValido(p){return Array.isArray(p)&&p.length===2&&p.every(Number.isFinite)&&p[0]>=-24&&p[0]<=-23&&p[1]>=-47.5&&p[1]<=-46;}
function carregarRotasSalvas(dados){
  let total=0;
  for(const [chave,rota] of Object.entries(dados||{})){
    const partes=chave.match(/^([MI]?\d{3}(?:[A-Z]{2}\d|ALT)?)-(ida|volta)$/);
    if(!partes||!linhas[partes[1]]||linhas[partes[1]].legado||!rota||!Array.isArray(rota.pontos)||rota.pontos.length<2||rota.pontos.length>100000||!rota.pontos.every(pontoValido))continue;
    const paradas=Array.isArray(rota.paradas)?rota.paradas.filter(p=>p&&pontoValido(p.p)).map(p=>({nome:String(p.nome||"Parada").slice(0,250),p:p.p})):[];
    rotasOficiais.set(chave,{pontos:rota.pontos,paradas,importado:true});total++;
  }
  return total;
}
function salvarRotas(){try{localStorage.setItem(chaveRotasSalvas,JSON.stringify(Object.fromEntries(rotasOficiais)));return true;}catch(e){return false;}}
try{carregarRotasSalvas(JSON.parse(localStorage.getItem(chaveRotasSalvas)||"{}"));}catch(e){}
function exportarRotas(){
  if(!rotasOficiais.size){toast("Nenhum itinerário importado para exportar.");return;}
  const blob=new Blob([JSON.stringify(Object.fromEntries(rotasOficiais))],{type:"application/json"});
  const url=URL.createObjectURL(blob), a=document.createElement("a");a.href=url;a.download="itinerarios-importados.json";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
async function importarPacoteRotas(input){
  if(!input.files?.[0])return;
  try{const n=carregarRotasSalvas(JSON.parse(await input.files[0].text()));if(!n)throw new Error();const salvo=salvarRotas();const id=linhaAtual,dir=porId("sentido").value;criarCards();if(id)buscarLinha(id,dir);toast(n+" sentido(s) importado(s)."+(salvo?"":" Sem espaço para salvar; exporte o pacote."));}catch(e){toast("Pacote de itinerários inválido ou indisponível.");}finally{input.value="";}
}
// Um pacote exportado pode ser publicado em dados/itinerarios-importados.json.
async function carregarPacotePublicado(){
  if(location.protocol==="file:")return;
  try{const r=await fetch("dados/itinerarios-importados.json");if(!r.ok)return;const locais=new Map(rotasOficiais);const n=carregarRotasSalvas(await r.json());for(const [k,v] of locais)rotasOficiais.set(k,v);if(n){const id=linhaAtual,dir=porId("sentido").value;criarCards();if(id)buscarLinha(id,dir);}}catch(e){}
}
const estimativas=new Map();
const linhasConfirmadas=new Set(["122","020",...Object.keys(catalogoArtesp)]);


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

const cidadesLinha = {
  "122":["Barueri","Osasco"], "020":["Osasco","Osasco"],
  "022":["Barueri","Osasco"], "024":["Barueri","Osasco"], "036":["Osasco","São Paulo"]
};
for(const [id,linha] of Object.entries(linhas)) if(linha.cidades) cidadesLinha[id]=linha.cidades;
const porId = id => document.getElementById(id);
for(const campo of ["origem","destino"]){
  porId(campo).add(new Option("Selecione a cidade",""));
  for(const cidade of [...new Set(Object.values(cidadesLinha).flat())].sort()){
    porId(campo).add(new Option(cidade,cidade));
  }
}
porId("consultaCidades").addEventListener("submit",event=>{
  event.preventDefault();
  limparMapa(true);
  criarCards(porId("origem").value,porId("destino").value);
});
porId("todasLinhas").onclick=()=>{porId("consultaCidades").reset();criarCards();};
porId("sentido").onchange=()=>buscarLinha(linhaAtual,porId("sentido").value);
function criarCards(origem="",destino="",numeroBusca=""){

  const container=document.getElementById("listaLinhas");

  container.replaceChildren();
  Object.entries(linhas).sort((a,b)=>Number(!!a[1].legado)-Number(!!b[1].legado)||Number(!!b[1].municipal)-Number(!!a[1].municipal)||numeroVisivel(a[0]).localeCompare(numeroVisivel(b[0]))).forEach(([numero,linha])=>{
    if(linha.legado || (numeroBusca && !correspondeNumero(numero,numeroBusca))) return;
    const [a,b]=cidadesLinha[numero];
    const ida=!origem || (origem===a && destino===b);
    if(!ida && !(origem===b && destino===a)) return;

    const card=document.createElement("button");

    card.className="line";

    card.onclick=()=>buscarLinha(numero,origem?(ida?"ida":"volta"):(sentidosDisponiveis(numero)[0]||"ida"));

    card.innerHTML=`
      <span
        class="number"
        style="background:${linha.cor}"
      >
        ${numeroVisivel(numero)}
      </span>

      <h3>${escapar(linha.nome)}</h3>

      <small>
         ${categoriaLinha(linha)}<br>${tarifaLinha(linha)}<br>${linha.legado?"Não verificado":geometriaDisponivel(numero)?"Mapa do itinerário disponível":linha.municipal?"Mapa publicado (externo)":"Consultar itinerário"}
      </small>
    `;

    container.appendChild(card);
  });
  porId("todasLinhas").hidden=!origem && !numeroBusca;
  const total=container.children.length;
  porId("resumoLinhas").textContent=numeroBusca ? total+" cadastro(s) para a linha "+numeroBusca : origem
    ? (total ? total+" linha(s) para "+origem+" → "+destino : "Nenhuma linha cadastrada para esse trajeto.")
    : "Escolha uma linha";
}


/* ==============================
   LIMPAR
============================== */

function limparMapa(silencioso=false){

  porId("escolhaSentido").hidden=true;
  consultaRota++;
  if(pedidoRota){
    pedidoRota.abort();
    pedidoRota=null;
  }


  camadas.forEach(c=>{
    if(mapa.hasLayer(c)){
      mapa.removeLayer(c);
    }
  });

  camadas=[];
  paradasDaLinha=null;


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

  if(!silencioso) toast(" Mapa limpo.");

}


/* ==============================
   BUSCAR LINHA
============================== */

/* Setas de sentido, espaçadas em pixels sobre o próprio caminho SVG do Leaflet. */
function adicionarSetasRota(rota){
  const ns="http://www.w3.org/2000/svg";
  const caminho=rota.getElement();
  if(!caminho || !caminho.parentNode) return;
  const grupo=document.createElementNS(ns,"g");
  grupo.setAttribute("pointer-events","none");
  grupo.setAttribute("aria-hidden","true");
  grupo.setAttribute("class","setas-rota");
  caminho.parentNode.insertBefore(grupo,caminho.nextSibling);

  function atualizarSetas(){
    grupo.replaceChildren();
    if(!caminho.isConnected) return;
    const tamanho=caminho.getTotalLength();
    if(!Number.isFinite(tamanho) || tamanho<12) return;
    const intervalo=46;
    const inicio=tamanho<intervalo?tamanho/2:intervalo/2;
    for(let d=inicio;d<tamanho-5;d+=intervalo){
      const ponto=caminho.getPointAtLength(d);
      const antes=caminho.getPointAtLength(Math.max(0,d-3));
      const depois=caminho.getPointAtLength(Math.min(tamanho,d+3));
      const dx=depois.x-antes.x,dy=depois.y-antes.y;
      const distancia=Math.hypot(dx,dy);
      // Evitar setas nos saltos de segmentos cortados pela borda do mapa.
      if(distancia<1 || distancia>7) continue;
      const angulo=Math.atan2(dy,dx)*180/Math.PI;
      const seta=document.createElementNS(ns,"path");
      seta.setAttribute("d","M -2.7 -3.2 L 1.8 0 L -2.7 3.2");
      seta.setAttribute("transform",`translate(${ponto.x} ${ponto.y}) rotate(${angulo})`);
      seta.setAttribute("fill","none");
      seta.setAttribute("stroke","#ffffff");
      seta.setAttribute("stroke-width","1.9");
      seta.setAttribute("stroke-linecap","round");
      seta.setAttribute("stroke-linejoin","round");
      grupo.appendChild(seta);
    }
  }

  mapa.on("zoomend moveend resize viewreset",atualizarSetas);
  rota.once("remove",()=>{
    mapa.off("zoomend moveend resize viewreset",atualizarSetas);
    grupo.remove();
  });
  atualizarSetas();
}

function informacoesLinha(numero,sentido,referencias){
  let horarios=linhas[numero].fonte?`<a href="${linhas[numero].links?.[sentido]||linhas[numero].fonte}" target="_blank" rel="noopener">Consultar horários e itinerário publicados</a>`:"Horários ainda não confirmados para este cadastro.";
  if(linhas[numero].gtfs){
    const dados=horariosArtesp[numero+"-"+sentido]||{};
    const grupos={WD:"Dias úteis (segunda a sexta)",SAT:"Sábados",SUN:"Domingos"};
    horarios=Object.entries(grupos).map(([id,nome])=>`<p><b>${nome}</b><br>${dados[id]?.length?dados[id].join(" · "):"Sem partidas informadas na base"}</p>`).join("")+ '<small>Partidas programadas no GTFS ARTESP de 09/11/2026. Não são previsões em tempo real. Feriados não especificados na base. Horários a partir de 24:00 pertencem à madrugada do dia seguinte.</small>';
  }else if(numero==="122"){
    const grupos=["Dias úteis","Sábados","Domingos e feriados"];
    horarios=partidas122[sentido].map((lista,i)=>`<p><b>${grupos[i]}</b><br>${lista}</p>`).join("")+
      '<a href="https://emtu.sp.gov.br/sistemas/linha/resultado_imp.htm?numlinha=52345" target="_blank" rel="noopener">Conferir atualizações na EMTU</a>';
  }else if(numero==="020"){
    horarios=(sentido==="ida"
      ?"De segunda a sexta, 04:25–00:40. Sábado, 04:55–00:40. Domingo, 05:10–00:30."
      :"Segunda, 04:08–00:00. De terça a sábado, 03:50–00:00. Domingo, 04:35–23:55.")+
      ' Faixas de operação. <a href="https://appassets.mvtdev.com/map/131/l/242/425177.pdf" target="_blank" rel="noopener">Consultar quadro da 020 no Moovit</a>';
  }
  return `<details class="dados-linha"><summary>Horários · ${sentido}</summary><div>${horarios}</div></details>
    <details class="dados-linha"><summary>Pontos de referência</summary>${referencias.length
    ? "<ol>"+referencias.map(r=>"<li>"+escapar(r.nome)+"</li>").join("")+"</ol>"
    : "<p>Sem pontos intermediários confirmados. Importe um GTFS com paradas para exibi-las.</p>"}</details>`;
}

async function buscarLinha(numeroManual,sentido="ida",permitirEstimativa=false){

  let numero=numeroManual;
  if(!numero){
    const busca=porId("linha").value.trim();
    if(!/^\d{1,3}(?:[a-z]{2}\d)?$/i.test(busca)){toast("Digite o número da linha (ex.: 223 ou 404EX1).");return;}
    const ids=Object.keys(linhas).filter(id=>!linhas[id].legado && correspondeNumero(id,busca));
    if(ids.length>1){limparMapa(true);criarCards("","",busca);porId("listaLinhas").scrollIntoView({block:"nearest",behavior:"smooth"});toast("Escolha a linha e a variante desejada.");return;}
    numero=ids[0];
  }

  if(!numero){
    toast("Linha não cadastrada.");
    return;
  }

  const linha=linhas[numero];

  if(!linha){
    toast("❌ Linha não cadastrada.");
    return;
  }

  document.getElementById("linha").value=numeroVisivel(numero);

  limparMapa(true);

  linhaAtual=numero;
  const consulta=consultaRota;
  const chave=numero+"-"+sentido;
  const oficial=itinerariosMunicipais[chave] || rotasOficiais.get(chave) || itinerariosArtesp[chave];
  const terminais=sentido==="ida"?linha.terminais:[...linha.terminais].reverse();
  porId("sentido").replaceChildren(...["ida","volta"].map((dir,i)=>
    new Option((i?"Volta":"Ida")+" · "+linha.terminais[i].nome+" → "+linha.terminais[1-i].nome+(linha.gtfs&&!sentidosDisponiveis(numero).includes(dir)?" (sem dados de trajeto)":""),dir)
  ));
  porId("sentido").value=sentido;
  porId("escolhaSentido").hidden=false;
  const extremos=oficial
    ? [oficial.pontos[0],oficial.pontos[oficial.pontos.length-1]]
    : terminais.map(t=>[t.lat,t.lng]);
  const possuiExtremos=extremos.length===2 && extremos.every(p=>p.every(Number.isFinite));
  const referencias122=[
    {nome:"Praça Antônio Menck (referência aproximada)",p:[-23.52997,-46.77419]},
    {nome:"Praça Rotary (referência aproximada)",p:[-23.5482,-46.76452]}
  ];
  const referencias020=sentido==="ida" ? [
    {nome:"Pátio Osasco Open Mall (referência aproximada)",p:[-23.54315,-46.76319]},
    {nome:"Praça João Romano"}
  ] : [{nome:"Avenida Fuad Auada, 284"},{nome:"Teatro Municipal Glória Giglio"}];
  const referencias=oficial?.paradas?.length ? oficial.paradas :
    numero==="122" ? (sentido==="ida"?referencias122:referencias122.reverse()) :
    numero==="020" ? referencias020 : [];
  const grupo=L.layerGroup();
  const iconeParada=L.divIcon({
    className:"alvo-parada",
    html:'<span style="border-color:'+linha.cor+'"></span>',
    iconSize:[24,24],iconAnchor:[12,12]
  });
  for(const ref of referencias){
    if(!ref.p)continue;
    L.marker(ref.p,{icon:iconeParada,title:ref.nome,alt:ref.nome,zIndexOffset:-100})
      .bindPopup(escapar(ref.nome)).addTo(grupo);
  }
  paradasDaLinha=grupo;
  camadas.push(grupo);
  const limites=possuiExtremos?L.latLngBounds(oficial?.pontos || extremos):null;
  if(limites){const zoomGeral=mapa.getBoundsZoom(limites,false,L.point(60,60));
  zoomDasParadas=Math.min(mapa.getMaxZoom(),Math.max(15,zoomGeral+1));}
  if(possuiExtremos) terminais.forEach((terminal,i)=>{
    const marker=L.marker(extremos[i])
    .addTo(mapa)
    .bindPopup(`
      <b> Terminal</b><br><br>
      ${escapar(terminal.nome)}
    `);

    camadas.push(marker);

  });


  // Não desenhar segmentos retos enquanto a rota está carregando.
  if(limites) mapa.fitBounds(limites,{padding:[30,30]});
  else mapa.setView([-23.532,-46.79],12);
  atualizarParadas();

  document.getElementById("mapInfo")
    .textContent=`Linha ${numeroVisivel(numero)}`;

  document.getElementById("mapBadge")
    .textContent=` Linha ${numeroVisivel(numero)}`;


  document.getElementById("resultado").innerHTML=`

    <div class="result-head">

      <h2> Linha ${numeroVisivel(numero)}</h2>

      <span class="status" id="estadoTrajeto">
         Carregando
      </span>

    </div>

    <p>
      ${escapar(linha.nome)}<br><small>${categoriaLinha(linha)}${linha.operadora?" · "+escapar(linha.operadora):""}</small>
    </p>

    <div class="info">

      <div class="info-card">
        <strong> Saída</strong>
        <small>
          ${escapar(terminais[0].nome)}
        </small>
      </div>

      <div class="info-card">
        <strong> Chegada</strong>
        <small>
          ${escapar(terminais[1].nome)}
        </small>
      </div>

    </div>

    ${painelTarifa(linha)}
    ${informacoesLinha(numero,sentido,referencias)}
    ${linha.municipal?`<div class="mapa-publicado"><strong>Mapa publicado do itinerário</strong><p>Consulte o trajeto e as paradas do sentido escolhido no Cittamobi, serviço indicado pela CMTO.</p><a class="link-mapa" href="${linha.links[sentido]}" target="_blank" rel="noopener noreferrer">Ver mapa e paradas ↗</a><a href="${linha.links[sentido==="ida"?"volta":"ida"]}" target="_blank" rel="noopener noreferrer">Ver sentido contrário ↗</a><small>Abre uma página externa. <a href="${linha.fonte}" target="_blank" rel="noopener">Catálogo / fonte</a></small></div>`:""}
    <div class="route-status" id="routeStatus">
      ⏳ Carregando trajeto...
    </div>

    <details style="margin-top:12px;color:var(--muted);font-size:13px">
      <summary style="cursor:pointer">Dados do itinerário (GTFS / KML)</summary>
      ${numero==="M036" ? '<p>Fonte: mapa KML publicado pela <a href="https://viacaoosasco.com.br/horarios/consulta/?numlinham=028" target="_blank" rel="noopener">Viação Osasco</a>. Ida e volta incluídas. O arquivo contém a geometria, não os pontos de embarque. <a href="dados/036_Viacao_Osasco.kml" download>Consultar arquivo KML</a>.</p>' : linha.gtfs ? `<p>Fonte: <a href="${linha.fonte}" target="_blank" rel="noopener">GTFS ARTESP, edição de 09/11/2026</a>. ${oficial?"Geometria incluída no site.":"Sem geometria publicada neste sentido na base."} ${numero==="122"?'<a href="dados/ARTESP_122_20261109.zip" download>Baixar GTFS da linha 122</a>.':""}</p>` :
        numero==="020" ? '<p>Para Helena Maria ↔ Vila Yara, consulte os <a href="https://cmto.com.br/itinerario.php" target="_blank" rel="noopener">itinerários municipais da CMTO</a>. A linha metropolitana 020 tem outros terminais.</p>' :
        linha.legado?'<p>Cadastro antigo sem confirmação. Não deve ser usado como itinerário de ônibus.</p>':`<p>Cadastro consultado em 25/11/2026. <a href="${linha.links?.[sentido]||linha.fonte}" target="_blank" rel="noopener">Consultar itinerário publicado</a>. ${linha.municipal?`<a href="${linkCMTO}" target="_blank" rel="noopener">CMTO</a>.`:""} Geometria GTFS não incluída neste pacote.</p>`}
      <p>Para consultar outro arquivo da operadora, importe um GTFS com routes.txt, trips.txt e shapes.txt. Com stops.txt e stop_times.txt, as paradas da viagem também aparecem no mapa. O arquivo é processado no navegador, sem envio ao servidor. O trajeto importado fica salvo neste navegador, se houver espaço disponível. Para publicar os trajetos para todos, exporte o pacote e coloque-o na pasta dados do site.</p>
      <p>Dados metropolitanos: <a href="https://dadosabertos.artesp.sp.gov.br/dataset/gtfs" target="_blank" rel="noopener noreferrer" style="color:var(--green)">Portal de Dados Abertos da ARTESP</a>. Linhas municipais podem precisar de outro GTFS.</p>
      <label for="gtfsArquivo">Selecionar arquivo GTFS (.zip)</label>
      <input id="gtfsArquivo" type="file" accept=".zip,application/zip" onchange="importarGTFS(this, '${numero}')" style="display:block;max-width:100%;margin:8px 0">
      <p id="gtfsStatus" role="status"></p>
      <button class="clear" onclick="exportarRotas()">Exportar itinerários importados (.json)</button>
      <label for="pacoteRotas">Importar pacote de itinerários SafeWay (.json)</label>
      <input id="pacoteRotas" type="file" accept=".json,application/json" onchange="importarPacoteRotas(this)" style="display:block;max-width:100%;margin:8px 0">
    </details>

    <button class="end-trip"
            onclick="finalizarViagem()">
       Finalizar viagem e avaliar
    </button>

    <button class="clear"
            onclick="limparMapa()">
       Limpar mapa
    </button>

  `;


  // O GTFS fornece a geometria do itinerário; OSRM só estima uma rota viária.
  const status=document.getElementById("routeStatus");
  const estadoTrajeto=document.getElementById("estadoTrajeto");
  const aviso=linhasConfirmadas.has(numero)?"":" Cadastro da linha ainda não verificado.";

  function desenhar(pontos,confirmada){
    if(consulta!==consultaRota) return;
    // Contorno discreto e linha contínua; a origem dos dados continua indicada no status.
    const contorno=L.polyline(pontos,{
      color:"#17212b",weight:13,opacity:.40,lineCap:"round",lineJoin:"round",interactive:false
    }).addTo(mapa);
    rotaAtual=L.polyline(pontos,{
      color:linha.cor,weight:10,opacity:1,lineCap:"round",lineJoin:"round"
    }).addTo(mapa);
    camadas.push(contorno,rotaAtual);
    mapa.fitBounds(rotaAtual.getBounds(),{padding:[30,30]});
    adicionarSetasRota(rotaAtual);
    status.textContent=confirmada
      ? (oficial.fonte ? "Itinerário publicado · "+oficial.fonte+(oficial.formato==="KML"?" · Paradas não incluídas no arquivo.":" · "+oficial.paradas.length+" paradas.") : "Itinerário de arquivo importado · fonte não verificada pelo SafeWay.")
      : "Estimativa pelas ruas entre os terminais (não é o itinerário oficial)."+aviso;
    estadoTrajeto.textContent=confirmada?(oficial.formato==="KML"?"Itinerário KML":oficial.importado?"Itinerário importado":"Itinerário GTFS"):"Trajeto estimado";
  }

  if(oficial){desenhar(oficial.pontos,true);return;}
  if(!possuiExtremos || linha.legado || linha.gtfs){
    status.innerHTML=linha.legado?"Cadastro antigo não validado. Consulte uma linha confirmada.":`O mapa interno ainda não possui geometria GTFS desta linha. <a href="${linha.links?.[sentido]||linha.fonte}" target="_blank" rel="noopener">Consultar itinerário e mapa na fonte</a> ou importe um GTFS abaixo.`;
    estadoTrajeto.textContent=linha.legado?"Não verificado":"Mapa pendente";
    return;
  }
  if(!permitirEstimativa){
    status.innerHTML=`O trajeto oficial ainda não está disponível no mapa interno. Consulte o mapa publicado acima. <button class="clear" onclick="buscarLinha('${numero}','${sentido}',true)">Ver apenas estimativa viária (não é itinerário de ônibus)</button>`;
    estadoTrajeto.textContent="Mapa GTFS pendente";return;
  }
  if(estimativas.has(chave)){desenhar(estimativas.get(chave),false);return;}

  const controlador=new AbortController();
  pedidoRota=controlador;
  const limite=setTimeout(()=>controlador.abort(),15000);
  try{
    // Usar somente origem e destino elimina os retornos causados por pontos inventados.
    const coordenadas=extremos.map(p=>p[1]+","+p[0]).join(";");
    const url="https://router.project-osrm.org/route/v1/driving/"+coordenadas+
      "?overview=full&geometries=geojson&alternatives=false&steps=false";
    const resposta=await fetch(url,{signal:controlador.signal});
    if(!resposta.ok) throw new Error("Falha no serviço de rotas");
    const dados=await resposta.json();
    const coords=dados.routes?.[0]?.geometry?.coordinates;
    if(dados.code!=="Ok" || !Array.isArray(coords) || coords.length<2) throw new Error("Sem trajeto");
    const pontos=coords.map(p=>[p[1],p[0]]);
    if(!pontos.every(p=>p.every(Number.isFinite))) throw new Error("Geometria inválida");
    if(consulta!==consultaRota) return;
    estimativas.set(chave,pontos);
    desenhar(pontos,false);
  }catch(erro){
    if(consulta!==consultaRota) return;
    status.textContent="Não foi possível carregar a estimativa pelas ruas. Apenas os terminais são exibidos. Tente novamente ou importe um GTFS."+aviso;
    estadoTrajeto.textContent="Rota indisponível";
  }finally{
    clearTimeout(limite);
    if(pedidoRota===controlador) pedidoRota=null;
  }
}

/* ==============================
   IMPORTAÇÃO DE ITINERÁRIO GTFS
   Formato aberto: https://gtfs.org/
============================== */

function normalizarGTFS(s){
  return String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
}

function camposCSV(linha){
  const campos=[];
  let valor="",aspas=false;
  for(let i=0;i<linha.length;i++){
    const c=linha[i];
    if(c==='"'){
      if(aspas && linha[i+1]==='"'){valor+='"';i++;}
      else aspas=!aspas;
    }else if(c===","&&!aspas){campos.push(valor);valor="";}
    else valor+=c;
  }
  campos.push(valor);
  return campos;
}

function lerCSV(texto,processar){
  let inicio=0, cabecalho=null;
  while(inicio<texto.length){
    let fim=texto.indexOf("\n",inicio);
    if(fim<0) fim=texto.length;
    const linha=texto.slice(inicio,fim).replace(/\r$/, "");
    inicio=fim+1;
    if(!linha.trim()) continue;
    const valores=camposCSV(linha);
    if(!cabecalho){cabecalho=valores.map(v=>v.replace(/^\uFEFF/," ").trim());continue;}
    processar(valores,cabecalho);
  }
}

let carregamentoZip=null;
function carregarBibliotecaZip(){
  if(window.JSZip) return Promise.resolve(window.JSZip);
  if(!carregamentoZip){
    carregamentoZip=new Promise((resolve,reject)=>{
      const script=document.createElement("script");
      script.src="vendor/jszip.min.js";
      script.onload=()=>window.JSZip?resolve(window.JSZip):reject(new Error("Biblioteca ZIP indisponível"));
      script.onerror=()=>reject(new Error("Não foi possível carregar a biblioteca ZIP"));
      document.head.appendChild(script);
    }).catch(e=>{carregamentoZip=null;throw e;});
  }
  return carregamentoZip;
}

function escolherShape(shapes,extremos){
  let melhor=null;
  for(const [shape,lista] of shapes){
    const pontos=lista.sort((a,b)=>a.seq-b.seq).map(v=>v.p);
    if(pontos.length<2) continue;
    const inicio=mapa.distance(extremos[0],pontos[0]);
    const fim=mapa.distance(extremos[1],pontos[pontos.length-1]);
    // Selecionar somente o sentido cadastrado; não inverter a volta, que pode usar outras ruas.
    if(inicio>2000||fim>2000) continue;
    const nota=inicio+fim;
    if(!melhor||nota<melhor.nota) melhor={pontos,nota,shape};
  }
  return melhor;
}

async function importarGTFS(input,numero){
  const arquivo=input.files?.[0];
  if(!arquivo) return;
  const consulta=consultaRota;
  const msg=document.getElementById("gtfsStatus");
  input.disabled=true;
  msg.textContent="Lendo arquivo GTFS...";
  try{
    const JSZip=await carregarBibliotecaZip();
    const zip=await JSZip.loadAsync(arquivo);
    function entrada(nome){
      const arquivos=Object.values(zip.files).filter(f=>!f.dir&&f.name.split("/").pop()===nome);
      if(arquivos.length!==1) throw new Error("Arquivo GTFS sem "+nome+" único");
      return arquivos[0].async("string");
    }
    const ids=new Set();
    const termos=linhas[numero].termos;
    lerCSV(await entrada("routes.txt"),(v,h)=>{
      const ref=v[h.indexOf("route_short_name")]||"";
      const nome=normalizarGTFS(v[h.indexOf("route_long_name")]);
      const id=v[h.indexOf("route_id")];
      if(id && (linhas[numero].gtfs ? id===linhas[numero].gtfsRouteId : (/^\d+$/.test(ref.trim())&&Number(ref)===Number(numeroVisivel(numero))) && termos.every(t=>nome.includes(t)))) ids.add(id);
    });
    if(!ids.size) throw new Error("Linha e itinerário não encontrados neste GTFS. Confira a operadora e o cadastro da linha.");
    const shapeIds=new Set();
    const viagens=new Map();
    const destinosShape=new Map();
    lerCSV(await entrada("trips.txt"),(v,h)=>{
      const id=v[h.indexOf("route_id")], shape=v[h.indexOf("shape_id")];
      if(ids.has(id)&&shape){shapeIds.add(shape);viagens.set(v[h.indexOf("trip_id")],shape);const letreiro=normalizarGTFS(v[h.indexOf("trip_headsign")]);if(!destinosShape.has(shape)) destinosShape.set(shape,new Set());destinosShape.get(shape).add(letreiro);}
    });
    if(!shapeIds.size) throw new Error("Não há geometria associada à linha.");
    const shapes=new Map();
    lerCSV(await entrada("shapes.txt"),(v,h)=>{
      const id=v[h.indexOf("shape_id")];
      if(!shapeIds.has(id))return;
      const lat=Number(v[h.indexOf("shape_pt_lat")]),lng=Number(v[h.indexOf("shape_pt_lon")]),seq=Number(v[h.indexOf("shape_pt_sequence")]);
      if(!Number.isFinite(lat)||!Number.isFinite(lng)||!Number.isFinite(seq)||Math.abs(lat)>90||Math.abs(lng)>180)return;
      if(!shapes.has(id))shapes.set(id,[]);
      shapes.get(id).push({seq,p:[lat,lng]});
    });
    const extremos=linhas[numero].terminais.map(t=>[t.lat,t.lng]);
    const sentido=porId("sentido").value;
    const temExtremos=extremos.every(p=>p.every(Number.isFinite));
    function escolherPorLetreiro(termo){
      const candidatos=[...shapes].filter(([shape])=>[...(destinosShape.get(shape)||[])].some(d=>d.includes(termo))).map(([shape,lista])=>({shape,pontos:lista.sort((a,b)=>a.seq-b.seq).map(v=>v.p)})).filter(r=>r.pontos.length>1);
      return candidatos.length===1?candidatos[0]:null;
    }
    const opcoes=temExtremos?{ida:escolherShape(shapes,extremos),volta:escolherShape(shapes,[...extremos].reverse())}:{ida:escolherPorLetreiro(termos[1]),volta:escolherPorLetreiro(termos[0])};
    if(!opcoes.ida && !opcoes.volta) throw new Error("Trajeto não identificado com segurança: confira os terminais ou os letreiros (trip_headsign) do GTFS.");
    const tem=nome=>Object.values(zip.files).some(f=>!f.dir && f.name.split("/").pop()===nome);
    if(tem("stops.txt") && tem("stop_times.txt")){
      const paradas=new Map();
      lerCSV(await entrada("stops.txt"),(v,h)=>{
        const lat=v[h.indexOf("stop_lat")],lng=v[h.indexOf("stop_lon")];
        if(!lat?.trim() || !lng?.trim() || !(Math.abs(+lat)<=90 && Math.abs(+lng)<=180)) return;
        paradas.set(v[h.indexOf("stop_id")],{nome:v[h.indexOf("stop_name")]||"Parada",p:[+lat,+lng]});
      });
      const viagensEscolhidas=new Map();
      for(const rota of Object.values(opcoes).filter(Boolean)){
        const viagem=[...viagens].find(([,shape])=>shape===rota.shape);
        if(viagem) viagensEscolhidas.set(viagem[0],rota);
        rota.paradas=[];
      }
      lerCSV(await entrada("stop_times.txt"),(v,h)=>{
        const rota=viagensEscolhidas.get(v[h.indexOf("trip_id")]);
        const parada=paradas.get(v[h.indexOf("stop_id")]);
        if(rota && parada) rota.paradas.push({...parada,seq:Number(v[h.indexOf("stop_sequence")])});
      });
      for(const rota of Object.values(opcoes).filter(Boolean)) rota.paradas.sort((a,b)=>a.seq-b.seq);
    }
    if(consulta!==consultaRota) return;
    for(const [dir,rota] of Object.entries(opcoes)){
      const chave=numero+"-"+dir;
      if(rota && rota.pontos.every(pontoValido)) rotasOficiais.set(chave,{...rota,importado:true});
    }
    const salvo=salvarRotas();
    criarCards();buscarLinha(numero,sentido);
    toast((rotasOficiais.has(numero+"-"+sentido)?"Itinerário GTFS carregado.":"GTFS disponível somente no sentido oposto.")+(salvo?"":" Sem espaço para salvar; exporte o pacote."));
  }catch(e){
    if(consulta===consultaRota) msg.textContent=e.message||"Não foi possível importar o GTFS.";
  }finally{input.disabled=false;input.value="";}
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
      ` Viagem da linha ${numeroVisivel(linhaAtual)} (${categoriaLinha(linhas[linhaAtual])}) finalizada. Avalie sua experiência.`;

}


/* ==============================
   MODAIS
============================== */

function fecharModais(){
  sessaoAdmin++;adminAtivo=false;
  porId("painelAdmin").replaceChildren();porId("senhaAdmin").value="";

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

async function derivarSenha(senha,sal){
  const chave=await crypto.subtle.importKey("raw",new TextEncoder().encode(senha),"PBKDF2",false,["deriveBits"]);
  const bytes=Uint8Array.from(sal.match(/../g),x=>parseInt(x,16));
  const bits=await crypto.subtle.deriveBits({name:"PBKDF2",salt:bytes,iterations:600000,hash:"SHA-256"},chave,256);
  return Array.from(new Uint8Array(bits),b=>b.toString(16).padStart(2,"0")).join("");
}
async function credencial(senha){
  const sal=Array.from(crypto.getRandomValues(new Uint8Array(16)),b=>b.toString(16).padStart(2,"0")).join("");
  return {sal,hash:await derivarSenha(senha,sal)};
}
async function cadastrarUsuario(){

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

  let protegida;
  try{protegida=await credencial(senha);}catch{toast("Para cadastrar, abra o SafeWay em HTTPS.");return;}
  const atuais=obterUsuarios();
  if(atuais.some(u=>u.nome.toLowerCase()===nome.toLowerCase())){toast("Esse nome já está cadastrado.");return;}
  atuais.push({nome,...protegida});

  localStorage.setItem(
    CONFIG.usuarios,
    JSON.stringify(atuais)
  );

  toast("✅ Cadastro realizado!");
}

async function loginUsuario(){

  const nome=document
    .getElementById("usuarioNome")
    .value.trim();

  const senha=document
    .getElementById("usuarioSenha")
    .value;

  const usuarios=obterUsuarios();

  const usuario=usuarios.find(
    u=>u.nome.toLowerCase()===nome.toLowerCase()

  );

  let confere=false;
  try{
    if(usuario?.hash) confere=await derivarSenha(senha,usuario.sal)===usuario.hash;
    else if(usuario && usuario.senha===senha){
      const protegida=await credencial(senha);
      const atuais=obterUsuarios();
      const anterior=atuais.find(u=>u.nome===usuario.nome && u.senha===senha);
      if(anterior){delete anterior.senha;Object.assign(anterior,protegida);localStorage.setItem(CONFIG.usuarios,JSON.stringify(atuais));}
      confere=true;
    }
  }catch{toast("Não foi possível validar o acesso. Abra o site em HTTPS.");return;}
  if(!confere){
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
          Linha: ${escapar(item.linha ? numeroVisivel(item.linha)+(linhas[item.linha]?.municipal?" (municipal)":linhas[item.linha]?.municipal===false?" (intermunicipal)":"") : "-")}<br>
          ${escapar(item.data)}
        </small>

      </div>

    `)
    .join("");

}


/* ==============================
   ADMINISTRADOR
============================== */

let sessaoAdmin=0;
let adminAtivo=false;
async function loginAdmin(){
  const tentativa=++sessaoAdmin;
  adminAtivo=false;
  porId("painelAdmin").replaceChildren();

  const senha=document
    .getElementById("senhaAdmin")
    .value;


  let calculada;
  try{calculada=await derivarSenha(senha,"admin12345");}catch{toast("Abra o site em HTTPS para entrar.");return;}
  if(tentativa!==sessaoAdmin)return;
  porId("senhaAdmin").value="";
  if(calculada!=="aaf4c4b94229918edfc9e32f786822ad5ef209c838792343d73b6d15512411d5"){

    toast("❌ Senha incorreta.");

    return;
  }


  adminAtivo=true;
  mostrarPainelAdmin();
}

function mostrarPainelAdmin(){
  if(!adminAtivo)return;
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
            Linha: ${escapar(item.linha ? numeroVisivel(item.linha)+(linhas[item.linha]?.municipal?" (municipal)":linhas[item.linha]?.municipal===false?" (intermunicipal)":"") : "-")}<br>
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
  if(!adminAtivo)return;

  if(!confirm("Deseja apagar este feedback?")){
    return;
  }

  const novaLista=obterFeedbacks()
    .filter(item=>item.id!==id);

  salvarFeedbacks(novaLista);

  mostrarPainelAdmin();

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
carregarPacotePublicado();
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

