/* =========================================
   DATOS DEL EJERCICIO 4: REGIONES EN EL PLANO
   ========================================= */

// 1. SEGURIDAD
window.DATOS_EJERCICIOS = window.DATOS_EJERCICIOS || {};

// 2. DEFINICIÓN
window.DATOS_EJERCICIOS[4] = {
    titulo: "4. Región Definida por Desigualdades",
    
    enunciado: `
        Dibuje la región del plano $R$ definida por el siguiente sistema de inecuaciones:
        <br>
        $$ R \\begin{cases} 9x^2 + 25y^2 \\leq 225 \\\\ y^2 \\geq 4x - 8 \\\\ y^2 \\geq -4x - 8 \\\\ x^2 + y^2 > 1 \\end{cases} $$
    `,

    // Configuración de la cámara
    configVista: {
        scale: 35,      // Escala estándar
        offsetX: 0,     // Centrado
        offsetY: 0
    },

    // 3. PASOS DE RESOLUCIÓN
    pasos: [
        // --- PASO 0: LA ELIPSE ---
        {
            titulo: "1. La Elipse (Contenedor)",
            contenido: `
                <p>Analizamos la primera inecuación: $9x^2 + 25y^2 \\leq 225$.</p>
                <p>Dividimos todo por 225 para obtener la forma canónica:</p>
                $$ \\frac{x^2}{25} + \\frac{y^2}{9} \\leq 1 $$
                <p>Es una <strong>elipse horizontal</strong> centrada en $(0,0)$.</p>
                <ul>
                    <li>Semieje mayor $a = \\sqrt{25} = 5$ (en X).</li>
                    <li>Semieje menor $b = \\sqrt{9} = 3$ (en Y).</li>
                </ul>
                <p>El signo $\\leq$ indica que la región es todo el <strong>interior</strong> de la elipse.</p>
            `
        },
        // --- PASO 1: PARÁBOLA DERECHA ---
        {
            titulo: "2. Parábola Derecha",
            contenido: `
                <p>Inecuación: $y^2 \\geq 4x - 8$.</p>
                <p>Factorizamos: $y^2 \\geq 4(x - 2)$.</p>
                <p>Es una parábola con vértice en $V(2,0)$ que abre hacia la derecha.</p>
                <p><strong>Prueba de región:</strong> Probamos el punto $(0,0)$.</p>
                $$ 0^2 \\geq 4(0) - 8 \\Rightarrow 0 \\geq -8 \\quad (Verdadero) $$
                <p>Como el origen cumple, sombreamos la región que contiene al origen (a la <strong>izquierda</strong> de la curva).</p>
            `
        },
        // --- PASO 2: PARÁBOLA IZQUIERDA ---
        {
            titulo: "3. Parábola Izquierda",
            contenido: `
                <p>Inecuación: $y^2 \\geq -4x - 8$.</p>
                <p>Factorizamos: $y^2 \\geq -4(x + 2)$.</p>
                <p>Es una parábola con vértice en $V(-2,0)$ que abre hacia la izquierda.</p>
                <p><strong>Prueba de región:</strong> Probamos el punto $(0,0)$.</p>
                $$ 0^2 \\geq -4(0) - 8 \\Rightarrow 0 \\geq -8 \\quad (Verdadero) $$
                <p>Sombreamos la región que contiene al origen (a la <strong>derecha</strong> de la curva).</p>
            `
        },
        // --- PASO 3: EL CÍRCULO (AGUJERO) ---
        {
            titulo: "4. El Círculo (Exclusión)",
            contenido: `
                <p>Inecuación: $x^2 + y^2 > 1$.</p>
                <p>Es un círculo de radio $r=1$ centrado en el origen.</p>
                <p>El signo $>$ (mayor estricto) indica que la solución está <strong>fuera</strong> del círculo. El borde va punteado.</p>
                <p>Esto creará un "agujero" en el centro de nuestra figura.</p>
            `
        },
        // --- PASO 4: INTERSECCIÓN FINAL ---
        {
            titulo: "5. Región Resultante R",
            contenido: `
                <p>La región $R$ es la intersección de todas las condiciones anteriores:</p>
                <ol>
                    <li>Dentro de la elipse.</li>
                    <li>A la izquierda de la parábola derecha.</li>
                    <li>A la derecha de la parábola izquierda.</li>
                    <li>Fuera del círculo central.</li>
                </ol>
                <p>El resultado es la zona verde oscura mostrada en la gráfica.</p>
            `
        }
    ],

    // 4. RENDERIZADO GRÁFICO AVANZADO
    renderGrafico: (ctx, scale, utils, step) => {
        
        // --- DEFINICIÓN DE FIGURAS ---
        
        // 1. Elipse: x^2/25 + y^2/9 = 1
        const drawEllipse = (fill = false) => {
            ctx.beginPath();
            ctx.ellipse(0, 0, 5 * scale, 3 * scale, 0, 0, Math.PI * 2);
            if (fill) {
                ctx.fillStyle = 'rgba(66, 153, 225, 0.2)'; // Azul suave
                ctx.fill();
            }
            ctx.strokeStyle = '#2b6cb0';
            ctx.lineWidth = 2;
            ctx.setLineDash([]);
            ctx.stroke();
        };

        // 2. Parábola Derecha: x = y^2/4 + 2
        // Región válida: x <= y^2/4 + 2
        const drawParabolaRight = (fill = false) => {
            ctx.beginPath();
            // Dibujamos iterando Y para suavidad
            const limitY = 4; // Un poco más que la altura de la elipse (3)
            let first = true;
            for (let y = -limitY; y <= limitY; y += 0.1) {
                const x = (y*y)/4 + 2;
                if (first) { ctx.moveTo(x*scale, -y*scale); first = false; }
                else { ctx.lineTo(x*scale, -y*scale); }
            }
            ctx.strokeStyle = '#ed8936'; // Naranja
            ctx.lineWidth = 2;
            ctx.stroke();

            if (fill) {
                // Cerrar el path hacia la izquierda para sombrear
                ctx.lineTo(-10*scale, -limitY*scale);
                ctx.lineTo(-10*scale, limitY*scale);
                ctx.closePath();
                ctx.fillStyle = 'rgba(237, 137, 54, 0.15)';
                ctx.fill();
            }
        };

        // 3. Parábola Izquierda: x = -y^2/4 - 2
        // Región válida: x >= -y^2/4 - 2
        const drawParabolaLeft = (fill = false) => {
            ctx.beginPath();
            const limitY = 4;
            let first = true;
            for (let y = -limitY; y <= limitY; y += 0.1) {
                const x = -(y*y)/4 - 2;
                if (first) { ctx.moveTo(x*scale, -y*scale); first = false; }
                else { ctx.lineTo(x*scale, -y*scale); }
            }
            ctx.strokeStyle = '#ed8936';
            ctx.lineWidth = 2;
            ctx.stroke();

            if (fill) {
                // Cerrar el path hacia la derecha para sombrear
                ctx.lineTo(10*scale, -limitY*scale);
                ctx.lineTo(10*scale, limitY*scale);
                ctx.closePath();
                ctx.fillStyle = 'rgba(237, 137, 54, 0.15)';
                ctx.fill();
            }
        };

        // 4. Círculo: x^2 + y^2 = 1
        const drawCircle = (fill = false) => {
            ctx.beginPath();
            ctx.arc(0, 0, 1 * scale, 0, Math.PI * 2);
            if (fill) {
                // Sombrear AFUERA es difícil visualmente paso a paso, 
                // así que sombreamos adentro en rojo para indicar "zona prohibida"
                ctx.fillStyle = 'rgba(229, 62, 62, 0.3)';
                ctx.fill();
            }
            ctx.strokeStyle = '#e53e3e';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]); // Punteado
            ctx.stroke();
            ctx.setLineDash([]);
        };


        // --- LÓGICA DE PASOS ---

        // Paso 0: Elipse
        if (step === 0) {
            drawEllipse(true);
            // Etiquetas
            utils.drawPoint(ctx, 5, 0, '#2b6cb0', 'V(5,0)');
            utils.drawPoint(ctx, 0, 3, '#2b6cb0', 'b(0,3)');
        }

        // Paso 1: Añadir Parábola Derecha
        if (step === 1) {
            drawEllipse(false); // Solo contorno
            drawParabolaRight(true);
            utils.drawPoint(ctx, 2, 0, '#ed8936', 'V(2,0)');
        }

        // Paso 2: Añadir Parábola Izquierda
        if (step === 2) {
            drawEllipse(false);
            drawParabolaRight(false);
            drawParabolaLeft(true);
            utils.drawPoint(ctx, -2, 0, '#ed8936', 'V(-2,0)');
        }

        // Paso 3: Añadir Círculo
        if (step === 3) {
            drawEllipse(false);
            drawParabolaRight(false);
            drawParabolaLeft(false);
            drawCircle(true); // Relleno rojo de advertencia
        }

        // PASO 4: INTERSECCIÓN FINAL (MAGIA DE CANVAS)
        if (step === 4) {
            ctx.save();

            // 1. Definir la región de recorte (Clipping Region)
            // Queremos pintar SOLO donde coinciden todas.
            
            // A. Recortar por la Elipse
            ctx.beginPath();
            ctx.ellipse(0, 0, 5 * scale, 3 * scale, 0, 0, Math.PI * 2);
            ctx.clip(); // A partir de ahora solo se pinta dentro de la elipse

            // B. Recortar por Parábola Derecha (x <= y^2/4 + 2)
            ctx.beginPath();
            ctx.moveTo(10*scale, -10*scale); // Empezar fuera
            // Dibujar borde parábola
            for (let y = -4; y <= 4; y += 0.1) {
                const x = (y*y)/4 + 2;
                ctx.lineTo(x*scale, -y*scale);
            }
            // Cerrar por la izquierda (la zona válida)
            ctx.lineTo(-10*scale, -4*scale);
            ctx.lineTo(-10*scale, 4*scale);
            ctx.closePath();
            // Nota: En realidad queremos la intersección. 
            // Visualmente es más fácil dibujar la forma compleja directamente.
            
            // ESTRATEGIA ALTERNATIVA MÁS ROBUSTA PARA INTERSECCIÓN VISUAL:
            // 1. Definir Path de la Elipse.
            // 2. Definir Path del Círculo (dirección opuesta para hueco).
            // 3. Usar 'evenodd' para llenar.
            // 4. Pero tenemos las parábolas...
            
            // Vamos a usar la lógica de píxeles "matemática" simulada con clip
            // Reiniciamos el clip para hacerlo bien
            ctx.restore(); 
            ctx.save();

            // 1. Clip Elipse
            ctx.beginPath();
            ctx.ellipse(0, 0, 5 * scale, 3 * scale, 0, 0, Math.PI * 2);
            ctx.clip();

            // 2. Clip Parábola Derecha (Lado Izquierdo válido)
            ctx.beginPath();
            ctx.moveTo(-10*scale, -10*scale); // Fondo izquierda arriba
            for (let y = -4; y <= 4; y += 0.1) ctx.lineTo(((y*y)/4 + 2)*scale, -y*scale);
            ctx.lineTo(-10*scale, 4*scale); // Fondo izquierda abajo
            ctx.closePath();
            ctx.clip();

            // 3. Clip Parábola Izquierda (Lado Derecho válido)
            ctx.beginPath();
            ctx.moveTo(10*scale, -10*scale); // Fondo derecha arriba
            for (let y = -4; y <= 4; y += 0.1) ctx.lineTo((-(y*y)/4 - 2)*scale, -y*scale);
            ctx.lineTo(10*scale, 4*scale); // Fondo derecha abajo
            ctx.closePath();
            ctx.clip();

            // 4. EL AGUJERO DEL CÍRCULO
            // Para hacer un agujero en un clip, usamos la regla 'evenodd' o dibujamos un rectángulo gigante con un agujero circular.
            ctx.beginPath();
            // Rectángulo gigante que cubre todo
            ctx.rect(-10*scale, -10*scale, 20*scale, 20*scale);
            // Círculo en dirección contraria (o simplemente un sub-path)
            ctx.arc(0, 0, 1 * scale, 0, Math.PI * 2, true); 
            ctx.closePath();
            
            // Rellenamos la región final
            ctx.fillStyle = '#48bb78'; // Verde Solución
            ctx.fill('evenodd'); // La regla evenodd crea el hueco del círculo

            ctx.restore(); // Restaurar contexto para dibujar bordes encima

            // DIBUJAR BORDES FINALES ENCIMA
            drawEllipse();
            drawParabolaRight();
            drawParabolaLeft();
            drawCircle();
        }
    }
};