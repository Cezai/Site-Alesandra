document.addEventListener("DOMContentLoaded", function() {

    document.getElementById('ano-atual').textContent = new Date().getFullYear();

    // 1. ROLAGEM SUAVE (Smooth Scroll)
    const linksInternos = document.querySelectorAll('.nav-links a[href^="#"]');
    linksInternos.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // 2. EFEITO DE APARECER AO ROLAR
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // 5. INICIALIZAÇÃO DO ÁUDIO (Garante que mostra o tempo total se o áudio carregar rápido)
    const audio = document.getElementById('meu-audio');
    const audioTime = document.getElementById('audio-time');
    
    if (audio) {
        audio.addEventListener('loadedmetadata', () => {
            let minutes = Math.floor(audio.duration / 60);
            let seconds = Math.floor(audio.duration % 60);
            if (seconds < 10) seconds = '0' + seconds;
            // Se quiser que comece mostrando o tempo total, descomente a linha abaixo
            // audioTime.innerText = minutes + ':' + seconds; 
        });

        audio.addEventListener('timeupdate', () => {
            const audioBar = document.getElementById('audio-bar');
            const progress = (audio.currentTime / audio.duration) * 100;
            audioBar.style.width = progress + '%';
            
            let minutes = Math.floor(audio.currentTime / 60);
            let seconds = Math.floor(audio.currentTime % 60);
            if (seconds < 10) seconds = '0' + seconds;
            audioTime.innerText = minutes + ':' + seconds;
        });

        audio.addEventListener('ended', () => {
            const audioIcon = document.getElementById('audio-icon');
            const audioBar = document.getElementById('audio-bar');
            audioIcon.classList.remove('fa-pause');
            audioIcon.classList.add('fa-play');
            audioBar.style.width = '0%';
            audioTime.innerText = '0:00';
        });
    }

});

// 3. FUNÇÃO DA AUTOAVALIAÇÃO
function calcularResultado(btnElement) {
    const checkboxes = document.querySelectorAll('.st-check');
    let marcados = 0;
    
    checkboxes.forEach(box => {
        if (box.checked) marcados++;
    });

    let mensagem = "";
    // Resposta exata dependendo de quantos itens a pessoa marcou
    switch(marcados) {
        case 0:
            mensagem = "Você parece estar em um momento de maior equilíbrio agora, o que é maravilhoso! De qualquer forma, lembre-se de que o autoconhecimento é uma jornada contínua e a terapia também é um ótimo espaço para a manutenção do bem-estar.";
            break;
        case 1:
            mensagem = "Identificar esse incômodo já é um grande primeiro passo. Trabalhar essa questão pontual em terapia pode evitar que ela ganhe proporções maiores e traga ainda mais alívio para a sua rotina.";
            break;
        case 2:
            mensagem = "Lidar com essas questões no dia a dia pode gerar cansaço e frustração. A terapia pode te ajudar a entender a raiz desses desconfortos e a encontrar formas mais leves de lidar com eles.";
            break;
        case 3:
            mensagem = "Com essas situações presentes, é perfeitamente natural que você sinta uma sobrecarga emocional. O reprocessamento (TRG) vai te ajudar a tirar esse peso das costas e a respirar com mais tranquilidade.";
            break;
        case 4:
            mensagem = "Você tem carregado uma bagagem emocional bastante pesada. Há coisas travando o seu caminho, mas saiba que é totalmente possível reprocessar essas dores e voltar a viver o presente com leveza.";
            break;
        case 5:
            mensagem = "Você marcou todas as opções. Isso significa que a sua sobrecarga emocional está muito alta e possivelmente afetando a sua qualidade de vida. Você não precisa enfrentar tudo isso sozinho(a). A TRG foi desenvolvida exatamente para momentos como esse.";
            break;
    }

    checkboxes.forEach(box => {
        box.disabled = true; 
        box.parentElement.style.cursor = 'not-allowed'; 
        box.parentElement.style.opacity = '0.7'; 
    });
    
    btnElement.disabled = true;
    btnElement.innerText = "Resultado Gerado";
    btnElement.classList.add('btn-disabled');

    const imgAuto = document.getElementById('img-auto');
    const resultadoTexto = document.getElementById('resultado-texto');

    imgAuto.classList.add('fade-out-anim');

    setTimeout(() => {
        imgAuto.style.display = 'none';
        
        resultadoTexto.innerHTML = `<h3>Seu resultado:</h3><br><p>${mensagem}</p>`;
        resultadoTexto.style.display = 'block';
        
        resultadoTexto.classList.add('fade-in-anim');
    }, 400); 
}

// 4. FUNÇÃO DE SOLTAR O SENTIMENTO (EFEITO FUMAÇA)
function soltarSentimento() {
    const inputArea = document.getElementById('smoke-input');
    const btnSmoke = document.getElementById('btn-smoke');
    const explicacao = document.getElementById('trg-explicacao');

    if (inputArea.value.trim() === "") {
        alert("Por favor, escreva algum sentimento ou peso que deseja soltar antes de clicar.");
        return;
    }

    inputArea.classList.add('evaporar');

    setTimeout(() => {
        inputArea.style.display = 'none';
        btnSmoke.style.display = 'none';
        
        explicacao.style.display = 'block';
        explicacao.classList.add('fade-in', 'visible');
    }, 1500);
}

// 6. FUNÇÕES DE CONTROLE DO ÁUDIO PERSONALIZADO
function toggleAudio() {
    const audio = document.getElementById('meu-audio');
    const audioIcon = document.getElementById('audio-icon');

    if (audio.paused) {
        audio.play();
        audioIcon.classList.remove('fa-play');
        audioIcon.classList.add('fa-pause');
    } else {
        audio.pause();
        audioIcon.classList.remove('fa-pause');
        audioIcon.classList.add('fa-play');
    }
}

function seekAudio(event) {
    const audio = document.getElementById('meu-audio');
    const progressContainer = document.getElementById('audio-progress');
    const width = progressContainer.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;
    
    if(duration) {
        audio.currentTime = (clickX / width) * duration;
    }
}