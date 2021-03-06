function draw_axes() {
    // Desenhar eixo X
    ctx.beginPath();
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 1;
    ctx.moveTo(50, 250);
    ctx.lineTo(450, 250);
    ctx.stroke();
    // Desenhar eixo Y
    ctx.beginPath();
    ctx.moveTo(250, 50);
    ctx.lineTo(250, 450);
    ctx.stroke();

    draw_markers_on_x();
    draw_markers_on_y();
}

function draw_markers_on_x() {
    for (let i = -8; i < 9; i++) {
        if (i === 0) continue;
        ctx.beginPath();
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 1;

        let vetor_a = new Vector(i, -0.3);
        let vetor_b = new Vector(i, 0.3);
        let point_a = map_vector(vetor_a);
        let point_b = map_vector(vetor_b);
        ctx.moveTo(point_a.x, point_a.y);
        ctx.lineTo(point_b.x, point_b.y);
        ctx.stroke();
    }
}

function draw_markers_on_y() {
    for (let i = -8; i < 9; i++) {
        if (i === 0) continue;
        ctx.beginPath();
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 1;

        let vetor_a = new Vector(-0.3, i);
        let vetor_b = new Vector(0.3, i);
        let point_a = map_vector(vetor_a);
        let point_b = map_vector(vetor_b);
        ctx.moveTo(point_a.x, point_a.y);
        ctx.lineTo(point_b.x, point_b.y);
        ctx.stroke();
    }
}

function clear_canvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_axes();
}

/**
 * Função default que deve ser chamada sempre para desenhar
 * algo no canvas. Ela faz a diferença entre desenhar no
 * modo objeto ou no modo vetor.
 */
function draw_on_canvas() {
    const modo_desenho = $('#modo-desenho').is(':checked');
    if (modo_desenho) {
        clear_canvas();
        draw_object();
    } else {
        vetores.forEach(vetor => {
            draw_line_from_center(vetor);
        });
    }
}

/**
 * Desenha um vetor que sai do centro do plano e termina
 * nas coordenadas passadas na variável.
 * @param {Vector} vector 
 */
function draw_line_from_center(vector) {
    const vetor_corrigido = map_vector(vector);
    if (vector.x != 0 || vector.y != 0) {
        canvas_arrow(250, 250, vetor_corrigido.x, vetor_corrigido.y);
    }
}

/**
 * Desenha uma forma triangular com os vetores do array 'vetores'.
 * Necessita de no mínimo 3 pontos definidos para isso.
 * Também funciona para qualquer forma com mais de 2 pontos.
 */
function draw_object() {
    if (vetores.length > 2) {
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'blue';
        const ponto_a = map_vector(vetores[0]);
        ctx.moveTo(ponto_a.x, ponto_a.y);
        for (let i = 1; i < vetores.length; i++) {
            let ponto_x = map_vector(vetores[i]);
            ctx.lineTo(ponto_x.x, ponto_x.y);
        }
        ctx.lineTo(ponto_a.x, ponto_a.y);
        ctx.stroke();
    }
}

function map_vector(vector) {
    const min_coord = -10;
    const max_coord = 10;
    const x = map(vector.x, min_coord, max_coord, 0, canvas.width);
    const y = map(vector.y, max_coord, min_coord, 0, canvas.height);
    return new Vector(x, y);
}

function canvas_arrow(fromx, fromy, tox, toy) {
    const headlen = 15;
    const dx = tox - fromx;
    const dy = toy - fromy;
    const angle = Math.atan2(dy, dx);
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'blue';
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
}
