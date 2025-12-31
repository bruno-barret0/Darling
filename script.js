/* RESET E ESTILOS GERAIS */
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
    background-color: #4e0000; color: #FFB6C1; font-family: 'Montserrat', sans-serif;
    min-height: 100vh; overflow-x: hidden; position: relative; text-align: center;
}
.container { position: relative; z-index: 10; padding: 20px; width: 100%; max-width: 800px; margin: auto; }
.section { margin-bottom: 40px; width: 100%; }

/* TIPOGRAFIA */
.main-message {
    font-family: 'Pinyon Script', cursive; font-size: 3rem; color: #ffffff;
    margin-bottom: 30px; text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    min-height: 1.5em;
}

/* VIDEO */
.video-container-wrapper { display: flex; justify-content: center; margin-top: 30px; width: 100%; }
.video-placeholder {
    position: relative; width: 100%; padding-top: 56.25%;
    background-color: #8B0000; border-radius: 8px; max-width: 700px; overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
video { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; }

/* ABAS */
.tab-buttons { display: flex; justify-content: center; gap: 10px; margin: 30px 0; flex-wrap: wrap; }
.tab-button {
    background-color: rgba(255, 255, 255, 0.1); color: #FFB6C1; border: 1px solid #FFB6C1;
    padding: 10px 15px; cursor: pointer; border-radius: 5px; transition: 0.3s;
}
.tab-button.active { background-color: #FFB6C1; color: #4e0000; }
.content-container { background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 10px; min-height: 120px; }
.tab-content { display: none; animation: fadeIn 0.5s; }
.tab-content.active { display: block; }

/* TIMELINE */
.timeline-container { margin-top: 40px; text-align: left; border-left: 2px solid #FFB6C1; padding-left: 20px; margin-bottom: 40px; }
.timeline-title { margin-bottom: 20px; font-size: 1.4rem; color: #fff; }
.timeline-item { opacity: 0; transform: translateY(20px); transition: 0.8s; padding-bottom: 20px; }
.timeline-item.visible { opacity: 1; transform: translateY(0); }
.date { font-weight: bold; color: #fff; display: block; }

/* FUNDO DE CORAÇÕES */
.background-animation { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none; }
.heart { 
    position: absolute; bottom: -10vh; width: 20px; height: 20px; background: #FFB6C1; 
    opacity: 0.3; transform: rotate(-45deg); animation: float 10s linear forwards; 
}
.heart::before, .heart::after { content: ''; position: absolute; width: 100%; height: 100%; background: inherit; border-radius: 50%; }
.heart::before { top: -50%; left: 0; }
.heart::after { left: 50%; top: 0; }

@keyframes float { 100% { transform: translateY(-110vh) rotate(-45deg); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

@media (max-width: 768px) { .main-message { font-size: 2rem; } }
