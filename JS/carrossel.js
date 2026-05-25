document.addEventListener("DOMContentLoaded", () => {
    if (window.location.hash) {
        history.replaceState(null, null, ' ');
    }
    window.scrollTo(0, 0);
});

const slides = document.querySelectorAll(".slide");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

const titulo = document.getElementById("projeto-titulo");
const descricao = document.getElementById("projeto-descricao");
const logo = document.getElementById("projeto-logo");
const btnConhecer = document.getElementById("projeto-btnConhecer");

let index = 0;

function loadVideo(video) {
    if (!video.src) {
        video.src = video.dataset.src;
        video.load();
    }
}

function resetVideo(video) {
    video.pause();
    video.removeAttribute("src"); // remove fonte
    video.load(); // força limpar buffer
}

function pauseAllVideos() {
    document.querySelectorAll(".slide video").forEach(v => resetVideo(v));
}

const projetos = [
    {
        titulo: "Revise.e",
        descricao: "Aplicação full-stack de revisão ativa baseada em cards com omissão de palavras-chave. O foco do projeto foi construir uma arquitetura limpa e escalável, garantindo respostas rápidas na API e consistência na persistência de dados em nuvem. Stack: Node.js • TypeScript • Prisma ORM/banco Neon (PostgreSQL) • React • JavaScript • CSS3",
        logo: "./img/icons/Revisee.png",
        linkProjeto: "https://github.com/williamfurquim/Revise.e"
    },
    {
        titulo: "ConnectPolo",
        descricao: "Plataforma full-stack de apoio e gestão para o treinamento de menores aprendizes. O foco do projeto foi centralizar informações dispersas, eliminando a dependência do WhatsApp e garantindo total rastreabilidade e auditoria para os líderes de montagem. Stack: Firebase • JavaScript • HTML5/CSS3 ",
        logo: "./img/icons/ConnectPolo.png",
        linkProjeto: "https://github.com/williamfurquim/ConnectPolo"
    },
    {
        titulo: "Robótica",
        descricao: "Interface web para controle em tempo real de uma célula robótica. O projeto embarca um servidor HTTP estável no ESP32, utilizando lógica não-bloqueante para gerenciar sensores e atuadores simultaneamente sem travar o sistema. Stack: C/C++ (ESP32) • Arduino IDE • JavaScript • HTML5/CSS3",
        logo: "./img/icons/Robótica.png",
        linkProjeto: "https://github.com/williamfurquim/Projeto-de-robotica"
    }
];

function mostrarSlide(i) {
    slides.forEach((slide, idx) => {
        const video = slide.querySelector("video");

        if (idx === i) {
            slide.classList.add("active");

            if (video) {
                loadVideo(video);
            }
        } else {
            slide.classList.remove("active");

            if (video) {
                video.pause();
            }
        }
    });

    const projeto = projetos[i];
    if (projeto) {
        titulo.textContent = projeto.titulo;
        descricao.textContent = projeto.descricao;
        logo.src = projeto.logo;
        logo.alt = `Logo do projeto ${projeto.titulo}`;
        btnConhecer.href = projeto.linkProjeto;
    }
}

// Cliques dos botões (Apenas chamam a função de mostrar o slide)
next.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    mostrarSlide(index);
});

prev.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    mostrarSlide(index);
});

// Controle de reprodução dos vídeos ao clicar neles
document.querySelectorAll(".slide video").forEach(video => {
    video.addEventListener("click", () => {
        const isPlaying = !video.paused;

        pauseAllVideos(); // Limpa e reseta os outros vídeos

        loadVideo(video);

        if (!isPlaying) {
            video.play();
        }
    });
});

// Inicializa o primeiro slide ao carregar a página
mostrarSlide(index);