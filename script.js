/* =====================================
   MISSÃO AGROPECUÁRIA
   Projeto em JavaScript
===================================== */


/* =====================================
   NOMES ALEATÓRIOS
===================================== */

const nomes = [
    "Gabriel",
    "Ana",
    "Lucas",
    "Mariana",
    "Pedro",
    "Julia",
    "Rafael",
    "Beatriz"
];


/* =====================================
   AFIRMAÇÕES / PERGUNTAS
===================================== */

const perguntas = [

    {
        pergunta: "Qual prática contribui para uma agropecuária mais sustentável?",

        alternativas: [
            "Desperdiçar água na irrigação",
            "Usar técnicas de conservação do solo",
            "Retirar toda a vegetação do terreno",
            "Queimar resíduos agrícolas"
        ],

        correta: 1
    },


    {
        pergunta: "Qual é uma das principais atividades da agricultura?",

        alternativas: [
            "Cultivo de plantas",
            "Produção de carros",
            "Construção de casas",
            "Extração de petróleo"
        ],

        correta: 0
    },


    {
        pergunta: "Qual animal é tradicionalmente criado na pecuária?",

        alternativas: [
            "Cavalo-marinho",
            "Baleia",
            "Gado bovino",
            "Pinguim"
        ],

        correta: 2
    },


    {
        pergunta: "Por que a preservação do solo é importante para uma fazenda?",

        alternativas: [
            "Para diminuir a produtividade",
            "Para manter sua qualidade para os próximos cultivos",
            "Para impedir o crescimento das plantas",
            "Para aumentar a erosão"
        ],

        correta: 1
    },


    {
        pergunta: "Qual equipamento é muito utilizado na agricultura moderna?",

        alternativas: [
            "Trator",
            "Navio",
            "Avião comercial",
            "Submarino"
        ],

        correta: 0
    },


    {
        pergunta: "O que a irrigação fornece às plantações?",

        alternativas: [
            "Areia",
            "Água",
            "Petróleo",
            "Plástico"
        ],

        correta: 1
    },


    {
        pergunta: "Qual atitude ajuda a economizar água na produção agrícola?",

        alternativas: [
            "Deixar torneiras abertas",
            "Irrigar durante todo o dia sem controle",
            "Utilizar sistemas eficientes de irrigação",
            "Desperdiçar água"
        ],

        correta: 2
    },


    {
        pergunta: "O que significa agricultura sustentável?",

        alternativas: [
            "Produzir sem se preocupar com o meio ambiente",
            "Produzir buscando equilibrar economia e preservação ambiental",
            "Eliminar todas as áreas verdes",
            "Usar recursos naturais sem limites"
        ],

        correta: 1
    }

];


/* =====================================
   VARIÁVEIS DO JOGO
===================================== */

let perguntaAtual = 0;

let pontuacao = 0;

let nomeJogador = "";

let perguntasEmbaralhadas = [];


/* =====================================
   ELEMENTOS HTML
===================================== */

const telaInicial = document.getElementById("tela-inicial");

const telaJogo = document.getElementById("tela-jogo");

const telaFinal = document.getElementById("tela-final");

const botaoIniciar = document.getElementById("btn-iniciar");

const botaoJogarNovamente =
    document.getElementById("btn-jogar-novamente");

const botaoVoltar =
    document.getElementById("btn-voltar");

const perguntaElemento =
    document.getElementById("pergunta");

const alternativasElemento =
    document.getElementById("alternativas");

const mensagemElemento =
    document.getElementById("mensagem");

const numeroPergunta =
    document.getElementById("numero-pergunta");

const barraProgresso =
    document.getElementById("barra-progresso");

const textoPersonagem =
    document.getElementById("texto-personagem");

const pontuacaoElemento =
    document.getElementById("pontuacao");

const nomeFinal =
    document.getElementById("nome-final");

const resultadoMensagem =
    document.getElementById("resultado-mensagem");


/* =====================================
   ESCOLHER NOME ALEATÓRIO
===================================== */

function escolherNomeAleatorio() {

    const numero =
        Math.floor(Math.random() * nomes.length);

    return nomes[numero];
}


/* =====================================
   EMBARALHAR PERGUNTAS
===================================== */

function embaralharPerguntas() {

    perguntasEmbaralhadas = [...perguntas];

    for (
        let i = perguntasEmbaralhadas.length - 1;
        i > 0;
        i--
    ) {

        const numero =
            Math.floor(Math.random() * (i + 1));

        [
            perguntasEmbaralhadas[i],
            perguntasEmbaralhadas[numero]
        ] =
        [
            perguntasEmbaralhadas[numero],
            perguntasEmbaralhadas[i]
        ];
    }
}


/* =====================================
   INICIAR JOGO
===================================== */

function iniciarJogo() {

    perguntaAtual = 0;

    pontuacao = 0;

    nomeJogador = escolherNomeAleatorio();

    embaralharPerguntas();

    telaInicial.classList.add("escondido");

    telaFinal.classList.add("escondido");

    telaJogo.classList.remove("escondido");

    mostrarPergunta();
}


/* =====================================
   MOSTRAR PERGUNTA
===================================== */

function mostrarPergunta() {

    const pergunta =
        perguntasEmbaralhadas[perguntaAtual];

    perguntaElemento.textContent =
        pergunta.pergunta;

    alternativasElemento.innerHTML = "";

    mensagemElemento.textContent = "";

    numeroPergunta.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntasEmbaralhadas.length}`;

    const porcentagem =
        ((perguntaAtual) /
        perguntasEmbaralhadas.length) * 100;

    barraProgresso.style.width =
        `${porcentagem}%`;


    /*
        Aqui utilizamos o replace()
        para trocar uma palavra dentro de uma frase.
    */

    const frase =
        "Olá, você está pronto para o próximo desafio?";

    const frasePersonalizada =
        frase.replace("você", nomeJogador);

    textoPersonagem.textContent =
        frasePersonalizada;


    pergunta.alternativas.forEach(
        function(alternativa, indice) {

            const botao =
                document.createElement("button");

            botao.classList.add("alternativa");

            botao.textContent =
                alternativa;

            botao.addEventListener(
                "click",
                function() {

                    verificarResposta(
                        indice,
                        botao
                    );

                }
            );

            alternativasElemento.appendChild(botao);
        }
    );
}


/* =====================================
   VERIFICAR RESPOSTA
===================================== */

function verificarResposta(indiceEscolhido, botaoEscolhido) {

    const pergunta =
        perguntasEmbaralhadas[perguntaAtual];

    const botoes =
        document.querySelectorAll(".alternativa");


    /* impede novas respostas */

    botoes.forEach(function(botao) {

        botao.disabled = true;

    });


    if (indiceEscolhido === pergunta.correta) {

        pontuacao += 10;

        botaoEscolhido.classList.add("correta");

        mensagemElemento.textContent =
            "🌱 Muito bem! Resposta correta! +10 pontos";

        mensagemElemento.style.color =
            "#2e7d32";

    } else {

        botaoEscolhido.classList.add("errada");

        botoes[pergunta.correta]
            .classList.add("correta");

        mensagemElemento.textContent =
            "🌾 Quase! A resposta correta está destacada em verde.";

        mensagemElemento.style.color =
            "#9a4c27";
    }


    setTimeout(function() {

        proximaPergunta();

    }, 1400);
}


/* =====================================
   PRÓXIMA PERGUNTA
===================================== */

function proximaPergunta() {

    perguntaAtual++;

    if (
        perguntaAtual >=
        perguntasEmbaralhadas.length
    ) {

        finalizarJogo();

    } else {

        mostrarPergunta();

    }
}


/* =====================================
   FINALIZAR JOGO
===================================== */

function finalizarJogo() {

    telaJogo.classList.add("escondido");

    telaFinal.classList.remove("escondido");

    pontuacaoElemento.textContent =
        pontuacao;

    nomeFinal.textContent =
        nomeJogador;


    /*
       Mensagens diferentes de acordo
       com a pontuação.
    */

    if (pontuacao >= 70) {

        resultadoMensagem.textContent =
            "🌟 Excelente! Você demonstrou muito conhecimento sobre agropecuária!";

    } else if (pontuacao >= 50) {

        resultadoMensagem.textContent =
            "🌱 Muito bom! Você está no caminho certo para cuidar da fazenda.";

    } else if (pontuacao >= 30) {

        resultadoMensagem.textContent =
            "🚜 Bom trabalho! Continue estudando sobre agropecuária.";

    } else {

        resultadoMensagem.textContent =
            "🌾 Continue aprendendo! Cada conhecimento ajuda a melhorar a fazenda.";

    }

    barraProgresso.style.width = "100%";
}


/* =====================================
   JOGAR NOVAMENTE
===================================== */

function jogarNovamente() {

    iniciarJogo();

}


/* =====================================
   VOLTAR PARA A CAPA
===================================== */

function voltarInicio() {

    telaFinal.classList.add("escondido");

    telaJogo.classList.add("escondido");

    telaInicial.classList.remove("escondido");

}


/* =====================================
   EVENTOS DOS BOTÕES
===================================== */

botaoIniciar.addEventListener(
    "click",
    iniciarJogo
);


botaoJogarNovamente.addEventListener(
    "click",
    jogarNovamente
);


botaoVoltar.addEventListener(
    "click",
    voltarInicio
);
