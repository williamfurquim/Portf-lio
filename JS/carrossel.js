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
        titulo: "ConnectPolo (projeto principal) 🏆",
        descricao: "Sistema de gestão de treinamentos desenvolvido a partir de um problema real na Marcopolo. Substitui processos manuais via WhatsApp e planilhas por uma aplicação centralizada com autenticação, controle de acesso por perfil e organização de dados em tempo real. Foco em estruturação de regras de negócio, escalabilidade e confiabilidade das informações.",
        logo: "./img/icons/ConnectPolo.png",
        linkProjeto: "https://williamfurquim.github.io/ConnectPolo/"
    },
    {
        titulo: "Revise.e",
        descricao: "API REST desenvolvida com arquitetura em camadas (Controller, Service, Repository), focada em organização e escalabilidade. Implementa autenticação via JWT, validação de dados e integração com PostgreSQL utilizando Prisma ORM. Demonstra domínio de backend estruturado e boas práticas de separação de responsabilidades.",
        logo: "./img/icons/TasksCore.png",
        linkProjeto: "https://revise-theta.vercel.app/"
    },
    {
        titulo: "Robótica",
        descricao: "Interface web para monitoramento e controle de sensores em tempo real utilizando ESP32. Integra frontend com sistemas embarcados via comunicação Wi-Fi, abstraindo a complexidade do firmware em C++ através de uma interface acessível e responsiva.",
        logo: "./img/icons/Robótica.png",
        linkProjeto: "https://github.com/williamfurquim/Projeto-de-robotica"
    }
];

function mostrarSlide(i) {
    slides.forEach((slide, idx) => {
        const video = slide.querySelector("video");

        if (idx === i) {
            slide.classList.add("active");

            if (video && idx === i) {
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
        if (projeto.titulo.includes("ConnectPolo")) {
            titulo.style.color = "#FFD700";
        } else {
            titulo.style.color = "var(--azul-claro)";
        }
        descricao.textContent = projeto.descricao;
        logo.src = projeto.logo;
        logo.alt = `Logo do projeto ${projeto.titulo}`;
        btnConhecer.href = projeto.linkProjeto;
    }
}

next.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    mostrarSlide(index);
});

prev.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    mostrarSlide(index);
});

let isUserInteracting = false;

[next, prev].forEach(btn => {
    btn.addEventListener("click", () => {
        isUserInteracting = true;
        clearInterval(autoSlide);
    });
});

let autoSlide = setInterval(() => {
    const currentVideo = slides[index].querySelector("video");

    if (!isUserInteracting && (!currentVideo || currentVideo.paused)) {
        index = (index + 1) % slides.length;
        mostrarSlide(index);
    }
}, 8000);

document.querySelectorAll(".slide video").forEach(video => {
    video.addEventListener("click", () => {

        const isPlaying = !video.paused;

        pauseAllVideos(); // limpa tudo

        loadVideo(video);

        if (!isPlaying) {
            video.play();
        }
    });
});

mostrarSlide(index);