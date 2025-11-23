/* =========================================
   DATOS DEL EJERCICIO 3: LA HIPÉRBOLA
   ========================================= */

// 1. SEGURIDAD: Inicialización del contenedor global
window.DATOS_EJERCICIOS = window.DATOS_EJERCICIOS || {};

// 2. DEFINICIÓN DEL EJERCICIO
window.DATOS_EJERCICIOS[3] = {
    titulo: "3. Ecuación de la Hipérbola",
    
    enunciado: `
        El centro de una hipérbola es el punto de intersección de las rectas $2x + y - 11 = 0$ y $3x - 2y - 6 = 0$. 
        Uno de sus focos es $F(9,3)$. 
        <br>
        Si la excentricidad ($e$) viene dada por la distancia entre los puntos $A(2, 1)$ y $B(6,2)$, halle su <strong>ecuación canónica</strong> y su <strong>ecuación general</strong>.
    `,

    // Configuración de la cámara (Zoom alejado para ver la hipérbola completa)
    configVista: {
        scale: 18,      // Escala menor porque los valores son grandes (x=9, y=3)
        offsetX: -50,   // Desplazamos a la izquierda para centrar el cuadrante 1
        offsetY: 50     // Bajamos un poco
    },

    // 3. PASOS DE RESOLUCIÓN
    pasos: [
        // --- PASO 0: HALLAR EL CENTRO ---
        {
            titulo: "1. Hallar el Centro (Intersección)",
            contenido: `
                <p>El centro $C(h,k)$ es la intersección de las dos rectas dadas. Resolvemos el sistema de ecuaciones:</p>
                $$ \\begin{cases} L_1: 2x + y = 11 \\\\ L_2: 3x - 2y = 6 \\end{cases} $$
                <p>Despejamos $y$ de $L_1$: $$ y = 11 - 2x $$</p>
                <p>Sustituimos en $L_2$: $$ 3x - 2(11 - 2x) = 6 $$</p>
                $$ 3x - 22 + 4x = 6 \\Rightarrow 7x = 28 \\Rightarrow x = 4 $$
                <p>Hallamos $y$: $$ y = 11 - 2(4) = 3 $$</p>
                <p><strong>Centro: $C(4,3)$</strong></p>
            `
        },
        // --- PASO 1: ANÁLISIS DE ORIENTACIÓN ---
        {
            titulo: "2. Orientación y Parámetro c",
            contenido: `
                <p>Tenemos el Centro $C(4,3)$ y un Foco $F(9,3)$.</p>
                <p>Como la coordenada $y$ es constante ($y=3$), el eje focal es horizontal. La hipérbola es <strong>Horizontal</strong>.</p>
                <p>La distancia del centro al foco es el parámetro $c$:</p>
                $$ c = |9 - 4| = 5 $$
            `
        },
        // --- PASO 2: EXCENTRICIDAD ---
        {
            titulo: "3. Calcular la Excentricidad (e)",
            contenido: `
                <p>El problema dice que $e$ es la distancia entre $A(2,1)$ y $B(6,2)$.</p>
                $$ e = d(A,B) = \\sqrt{(6-2)^2 + (2-1)^2} $$
                $$ e = \\sqrt{4^2 + 1^2} = \\sqrt{16+1} = \\sqrt{17} $$
                <p>Sabemos que en la hipérbola $e = c/a$.</p>
            `
        },
        // --- PASO 3: PARÁMETROS A y B ---
        {
            titulo: "4. Hallar a y b",
            contenido: `
                <p>Usamos la relación $e = c/a$:</p>
                $$ \\sqrt{17} = \\frac{5}{a} \\Rightarrow a = \\frac{5}{\\sqrt{17}} $$
                <p>Elevamos al cuadrado: $$ a^2 = \\frac{25}{17} $$</p>
                <p>Usamos la relación pitagórica de la hipérbola ($c^2 = a^2 + b^2$):</p>
                $$ 25 = \\frac{25}{17} + b^2 $$
                $$ b^2 = 25 - \\frac{25}{17} = 25(1 - \\frac{1}{17}) = 25(\\frac{16}{17}) = \\frac{400}{17} $$
            `
        },
        // --- PASO 4: ECUACIÓN CANÓNICA ---
        {
            titulo: "5. Ecuación Canónica",
            contenido: `
                <p>Al ser horizontal, la fórmula es $\\frac{(x-h)^2}{a^2} - \\frac{(y-k)^2}{b^2} = 1$. Sustituimos $C(4,3)$, $a^2$ y $b^2$:</p>
                $$ \\frac{(x-4)^2}{25/17} - \\frac{(y-3)^2}{400/17} = 1 $$
                <p>Simplificando las fracciones complejas:</p>
                $$ \\frac{17(x-4)^2}{25} - \\frac{17(y-3)^2}{400} = 1 $$
            `
        },
        // --- PASO 5: ECUACIÓN GENERAL ---
        {
            titulo: "6. Ecuación General",
            contenido: `
                <p>Multiplicamos toda la ecuación por 400 para eliminar denominadores:</p>
                $$ 16 \\cdot 17(x-4)^2 - 17(y-3)^2 = 400 $$
                $$ 272(x^2 - 8x + 16) - 17(y^2 - 6y + 9) - 400 = 0 $$
                <p>Agrupamos términos:</p>
                $$ 272x^2 - 2176x + 4352 - 17y^2 + 102y - 153 - 400 = 0 $$
                <p><strong>Resultado Final:</strong></p>
                $$ 272x^2 - 17y^2 - 2176x + 102y + 3799 = 0 $$
            `
        }
    ],

    // 4. RENDERIZADO GRÁFICO COMPLEJO
    renderGrafico: (ctx, scale, utils, step) => {
        
        // Parámetros calculados
        const h = 4;
        const k = 3;
        const c = 5;
        const a = 5 / Math.sqrt(17); // ~1.21
        const b = Math.sqrt(400/17); // ~4.85
        
        // Puntos clave
        const Center = { x: h, y: k };
        const F1 = { x: h + c, y: k }; // (9,3)
        const F2 = { x: h - c, y: k }; // (-1,3)
        const V1 = { x: h + a, y: k };
        const V2 = { x: h - a, y: k };

        // PASO 0: Intersección de Rectas (Hallar Centro)
        if (step >= 0) {
            // Recta 1: y = -2x + 11
            const fL1 = (x) => -2*x + 11;
            utils.plotFunction(ctx, fL1, '#cbd5e0'); // Gris claro
            
            // Recta 2: y = 1.5x - 3
            const fL2 = (x) => 1.5*x - 3;
            utils.plotFunction(ctx, fL2, '#cbd5e0'); // Gris claro

            // Centro
            utils.drawPoint(ctx, Center.x, Center.y, '#2b6cb0', 'C(4,3)');
        }

        // PASO 1: Focos y Eje
        if (step >= 1) {
            utils.drawPoint(ctx, F1.x, F1.y, '#e53e3e', 'F1(9,3)');
            // Dibujar eje focal
            utils.drawLine(ctx, -10, k, 20, k, '#2b6cb0', 1, true);
        }

        // PASO 2: Visualizar Excentricidad (Segmento AB)
        if (step === 2) {
            const A = { x: 2, y: 1 };
            const B = { x: 6, y: 2 };
            utils.drawPoint(ctx, A.x, A.y, '#ed8936', 'A');
            utils.drawPoint(ctx, B.x, B.y, '#ed8936', 'B');
            utils.drawLine(ctx, A.x, A.y, B.x, B.y, '#ed8936', 2);
            
            // Texto explicativo en el canvas
            ctx.fillStyle = '#ed8936';
            ctx.font = '14px Oswald';
            ctx.fillText('e = dist(A,B) ≈ 4.12', 3 * scale, -4 * scale);
        }

        // PASO 3+: Rectángulo Fundamental y Asíntotas
        if (step >= 3) {
            // El rectángulo fundamental tiene ancho 2a y alto 2b, centrado en C
            const xLeft = h - a;
            const xRight = h + a;
            const yTop = k + b;
            const yBottom = k - b;

            // Dibujar Rectángulo (Guía visual)
            ctx.strokeStyle = '#a0aec0';
            ctx.setLineDash([3, 3]);
            ctx.lineWidth = 1;
            ctx.strokeRect(xLeft * scale, -yTop * scale, (2*a)*scale, (2*b)*scale);
            ctx.setLineDash([]);

            // Dibujar Asíntotas (Diagonales del rectángulo)
            // Pendientes m = +/- b/a
            const m = b/a;
            const asintota1 = (x) => k + m * (x - h);
            const asintota2 = (x) => k - m * (x - h);

            utils.plotFunction(ctx, asintota1, '#718096'); // Gris oscuro
            utils.plotFunction(ctx, asintota2, '#718096');
        }

        // PASO 4+: La Hipérbola
        if (step >= 4) {
            // Dibujamos la hipérbola usando 4 funciones (ramas superior/inferior, izquierda/derecha)
            // Ecuación: y = k +/- b * sqrt( (x-h)^2/a^2 - 1 )
            
            ctx.strokeStyle = '#e53e3e'; // Rojo intenso
            ctx.lineWidth = 2;

            // Función auxiliar para dibujar una rama
            const drawHyperbolaBranch = (signX, signY) => {
                ctx.beginPath();
                // Iteramos desde el vértice hacia afuera
                const startX = (signX > 0) ? h + a : h - a;
                const endX = (signX > 0) ? h + a + 10 : h - a - 10;
                const stepX = (signX > 0) ? 0.1 : -0.1;

                let first = true;
                for (let x = startX; (signX > 0 ? x < endX : x > endX); x += stepX) {
                    // Argumento de la raíz
                    const arg = Math.pow((x - h)/a, 2) - 1;
                    if (arg < 0) continue;

                    const y = k + (signY > 0 ? 1 : -1) * b * Math.sqrt(arg);
                    
                    if (first) {
                        ctx.moveTo(x * scale, -y * scale);
                        first = false;
                    } else {
                        ctx.lineTo(x * scale, -y * scale);
                    }
                }
                ctx.stroke();
            };

            // Dibujar las 4 partes
            drawHyperbolaBranch(1, 1);  // Derecha Arriba
            drawHyperbolaBranch(1, -1); // Derecha Abajo
            drawHyperbolaBranch(-1, 1); // Izquierda Arriba
            drawHyperbolaBranch(-1, -1);// Izquierda Abajo

            // Marcar Vértices
            utils.drawPoint(ctx, V1.x, V1.y, '#e53e3e', 'V1');
            utils.drawPoint(ctx, V2.x, V2.y, '#e53e3e', 'V2');
        }
    }
};