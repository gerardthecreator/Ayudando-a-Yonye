/* =========================================
   DATOS DEL EJERCICIO 1: INECUACIONES
   ========================================= */

// 1. SEGURIDAD: Aseguramos que el contenedor global exista
window.DATOS_EJERCICIOS = window.DATOS_EJERCICIOS || {};

// 2. DEFINICIÓN DEL EJERCICIO
window.DATOS_EJERCICIOS[1] = {
    titulo: "1. Inecuaciones Racionales y Valor Absoluto",
    
    enunciado: `
        Determine el conjunto solución de:
        <br><br>
        <strong>a.</strong> $$ \\frac{25x^2 - 30x - 270}{x^2 - 9} \\geq 5 $$
        <strong>b.</strong> $$ |x - 2| > |x - 3| + |3x - 10| $$
    `,
    
    // Configuración de la cámara (Zoom y posición inicial)
    configVista: {
        scale: 35, // Zoom
        offsetX: 0, // Centro horizontal
        offsetY: 50 // Bajamos un poco la vista para ver la parte positiva
    },
    
    // 3. PASOS DE RESOLUCIÓN (Texto + LaTeX)
    pasos: [
        // --- PARTE A (Índices 0, 1, 2, 3, 4) ---
        {
            titulo: "A. Planteamiento y Restricciones",
            contenido: `
                <p>Empezamos con la inecuación racional. <strong>Regla de Oro:</strong> Nunca pases el denominador a multiplicar si contiene $x$, porque no sabemos si es positivo o negativo.</p>
                <p>Primero, identificamos las restricciones. El denominador $x^2 - 9$ no puede ser cero.</p>
                $$ x^2 - 9 = 0 \\Rightarrow x = \\pm 3 $$
                <p>En la gráfica, estas son nuestras <strong>asíntotas verticales</strong> (líneas rojas). La solución nunca podrá tocar estos valores.</p>
            `
        },
        {
            titulo: "A. Igualar a Cero y Simplificar",
            contenido: `
                <p>Pasamos el 5 a restar para comparar con cero:</p>
                $$ \\frac{25x^2 - 30x - 270}{x^2 - 9} - 5 \\geq 0 $$
                <p>Hacemos común denominador multiplicando el 5 por $(x^2-9)$:</p>
                $$ \\frac{25x^2 - 30x - 270 - 5(x^2 - 9)}{x^2 - 9} \\geq 0 $$
                <p>Simplificando el numerador ($25x^2 - 5x^2 = 20x^2$):</p>
                $$ \\frac{20x^2 - 30x - 225}{x^2 - 9} \\geq 0 $$
                <p>Dividimos todo entre 5 para facilitar cálculos:</p>
                $$ \\frac{4x^2 - 6x - 45}{x^2 - 9} \\geq 0 $$
            `
        },
        {
            titulo: "A. Puntos Críticos (Raíces)",
            contenido: `
                <p>Ya tenemos las restricciones ($x \\neq \\pm 3$). Ahora buscamos cuándo el numerador se hace cero usando la fórmula general en $4x^2 - 6x - 45$:</p>
                $$ x = \\frac{6 \\pm \\sqrt{36 - 4(4)(-45)}}{8} = \\frac{6 \\pm \\sqrt{756}}{8} $$
                <p>Esto nos da dos valores aproximados:</p>
                $$ x_1 \\approx 4.18 \\quad y \\quad x_2 \\approx -2.68 $$
                <p>Estos puntos (azules en la gráfica) son donde la curva cruza el eje X.</p>
            `
        },
        {
            titulo: "A. Gráfica de la Función",
            contenido: `
                <p>Si graficamos la función $f(x) = \\frac{4x^2 - 6x - 45}{x^2 - 9}$, obtenemos la curva azul.</p>
                <p>Observa cómo la curva viene desde abajo, sube hasta el punto crítico $-2.68$, salta la asíntota, y luego vuelve a aparecer.</p>
                <p>La inecuación pide $\\geq 0$, es decir, <strong>¿Dónde está la curva por encima del eje X?</strong></p>
            `
        },
        {
            titulo: "A. Solución Final",
            contenido: `
                <p>Observando la gráfica, sombreamos en <strong>verde</strong> las zonas positivas:</p>
                <ol>
                    <li>Desde $-\\infty$ hasta la asíntota $-3$.</li>
                    <li>Desde la raíz $-2.68$ hasta la asíntota $3$.</li>
                    <li>Desde la raíz $4.18$ en adelante.</li>
                </ol>
                <p><strong>Conjunto Solución A:</strong></p>
                $$ S_a = ]-\\infty, -3[ \\cup \\left[\\frac{3-3\\sqrt{21}}{4}, 3\\right[ \\cup \\left[\\frac{3+3\\sqrt{21}}{4}, +\\infty\\right[ $$
            `
        },
        
        // --- PARTE B (Índices 5, 6) ---
        {
            titulo: "B. Inecuación con Valor Absoluto",
            contenido: `
                <p>Pasamos al ejercicio B: $$ |x - 2| > |x - 3| + |3x - 10| $$</p>
                <p>Para resolver esto analíticamente, buscamos los "puntos de quiebre" donde el interior de cada valor absoluto es cero:</p>
                <ul>
                    <li>$x - 2 = 0 \\Rightarrow x = 2$</li>
                    <li>$x - 3 = 0 \\Rightarrow x = 3$</li>
                    <li>$3x - 10 = 0 \\Rightarrow x = 10/3 \\approx 3.33$</li>
                </ul>
                <p>Estos puntos dividen la recta numérica en 4 zonas que debemos analizar por separado.</p>
            `
        },
        {
            titulo: "B. Análisis de Zonas y Solución",
            contenido: `
                <p>Al probar la inecuación en cada zona (cambiando signos según corresponda), encontramos que la desigualdad solo se cumple en el intervalo entre 3 y 3.66...</p>
                <p>Específicamente, la unión de las soluciones válidas nos da:</p>
                $$ 3 < x < \\frac{11}{3} $$
                <p><strong>Conjunto Solución B:</strong></p>
                $$ S_b = \\left]3, \\frac{11}{3}\\right[ $$
                <p><em>(Ver representación en la recta numérica arriba)</em></p>
            `
        }
    ],
    
    // 4. RENDERIZADO GRÁFICO (Canvas)
    renderGrafico: (ctx, scale, utils, step) => {
        
        // =================================================
        // LÓGICA PARTE A (Pasos 0, 1, 2, 3, 4)
        // =================================================
        if (step <= 4) {
            // Definir la función matemática para dibujar la curva
            const func = (x) => {
                const num = 4 * x * x - 6 * x - 45;
                const den = x * x - 9;
                // Evitar dibujar la línea vertical infinita en la asíntota
                if (Math.abs(den) < 0.05) return NaN;
                return num / den;
            };
            
            // Valores clave
            const xAsintota1 = -3;
            const xAsintota2 = 3;
            const root1 = (3 - 3 * Math.sqrt(21)) / 4; // aprox -2.68
            const root2 = (3 + 3 * Math.sqrt(21)) / 4; // aprox 4.18
            
            // SIEMPRE (Paso 0 en adelante): Dibujar Asíntotas
            utils.drawLine(ctx, xAsintota1, -100, xAsintota1, 100, '#e53e3e', 1.5, true);
            utils.drawLine(ctx, xAsintota2, -100, xAsintota2, 100, '#e53e3e', 1.5, true);
            
            // Etiquetas de asíntotas
            ctx.fillStyle = '#e53e3e';
            ctx.font = '12px Oswald';
            ctx.fillText('x = -3', xAsintota1 * scale - 15, -8 * scale);
            ctx.fillText('x = 3', xAsintota2 * scale - 15, -8 * scale);
            
            // PASO 2 en adelante: Dibujar Puntos Críticos (Raíces)
            if (step >= 2) {
                utils.drawPoint(ctx, root1, 0, '#2b6cb0', '-2.68');
                utils.drawPoint(ctx, root2, 0, '#2b6cb0', '4.18');
            }
            
            // PASO 3 en adelante: Dibujar la Curva Azul
            if (step >= 3) {
                utils.plotFunction(ctx, func, '#2b6cb0');
            }
            
            // PASO 4: Resaltar la Solución (Verde)
            if (step === 4) {
                ctx.lineWidth = 6;
                ctx.strokeStyle = 'rgba(72, 187, 120, 0.6)'; // Verde semitransparente
                
                // Zona 1: -infinito a -3
                ctx.beginPath();
                ctx.moveTo(-1000, 0);
                ctx.lineTo(xAsintota1 * scale, 0);
                ctx.stroke();
                
                // Zona 2: -2.68 a 3
                ctx.beginPath();
                ctx.moveTo(root1 * scale, 0);
                ctx.lineTo(xAsintota2 * scale, 0);
                ctx.stroke();
                
                // Zona 3: 4.18 a infinito
                ctx.beginPath();
                ctx.moveTo(root2 * scale, 0);
                ctx.lineTo(1000, 0);
                ctx.stroke();
            }
        }
        
        // =================================================
        // LÓGICA PARTE B (Pasos 5, 6)
        // =================================================
        else {
            // Limpiamos visualmente dibujando una "Recta Real" simple sobre el eje X
            utils.drawLine(ctx, -100, 0, 100, 0, '#4a5568', 2);
            
            // Puntos de quiebre del valor absoluto
            const p1 = 2;
            const p2 = 3;
            const p3 = 10 / 3; // 3.33
            
            // Dibujar los puntos de quiebre en gris
            utils.drawPoint(ctx, p1, 0, '#718096', '2');
            utils.drawPoint(ctx, p2, 0, '#718096', '3');
            utils.drawPoint(ctx, p3, 0, '#718096', '3.33');
            
            // PASO 6: Mostrar intervalo solución final
            if (step === 6) {
                const solStart = 3;
                const solEnd = 11 / 3; // 3.66
                
                // Línea gruesa verde
                ctx.lineWidth = 8;
                ctx.strokeStyle = '#48bb78';
                ctx.beginPath();
                ctx.moveTo(solStart * scale, 0);
                ctx.lineTo(solEnd * scale, 0);
                ctx.stroke();
                
                // Círculos abiertos (intervalo abierto)
                ctx.fillStyle = '#fff'; // Relleno blanco
                ctx.strokeStyle = '#48bb78'; // Borde verde
                ctx.lineWidth = 2;
                
                // Círculo en 3
                ctx.beginPath();
                ctx.arc(solStart * scale, 0, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                
                // Círculo en 3.66
                ctx.beginPath();
                ctx.arc(solEnd * scale, 0, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                
                // Etiqueta de texto
                ctx.fillStyle = '#2f855a';
                ctx.font = 'bold 14px Oswald';
                ctx.fillText('Solución ]3, 11/3[', 3.2 * scale, -1.5 * scale);
            }
        }
    }
};