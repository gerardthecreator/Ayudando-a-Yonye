/* =========================================
   1. CONFIGURACIÓN INICIAL Y ESTADO GLOBAL
   ========================================= */

// Inicialización segura del contenedor de datos
window.DATOS_EJERCICIOS = window.DATOS_EJERCICIOS || {};

// Referencias al Canvas
const canvas = document.getElementById('mathCanvas');
const ctx = canvas.getContext('2d');

// Estado de la Aplicación
let currentExerciseId = 1;
let currentStepIndex = 0;

// Configuración de la "Cámara" (Viewport)
const Viewport = {
    scale: 40,       // Zoom (píxeles por unidad)
    offsetX: 0,      // Desplazamiento X
    offsetY: 0,      // Desplazamiento Y
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0
};

/* =========================================
   2. INICIALIZACIÓN (AL CARGAR LA PÁGINA)
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Ajustar tamaño del canvas al contenedor
    resizeCanvas();
    
    // Cargar el primer ejercicio por defecto si existen datos
    if (window.DATOS_EJERCICIOS[1]) {
        cargarEjercicio(1);
    } else {
        console.log("Esperando datos de ejercicios...");
    }

    // Event Listeners Generales
    document.getElementById('reset-view').addEventListener('click', resetView);
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        drawScene(); // Redibujar al cambiar tamaño de ventana
    });

    // Configurar interacción del mouse (Zoom/Pan)
    setupCanvasInteractions();
});

/* =========================================
   3. LÓGICA DE CONTROL DE EJERCICIOS
   ========================================= */

/**
 * Función segura para renderizar fórmulas matemáticas.
 * Evita errores si MathJax aún no ha terminado de cargar.
 */
function renderizarMathJax(elemento) {
    if (window.MathJax && window.MathJax.typesetPromise) {
        MathJax.typesetPromise([elemento])
            .catch((err) => console.log('MathJax error:', err));
    } else {
        // Si MathJax no está listo, no hacemos nada.
        // La configuración 'startup' en el HTML se encargará de la carga inicial.
        console.log("MathJax aún cargando, renderizado diferido.");
    }
}

function cargarEjercicio(id) {
    const data = window.DATOS_EJERCICIOS[id];
    
    if (!data) {
        console.error(`Datos del ejercicio ${id} no encontrados.`);
        return;
    }

    currentExerciseId = id;
    currentStepIndex = 0; // Reiniciar siempre al primer paso

    // 1. Actualizar Menú de Navegación
    document.querySelectorAll('.neu-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-ex${id}`);
    if(activeBtn) activeBtn.classList.add('active');

    // 2. Inyectar Título y Enunciado
    document.getElementById('exercise-title').innerText = data.titulo;
    
    const statementDiv = document.getElementById('exercise-statement');
    statementDiv.innerHTML = `<p>${data.enunciado}</p>`;

    // Renderizar fórmulas del enunciado
    renderizarMathJax(statementDiv);

    // 3. Configurar Vista Inicial del Gráfico
    if (data.configVista) {
        Viewport.scale = data.configVista.scale || 40;
        Viewport.offsetX = data.configVista.offsetX || 0;
        Viewport.offsetY = data.configVista.offsetY || 0;
    } else {
        resetView();
    }

    // 4. Mostrar el primer paso
    actualizarPasoUI();
}

function cambiarPaso(direccion) {
    const data = window.DATOS_EJERCICIOS[currentExerciseId];
    if (!data) return;

    const nuevoIndice = currentStepIndex + direccion;

    // Validar límites
    if (nuevoIndice >= 0 && nuevoIndice < data.pasos.length) {
        currentStepIndex = nuevoIndice;
        actualizarPasoUI();
    }
}

function actualizarPasoUI() {
    const data = window.DATOS_EJERCICIOS[currentExerciseId];
    const paso = data.pasos[currentStepIndex];
    const container = document.getElementById('single-step-container');

    // 1. Inyectar HTML del paso
    container.innerHTML = `
        <div class="step-title">Paso ${currentStepIndex + 1}: ${paso.titulo}</div>
        <div class="step-content">${paso.contenido}</div>
    `;

    // 2. Actualizar Indicador
    const indicator = document.getElementById('step-indicator');
    if (indicator) {
        indicator.innerText = `Paso ${currentStepIndex + 1} de ${data.pasos.length}`;
    }

    // 3. Gestionar botones (Anterior/Siguiente)
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    if (currentStepIndex === 0) {
        btnPrev.style.opacity = '0.5';
        btnPrev.style.pointerEvents = 'none';
    } else {
        btnPrev.style.opacity = '1';
        btnPrev.style.pointerEvents = 'auto';
    }

    if (currentStepIndex === data.pasos.length - 1) {
        btnNext.style.opacity = '0.5';
        btnNext.style.pointerEvents = 'none';
        btnNext.innerText = "Finalizado";
    } else {
        btnNext.style.opacity = '1';
        btnNext.style.pointerEvents = 'auto';
        btnNext.innerText = "Siguiente";
    }

    // 4. Renderizar Matemáticas del paso actual
    renderizarMathJax(container);

    // 5. Redibujar el gráfico
    drawScene();
}

/* =========================================
   4. MOTOR GRÁFICO (CANVAS)
   ========================================= */

function resizeCanvas() {
    const container = document.getElementById('canvas-wrapper');
    if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        drawScene();
    }
}

function resetView() {
    Viewport.scale = 40;
    Viewport.offsetX = 0;
    Viewport.offsetY = 0;
    drawScene();
}

function drawScene() {
    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save(); // Guardar estado

    // Trasladar origen al centro + offset
    const centerX = canvas.width / 2 + Viewport.offsetX;
    const centerY = canvas.height / 2 + Viewport.offsetY;
    ctx.translate(centerX, centerY);

    // Dibujar Fondo
    drawGrid(centerX, centerY);
    drawAxes();

    // Dibujar Ejercicio
    const data = window.DATOS_EJERCICIOS[currentExerciseId];
    if (data && typeof data.renderGrafico === 'function') {
        data.renderGrafico(ctx, Viewport.scale, GraphUtils, currentStepIndex);
    }

    ctx.restore(); // Restaurar estado
}

/* =========================================
   5. UTILIDADES DE DIBUJO
   ========================================= */

const GraphUtils = {
    drawPoint: (ctx, x, y, color = '#2b6cb0', label = '') => {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x * Viewport.scale, -y * Viewport.scale, 6, 0, Math.PI * 2);
        ctx.fill();
        
        if (label) {
            ctx.fillStyle = '#4a5568';
            ctx.font = 'bold 14px Oswald';
            ctx.fillText(label, x * Viewport.scale + 10, -y * Viewport.scale - 10);
        }
    },

    drawLine: (ctx, x1, y1, x2, y2, color = '#4a5568', width = 2, dashed = false) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        if (dashed) ctx.setLineDash([5, 5]);
        else ctx.setLineDash([]);
        
        ctx.moveTo(x1 * Viewport.scale, -y1 * Viewport.scale);
        ctx.lineTo(x2 * Viewport.scale, -y2 * Viewport.scale);
        ctx.stroke();
        ctx.setLineDash([]);
    },

    plotFunction: (ctx, func, color = '#e53e3e') => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;

        const startX = (-canvas.width/2 - Viewport.offsetX) / Viewport.scale;
        const endX = (canvas.width/2 - Viewport.offsetX) / Viewport.scale;

        let first = true;
        // Iterar píxel por píxel
        for (let px = -canvas.width/2 - Viewport.offsetX; px < canvas.width/2 - Viewport.offsetX; px += 2) {
            const x = px / Viewport.scale;
            try {
                const y = func(x);
                if (isNaN(y) || !isFinite(y)) {
                    first = true;
                    continue;
                }
                
                const py = -y * Viewport.scale;

                if (first) {
                    ctx.moveTo(px, py);
                    first = false;
                } else {
                    ctx.lineTo(px, py);
                }
            } catch (e) { first = true; }
        }
        ctx.stroke();
    }
};

/* =========================================
   6. DIBUJO DE FONDO
   ========================================= */

function drawGrid(cx, cy) {
    const s = Viewport.scale;
    const w = canvas.width;
    const h = canvas.height;

    ctx.beginPath();
    ctx.strokeStyle = '#cbd5e0';
    ctx.lineWidth = 0.5;

    const startX = Math.floor((-cx) / s) * s;
    const endX = Math.floor((w - cx) / s) * s;
    const startY = Math.floor((-cy) / s) * s;
    const endY = Math.floor((h - cy) / s) * s;

    for (let x = startX; x <= endX; x += s) {
        ctx.moveTo(x, -cy);
        ctx.lineTo(x, h - cy);
    }
    for (let y = startY; y <= endY; y += s) {
        ctx.moveTo(-cx, y);
        ctx.lineTo(w - cx, y);
    }
    ctx.stroke();
}

function drawAxes() {
    const w = canvas.width;
    const h = canvas.height;
    const cx = Viewport.offsetX;
    const cy = Viewport.offsetY;

    ctx.beginPath();
    ctx.strokeStyle = '#2d3748';
    ctx.lineWidth = 1.5;

    // Eje X
    ctx.moveTo(-w/2 - cx, 0);
    ctx.lineTo(w/2 - cx, 0);

    // Eje Y
    ctx.moveTo(0, -h/2 - cy);
    ctx.lineTo(0, h/2 - cy);
    
    ctx.stroke();
}

/* =========================================
   7. INTERACCIÓN (MOUSE / TOUCH)
   ========================================= */

function setupCanvasInteractions() {
    canvas.addEventListener('mousedown', (e) => {
        Viewport.isDragging = true;
        Viewport.lastMouseX = e.clientX;
        Viewport.lastMouseY = e.clientY;
        canvas.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
        if (Viewport.isDragging) {
            const dx = e.clientX - Viewport.lastMouseX;
            const dy = e.clientY - Viewport.lastMouseY;
            
            Viewport.offsetX += dx;
            Viewport.offsetY += dy;
            
            Viewport.lastMouseX = e.clientX;
            Viewport.lastMouseY = e.clientY;
            
            drawScene();
        }
    });

    window.addEventListener('mouseup', () => {
        Viewport.isDragging = false;
        canvas.style.cursor = 'default';
    });

    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        const z = 0.1;
        if (e.deltaY < 0) Viewport.scale *= (1 + z);
        else Viewport.scale *= (1 - z);
        
        Viewport.scale = Math.max(5, Math.min(Viewport.scale, 300));
        drawScene();
    }, { passive: false });
}