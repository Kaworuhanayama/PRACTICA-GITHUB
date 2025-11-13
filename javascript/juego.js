const tablero = document.getElementById('tablero');
const mensaje = document.getElementById('mensaje');
const encontradosSpan = document.getElementById('encontrados');
const erroresSpan = document.getElementById('errores');
const intentosSpan = document.getElementById('intentos');
const reiniciarBtn = document.getElementById('reiniciar');


const INTENTOS_MAX = 10; 
const TOTAL_CASILLAS = 12;
const TOTAL_A_ENCONTRAR = 4;

const jugadores = [
  { name: 'James Rodríguez',  src: '../imagenes/james.png' },
  { name: 'Radamel Falcao', src: '../imagenes/falcao.png' },
  { name: 'Luis Díaz', src: '../imagenes/diaz.png' },
  { name: 'Juan Cuadrado', src: '../imagenes/cuadrado.png' }
];


let casillas = []; 
let encontrados = 0;
let errores = 0;
let intentosRestantes = INTENTOS_MAX;
let gameOver = false;

reiniciarBtn.addEventListener('click', iniciarJuego);

function iniciarJuego(){

  casillas = new Array(TOTAL_CASILLAS).fill(null);
  encontrados = 0;
  errores = 0;
  intentosRestantes = INTENTOS_MAX;
  gameOver = false;
  mensaje.textContent = '';
  mensaje.className = '';
  actualizarStats();

  const posiciones = [];
  while(posiciones.length < TOTAL_A_ENCONTRAR){
    const r = Math.floor(Math.random() * TOTAL_CASILLAS);
    if(!posiciones.includes(r)) posiciones.push(r);
  }
  posiciones.forEach((pos, i) => {
    casillas[pos] = i; 
  });


  tablero.innerHTML = '';
  for(let i = 0; i < TOTAL_CASILLAS; i++){
    const div = document.createElement('div');
    div.className = 'casilla';
    div.dataset.index = i;

   
    if (casillas[i] !== null){
      const img = document.createElement('img');
      img.src = jugadores[casillas[i]].src;
      img.alt = jugadores[casillas[i]].name;
      img.addEventListener('error', () => {
       
        const fallback = document.createElement('div');
        fallback.textContent = jugadores[casillas[i]].name;
        fallback.style.padding = '6px';
        fallback.style.fontWeight = '700';
        fallback.style.fontSize = '14px';
        while(div.firstChild) div.removeChild(div.firstChild);
        div.appendChild(fallback);
      });
      div.appendChild(img);
    }

  
    const wrongMark = document.createElement('div');
    wrongMark.className = 'wrongMark';
    wrongMark.textContent = '❌';
    div.appendChild(wrongMark);

    
    const cover = document.createElement('div');
    cover.className = 'cover';
    cover.textContent = '?';
    div.appendChild(cover);

 
    div.addEventListener('click', () => revelar(div, i));

    tablero.appendChild(div);
  }
}

function actualizarStats(){
  encontradosSpan.textContent = `Encontrados: ${encontrados}/${TOTAL_A_ENCONTRAR}`;
  erroresSpan.textContent = `Errores: ${errores}`;
  intentosSpan.textContent = `Intentos restantes: ${intentosRestantes}`;
}

function revelar(div, index){
  if (gameOver) return;
  if (div.classList.contains('revelada')) return; 

  div.classList.add('revelada');
  intentosRestantes--;

  if (casillas[index] !== null){
    encontrados++;
    div.classList.add('correct');
    mensaje.textContent = `¡Encontraste a ${jugadores[casillas[index]].name}!`;
    mensaje.className = 'success';
  } else {
    
    errores++;
    div.classList.add('wrong');
    mensaje.textContent = 'No es un futbolista. Sigue intentando.';
    mensaje.className = 'error';
  }

  actualizarStats();

  
  if (encontrados === TOTAL_A_ENCONTRAR){
    mensaje.textContent = '¡Encontraste los 4 futbolistas! Reiniciando...';
    mensaje.className = 'success';
    gameOver = true;
    setTimeout(iniciarJuego, 1500);
    return;
  }

  if (intentosRestantes <= 0){
   
    mensaje.textContent = 'Se acabaron los intentos. Mostrando posiciones correctas...';
    mensaje.className = 'error';
    gameOver = true;

    
    const todas = tablero.querySelectorAll('.casilla');
    todas.forEach((c, idx) => {
      const i = Number(c.dataset.index);
      if (casillas[i] !== null) {
        c.classList.add('revelada', 'correct');
      }
    });

    setTimeout(iniciarJuego, 2200);
    return;
  }
}


iniciarJuego();

function baseExplotada(){
  alert('¡La base de datos ha explotado! 🔥');
}