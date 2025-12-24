document.addEventListener('DOMContentLoaded', () => {
    // --- Configurações Iniciais ---
    // A data alvo é sempre o próximo Natal
    const now = new Date();
    const currentYear = now.getFullYear();
    const isChristmasPassed = now.getMonth() === 11 && now.getDate() >= 25;
    const targetYear = isChristmasPassed ? currentYear + 1 : currentYear;

    const countdownEl = document.getElementById('countdown');
    const videoPlaceholderTextEl = document.getElementById('video-placeholder-text');
    const romanticVideoEl = document.getElementById('romantic-video');
    const romanticContentEl = document.getElementById('romantic-content');
    const typingTextEl = document.getElementById('typing-text');
    const backgroundAnimationEl = document.getElementById('background-animation');
    
    const romanticMessage = "Kerolyn, este é o nosso segundo Natal juntos... e o começo de muitos outros.";
    let specialMomentTriggered = false;

    // --- 1. Lógica do Cronômetro (Countdown) ---
    function updateCountdown() {
        const now = new Date();
        const targetDate = new Date(targetYear, 11, 25, 0, 0, 1); // 25 de Dezembro, 00:00:01
        const timeDifference = targetDate - now;

        if (timeDifference <= 0 && !specialMomentTriggered) {
            clearInterval(countdownInterval);
            triggerSpecialMoment();
            specialMomentTriggered = true;
            return;
        }

        if (!specialMomentTriggered) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            countdownEl.innerHTML = `
                <div><span>${days.toString().padStart(2, '0')}</span><small>dias</small></div>
                <div><span>${hours.toString().padStart(2, '0')}</span><small>horas</small></div>
                <div><span>${minutes.toString().padStart(2, '0')}</span><small>minutos</small></div>
                <div><span>${seconds.toString().padStart(2, '0')}</span><small>segundos</small></div>
            `;
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); 

    // --- 2. Acionar Momento Especial (Vídeo e Conteúdo Extra) ---
    async function triggerSpecialMoment() {
        document.getElementById('countdown-section').style.display = 'none';
        videoPlaceholderTextEl.style.display = 'none';
        romanticVideoEl.style.display = 'block'; 

        try {
            await romanticVideoEl.play(); 
        } catch (err) { 
            // Fallback para autoplay bloqueado (comum em móveis)
            console.error("Autoplay foi prevenido:", err);
            videoPlaceholderTextEl.style.display = 'flex'; 
            videoPlaceholderTextEl.textContent = "Toque aqui para ver a mensagem ❤️";

            const videoWrapper = document.querySelector('.video-placeholder');
            const playVideoManually = () => {
                romanticVideoEl.play();
                videoPlaceholderTextEl.style.display = 'none';
                videoWrapper.removeEventListener('click', playVideoManually);
            };
            videoWrapper.addEventListener('click', playVideoManually);
        }

        romanticContentEl.classList.remove('hidden');
        setTimeout(() => {
            romanticContentEl.style.opacity = '1';
            // Rola suavemente para o novo conteúdo ficar visível em telas pequenas
            romanticContentEl.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
        }, 10);
        
        typeMessage(romanticMessage, typingTextEl);
        setupTimelineObserver();

        setTimeout(() => {
            const firstTabButton = document.querySelector('.tab-button');
            if(firstTabButton) {
                // Simula um clique no primeiro botão de aba
                firstTabButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            }
        }, 200);
    }
    
    // --- 3. Efeito de Digitação (Typing Effect) ---
    function typeMessage(message, element) {
        let index = 0; element.innerHTML = ''; const intervalId = setInterval(() => {
            if (index < message.length) { element.innerHTML += message.charAt(index); index++; } 
            else { clearInterval(intervalId); }
        }, 80);
    }

    // --- 4. Animação da Timeline ao Scrollar ---
    function setupTimelineObserver() {
        const timelineItems = document.querySelectorAll('.revealable');
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.5 };
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
            });
        }, observerOptions);
        timelineItems.forEach(item => observer.observe(item));
    }
    
    // --- 5. Funcionalidade de Abas/Guias (Tabs) ---
    window.openTab = function(evt, tabName) {
        const tabContents = document.getElementsByClassName("tab-content");
        for (let i = 0; i < tabContents.length; i++) {
            tabContents[i].classList.remove('active');
        }

        const tabButtons = document.getElementsByClassName("tab-button");
        for (let i = 0; i < tabButtons.length; i++) {
            tabButtons[i].classList.remove('active');
        }

        const targetTabEl = document.getElementById(tabName);
        if (targetTabEl) targetTabEl.classList.add('active');
        if (evt && evt.currentTarget) evt.currentTarget.classList.add('active');
    }


    // --- 6. Animação de Fundo (Corações e Estrelas) ---
    function createHeart() { 
        const heart = document.createElement('div'); heart.classList.add('heart'); heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 5 + 5 + 's'; heart.style.opacity = Math.random() * 0.5 + 0.1;
        heart.style.transform = `scale(${Math.random() * 0.5 + 0.5})`; backgroundAnimationEl.appendChild(heart);
        heart.addEventListener('animationend', () => heart.remove());
    }
    setInterval(createHeart, 300);

    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = Math.random() * 80 + 'vw';
        star.style.top = Math.random() * 40 + 60 + 'vh'; 
        star.style.animationDuration = Math.random() * 3 + 3 + 's'; 
        backgroundAnimationEl.appendChild(star);
        star.addEventListener('animationend', () => star.remove());
    }
    setInterval(createStar, 5000);

});
