/**Remove as classes ativas de todas e coloca na seção clicada.
 */
function mudarPagina(idPagina) {
    const secoes = document.querySelectorAll('.secao');
    
    secoes.forEach(secao => {
        secao.classList.remove('ativa-flex', 'ativa-block');
    });
    
    const secaoAlvo = document.getElementById(idPagina);
    if (idPagina === 'home-section') {
        secaoAlvo.classList.add('ativa-flex');
    } else {
        secaoAlvo.classList.add('ativa-block');
    }
}

/**Abre o envelope animado e agenda a exibição do QR Code após ler a mensagem
 */
function abrirCarta() {
    const envelope = document.getElementById('meu-envelope');
    
    if (!envelope.classList.contains('open')) {
        envelope.classList.add('open'); 
        
        setTimeout(() => {
            const overlay = document.getElementById('overlay-qr');
            const modalBox = document.getElementById('modal-box');
            
            overlay.style.display = 'flex';
            
            setTimeout(() => {
                overlay.style.opacity = '1';
                modalBox.style.transform = 'scale(1)';
            }, 10);
        }, 2500); 
    }
}

/**Fecha a janela do QR Code, remove o desfoque de fundo e fecha a cartinha de volta
 */
function fecharModal() {
    const overlay = document.getElementById('overlay-qr');
    const modalBox = document.getElementById('modal-box');
    
    overlay.style.opacity = '0';
    modalBox.style.transform = 'scale(0.8)';
    
    document.getElementById('meu-envelope').classList.remove('open');
    
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 500);
}

/**
 * LÓGICA DO QUIZ DE COMPATIBILIDADE
 */

const perguntasQuiz = [
    {
        pergunta: "Qual seria o date perfeito para nós?",
        opcoes: ["Cinema e muita pipoca", "Jantar romântico elegante", "Ficar em casa agarradinhos", "Aventura e natureza"]
    },
    {
        pergunta: "Qual é a nossa comida preferida para o fim de semana?",
        opcoes: ["Aquela pizza caprichada", "Hambúrguer com batata", "Japa / Sushi", "Muitos doces e sobremesas"]
    },
    {
        pergunta: "Se fôssemos viajar amanhã, para onde iríamos?",
        opcoes: ["Praia e sol", "Montanha e friozinho", "Uma cidade histórica", "Um resort all-inclusive"]
    },
    {
        pergunta: "O que não pode faltar em uma noite de filmes?",
        opcoes: ["Pipoca com muita manteiga", "Vários chocolates", "Um cobertor e abraços", "Nós comentando o filme todo"]
    },
    {
        pergunta: "Qual música mais combina com a gente?",
        opcoes: ["Um pop bem animado", "Um sertanejo apaixonado", "Um rockzinho clássico", "Uma música lenta e romântica"]
    },
    {
        pergunta: "O que eu mais gosto de fazer quando estamos juntos?",
        opcoes: ["Fazer você rir sem parar", "Ficar de chamego", "Planejar nosso futuro", "Te encher de beijos"]
    }
];

let perguntaAtual = 0;

function iniciarQuiz() {
    perguntaAtual = 0;
    document.getElementById('quiz-pergunta-area').style.display = 'block';
    document.getElementById('quiz-loading-area').style.display = 'none';
    document.getElementById('quiz-resultado-area').style.display = 'none';
    carregarPergunta();
}

function carregarPergunta() {
    const dadosPergunta = perguntasQuiz[perguntaAtual];
    document.getElementById('pergunta-texto').innerText = `${perguntaAtual + 1}. ${dadosPergunta.pergunta}`;
    
    const divOpcoes = document.getElementById('opcoes-container');
    divOpcoes.innerHTML = ''; // Limpa os botões antigos

    // Cria os botões com as respostas
    dadosPergunta.opcoes.forEach(opcao => {
        const btn = document.createElement('button');
        btn.className = 'btn-opcao';
        btn.innerText = opcao;
        btn.onclick = () => responderQuiz();
        divOpcoes.appendChild(btn);
    });
}

function responderQuiz() {
    perguntaAtual++;
    
    if (perguntaAtual < perguntasQuiz.length) {
        carregarPergunta(); // Vai para a próxima pergunta
    } else {
        mostrarLoading(); // Acabaram as perguntas, inicia o suspense
    }
}

function mostrarLoading() {
    document.getElementById('quiz-pergunta-area').style.display = 'none';
    document.getElementById('quiz-loading-area').style.display = 'block';
    
    let progresso = 0;
    const barra = document.getElementById('barra-progresso');
    const textoPorcentagem = document.getElementById('porcentagem-texto');
    
    // Animação da barra enchendo do 0 ao 100%
    const intervalo = setInterval(() => {
        progresso += 2; // Sobe de 2 em 2
        barra.style.width = progresso + '%';
        textoPorcentagem.innerText = progresso + '%';
        
        if (progresso >= 100) {
            clearInterval(intervalo);
            setTimeout(mostrarResultadoFinal, 500); // Espera meio segundo antes de mostrar o resultado
        }
    }, 50); // Velocidade do carregamento
}

function mostrarResultadoFinal() {
    document.getElementById('quiz-loading-area').style.display = 'none';
    document.getElementById('quiz-resultado-area').style.display = 'block';
}

function reiniciarQuiz() {
    iniciarQuiz();
}

// Inicia o quiz automaticamente quando a página carrega
window.onload = iniciarQuiz;