document.addEventListener('DOMContentLoaded', () => {
    const backgroundAnimationEl = document.getElementById('background-animation');
    const typingTextEl = document.getElementById('typing-text');
    const romanticVideoEl = document.getElementById('romantic-video');
    
    const romanticMessage = "Kerolyn, este é o nosso segundo Natal juntos... e o começo de muitos outros. ❤️";

    // 1. Iniciar Efeito de Digitação
    function typeMessage(msg, el) {
        let i = 0; 
        el.innerHTML = '';
        const timer = setInterval(() => {
            if (i < msg.length) { 
                el.innerHTML += msg.charAt(i); 
                i++; 
            } else { 
                clearInterval(timer); 
            }
        }, 75);
    }

    // 2. Observer para a Linha do Tempo (anima ao rolar)
    const setupTimelineObserver = () => {
        const items = document.querySelectorAll('.revealable');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => { 
                if (e.isIntersecting) e.target.classList.add('visible'); 
            });
        }, { threshold: 0.2 });
        items.forEach(item => observer.observe(item));
    };

    // 3. Sistema de Abas (Mensagens)
    window.openTab = function(evt, name) {
        const content = document.getElementsByClassName("tab-content");
        for (let x of content) x.classList.remove('active');
        
        const btns = document.getElementsByClassName("tab-button");
        for (let x of btns) x.classList.remove('active');
        
        document.getElementById(name).classList.add('active');
        evt.currentTarget.classList.add('active');
    }

    // 4. Gerador de Corações no Fundo
    setInterval(() => {
        const h = document.createElement('div');
        h.classList.add('heart');
        h.style.left = Math.random() * 100 + 'vw';
        h.style.opacity = (Math.random() * 0.4) + 0.1;
        backgroundAnimationEl.appendChild(h);
        setTimeout(() => h.remove(), 10000);
    }, 450);

    // --- INICIALIZAÇÃO ---
    // Ativa a primeira aba
    const firstTabBtn = document.querySelector('.tab-button');
    if(firstTabBtn) firstTabBtn.click();

    // Inicia animações
    typeMessage(romanticMessage, typingTextEl);
    setupTimelineObserver();

    // Tenta tocar o vídeo (pode ser bloqueado pelo navegador até o primeiro clique)
    romanticVideoEl.play().catch(() => console.log("Vídeo aguardando interação."));
});
