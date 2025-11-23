/* =========================================
   DATOS DEL EJERCICIO 2: GEOMETRÍA ANALÍTICA
   ========================================= */

// 1. SEGURIDAD: Inicialización del contenedor global
window.DATOS_EJERCICIOS = window.DATOS_EJERCICIOS || {};

// 2. DEFINICIÓN DEL EJERCICIO
window.DATOS_EJERCICIOS[2] = {
 titulo: "2. Puntos, Perímetro y Distancia a Recta",
 
 enunciado: `
        Considere los puntos $A(-1,1)$, $B(-4,5)$, $C(-1,7)$ y $D(-\\frac{5}{2}, k)$.
        <br><br>
        <strong>a.</strong> Calcule el perímetro del triángulo $\\Delta ABC$.
        <br>
        <strong>b.</strong> Determine el valor de $k$ para que la distancia del punto $D$ a la recta que pasa por $B$ y $C$ sea $\\frac{12}{\\sqrt{13}}$.
    `,
 
 // Configuración de la cámara
 configVista: {
  scale: 35, // Zoom adecuado para ver los puntos
  offsetX: 100, // Movemos la vista a la derecha porque los puntos son negativos en X
  offsetY: 150 // Bajamos la vista porque los puntos son altos en Y (hasta 10)
 },
 
 // 3. PASOS DE RESOLUCIÓN
 pasos: [
  // --- PARTE A: PERÍMETRO ---
  {
   titulo: "A. Representación de Puntos",
   contenido: `
                <p>Primero, ubicamos los puntos conocidos en el plano cartesiano:</p>
                <ul>
                    <li>$A(-1, 1)$</li>
                    <li>$B(-4, 5)$</li>
                    <li>$C(-1, 7)$</li>
                </ul>
                <p>Al unirlos formamos el triángulo $\\Delta ABC$. Para hallar el perímetro, necesitamos la longitud de cada lado usando la fórmula de distancia: $d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$.</p>
            `
  },
  {
   titulo: "A. Cálculo de Lados",
   contenido: `
                <p>Calculamos las distancias:</p>
                <ul>
                    <li><strong>Lado AC (Vertical):</strong> Como la coordenada $x$ es igual ($-1$), la distancia es la diferencia de $y$: $|7 - 1| = 6$.</li>
                    <li><strong>Lado AB:</strong> $d = \\sqrt{(-4 - (-1))^2 + (5 - 1)^2} = \\sqrt{(-3)^2 + 4^2} = \\sqrt{25} = 5$.</li>
                    <li><strong>Lado BC:</strong> $d = \\sqrt{(-1 - (-4))^2 + (7 - 5)^2} = \\sqrt{3^2 + 2^2} = \\sqrt{9+4} = \\sqrt{13}$.</li>
                </ul>
            `
  },
  {
   titulo: "A. Perímetro Total",
   contenido: `
                <p>El perímetro ($P$) es la suma de todos los lados:</p>
                $$ P = d(A,C) + d(A,B) + d(B,C) $$
                $$ P = 6 + 5 + \\sqrt{13} $$
                $$ P = 11 + \\sqrt{13} \\approx 14.60 \\text{ u} $$
            `
  },
  
  // --- PARTE B: DISTANCIA PUNTO A RECTA ---
  {
   titulo: "B. Ecuación de la Recta BC",
   contenido: `
                <p>Para la parte b, necesitamos la distancia del punto $D(-2.5, k)$ a la recta que pasa por $B$ y $C$. Primero hallamos la ecuación de esa recta.</p>
                <p>Pendiente ($m$): $$ m = \\frac{7-5}{-1 - (-4)} = \\frac{2}{3} $$</p>
                <p>Ecuación Punto-Pendiente usando $C(-1,7)$: $$ y - 7 = \\frac{2}{3}(x + 1) $$</p>
                <p>Pasamos a Ecuación General ($Ax + By + C = 0$):</p>
                $$ 3(y - 7) = 2(x + 1) \\Rightarrow 3y - 21 = 2x + 2 $$
                $$ 2x - 3y + 23 = 0 $$
            `
  },
  {
   titulo: "B. Fórmula de Distancia",
   contenido: `
                <p>Usamos la fórmula de distancia de un punto $(x_0, y_0)$ a una recta $Ax+By+C=0$:</p>
                $$ d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}} $$
                <p>Sabemos que $d = \\frac{12}{\\sqrt{13}}$, el punto es $D(-\\frac{5}{2}, k)$ y la recta $2x - 3y + 23 = 0$. Sustituimos:</p>
                $$ \\frac{12}{\\sqrt{13}} = \\frac{|2(-2.5) - 3(k) + 23|}{\\sqrt{2^2 + (-3)^2}} $$
                $$ \\frac{12}{\\sqrt{13}} = \\frac{|-5 - 3k + 23|}{\\sqrt{13}} $$
            `
  },
  {
   titulo: "B. Despeje del Valor Absoluto",
   contenido: `
                <p>Cancelamos $\\sqrt{13}$ en ambos lados y simplificamos:</p>
                $$ 12 = |18 - 3k| $$
                <p>Esto nos da dos posibles casos (ecuaciones):</p>
                <ol>
                    <li>$18 - 3k = 12 \\Rightarrow -3k = -6 \\Rightarrow k = 2$</li>
                    <li>$18 - 3k = -12 \\Rightarrow -3k = -30 \\Rightarrow k = 10$</li>
                </ol>
            `
  },
  {
   titulo: "B. Solución Final y Gráfica",
   contenido: `
                <p>Hemos encontrado dos posibles ubicaciones para el punto D que cumplen la condición de distancia.</p>
                <p><strong>Soluciones:</strong></p>
                $$ k_1 = 2 \\quad \\text{y} \\quad k_2 = 10 $$
                <p>En la gráfica, verás los puntos $D_1(-2.5, 2)$ y $D_2(-2.5, 10)$ y su distancia perpendicular a la recta extendida $BC$.</p>
            `
  }
 ],
 
 // 4. RENDERIZADO GRÁFICO
 renderGrafico: (ctx, scale, utils, step) => {
  
  // Coordenadas
  const A = { x: -1, y: 1 };
  const B = { x: -4, y: 5 };
  const C = { x: -1, y: 7 };
  
  // Puntos Solución D
  const D1 = { x: -2.5, y: 2 };
  const D2 = { x: -2.5, y: 10 };
  
  // PASO 0+: Dibujar Triángulo ABC
  if (step >= 0) {
   // Lados
   utils.drawLine(ctx, A.x, A.y, B.x, B.y, '#2b6cb0', 2);
   utils.drawLine(ctx, B.x, B.y, C.x, C.y, '#2b6cb0', 2);
   utils.drawLine(ctx, C.x, C.y, A.x, A.y, '#2b6cb0', 2);
   
   // Puntos
   utils.drawPoint(ctx, A.x, A.y, '#2b6cb0', 'A');
   utils.drawPoint(ctx, B.x, B.y, '#2b6cb0', 'B');
   utils.drawPoint(ctx, C.x, C.y, '#2b6cb0', 'C');
  }
  
  // PASO 1+: Etiquetas de distancias (Opcional, visual)
  if (step >= 1 && step < 3) {
   // Texto simple cerca de los lados
   ctx.fillStyle = '#4a5568';
   ctx.font = '12px Oswald';
   ctx.fillText('d=5', -2.5 * scale, -3 * scale); // Lado AB aprox
   ctx.fillText('d=6', -0.8 * scale, -4 * scale); // Lado AC
  }
  
  // PASO 3+: Dibujar la Recta Infinita BC
  if (step >= 3) {
   // Ecuación: y = (2/3)x + 23/3
   // Dibujamos una línea larga que pase por B y C
   const m = 2 / 3;
   const b_intercept = 23 / 3;
   
   const xStart = -10;
   const xEnd = 5;
   const yStart = m * xStart + b_intercept;
   const yEnd = m * xEnd + b_intercept;
   
   utils.drawLine(ctx, xStart, yStart, xEnd, yEnd, '#e53e3e', 1, true); // Rojo discontinuo
   
   // Etiqueta de la recta
   ctx.fillStyle = '#e53e3e';
   ctx.fillText('Recta BC', -6 * scale, -4 * scale);
  }
  
  // PASO 6: Dibujar los puntos D y la distancia
  if (step >= 6) {
   // Dibujar D1
   utils.drawPoint(ctx, D1.x, D1.y, '#ed8936', 'D1 (k=2)');
   
   // Dibujar D2
   utils.drawPoint(ctx, D2.x, D2.y, '#ed8936', 'D2 (k=10)');
   
   // Línea de distancia (Perpendicular a la recta)
   // La distancia visual es la proyección.
   // Para efectos visuales simples, dibujamos una línea desde D a la recta.
   // La recta es 2x - 3y + 23 = 0.
   
   // Proyección de D1 sobre la recta:
   // (Cálculo aproximado para dibujo): (-3.88, 5.07) aprox
   // Simplemente dibujamos una línea visual corta indicando la distancia
   
   ctx.strokeStyle = '#ed8936';
   ctx.lineWidth = 1;
   ctx.setLineDash([2, 2]);
   
   // Línea desde D1 a la recta (aprox visual)
   ctx.beginPath();
   ctx.moveTo(D1.x * scale, -D1.y * scale);
   ctx.lineTo(-3.8 * scale, -5.1 * scale); // Punto en la recta cercano
   ctx.stroke();
   
   // Línea desde D2 a la recta
   ctx.beginPath();
   ctx.moveTo(D2.x * scale, -D2.y * scale);
   ctx.lineTo(-1.2 * scale, -6.8 * scale); // Punto en la recta cercano
   ctx.stroke();
   
   ctx.setLineDash([]);
  }
 }
};