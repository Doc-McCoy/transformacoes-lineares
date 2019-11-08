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
}

function clear_canvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_axes();
}

/**
 * Função default que deve ser chamada sempre para desenhar
 * algo no canvas. Ela faz a diferença entre desenhar no
 * modo objeto ou no modo vetor.
 * @param {Vector} vetor
 */
function draw_on_canvas(vetor=null) {
    const modo_desenho = $('#modo-desenho').is(':checked');
    if (modo_desenho) {
        clear_canvas();
        draw_object();
    } else {
        draw_line_from_center(vetor);
    }
}

/**
 * Desenha um vetor que sai do centro do plano e termina
 * nas coordenadas passadas na variável.
 * @param {Vector} vector 
 */
function draw_line_from_center(vector) {
    const vetor_corrigido = map_vector(vector);
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'blue';
    ctx.moveTo(250, 250);
    ctx.lineTo(vetor_corrigido.x, vetor_corrigido.y);
    ctx.stroke();
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

function inputs_changed() {
    clear_canvas();
    vetores = [];
    const ponto_a_x = $('#ponto-a').find('#eixo-x').val();
    const ponto_a_y = $('#ponto-a').find('#eixo-y').val();
    const ponto_b_x = $('#ponto-b').find('#eixo-x').val();
    const ponto_b_y = $('#ponto-b').find('#eixo-y').val();
    const ponto_c_x = $('#ponto-c').find('#eixo-x').val();
    const ponto_c_y = $('#ponto-c').find('#eixo-y').val();
    if (ponto_a_x && ponto_a_y) {
        const vetor_a = new Vector(ponto_a_x, ponto_a_y);
        vetores.push(vetor_a);
        // draw_line_from_center(vetor_a);
        draw_on_canvas(vetor_a);
    }
    if (ponto_b_x && ponto_b_y) {
        const vetor_b = new Vector(ponto_b_x, ponto_b_y);
        vetores.push(vetor_b);
        // draw_line_from_center(vetor_b);
        draw_on_canvas(vetor_b);
    }
    if (ponto_c_x && ponto_c_y) {
        const vetor_c = new Vector(ponto_c_x, ponto_c_y);
        vetores.push(vetor_c);
        // draw_line_from_center(vetor_c);
        draw_on_canvas(vetor_c);
    }
}

function update_inputs() {
    $('#ponto-a').find('#eixo-x').val(vetores[0].x);
    $('#ponto-a').find('#eixo-y').val(vetores[0].y);
    $('#ponto-b').find('#eixo-x').val(vetores[1].x);
    $('#ponto-b').find('#eixo-y').val(vetores[1].y);
    $('#ponto-c').find('#eixo-x').val(vetores[2].x);
    $('#ponto-c').find('#eixo-y').val(vetores[2].y);
}

function map(value, x1, y1, x2, y2) {
    return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function map_vector(vector) {
    const min_coord = -10;
    const max_coord = 10;
    const x = map(vector.x, min_coord, max_coord, 0, canvas.width);
    const y = map(vector.y, max_coord, min_coord, 0, canvas.height);
    return new Vector(x, y);
}

function reflexao() {
    clear_canvas();
    const eixo = $('#form-reflexao').find('[name="eixo-reflexao"]:checked').val();
    let texto = '';
    let novos_vetores = [];
    vetores.forEach(vetor => {
        const antigo_x = vetor.x;
        const antigo_y = vetor.y;
        if (eixo === 'x') {
            vetor = vetor.dot(new Vector(1, -1));
            texto += `(${vetor.x}, ${vetor.y}) = (-1, 0) * (${antigo_x}, ${antigo_y})`;
        } else if (eixo === 'y'){
            vetor = vetor.dot(new Vector(-1, 1));
        } else if (eixo === 'origem') {
            vetor = vetor.dot(new Vector(-1, -1));
        }
        novos_vetores.push(vetor);
        draw_line_from_center(vetor);
    });
    vetores = novos_vetores;
    update_inputs();
}

function dilatacao() {
    clear_canvas();
    const valor = $('#valor-dilatacao').val();
    const direcao = $('#form-dilatacao').find('[name="eixo-dilatacao"]:checked').val();
    let texto = '';
    let novos_vetores = [];
    vetores.forEach(vetor => {
        const antigo_x = vetor.x;
        const antigo_y = vetor.y;
        if (direcao === 'vetor') {
            vetor = Vector.mul(vetor, parseFloat(valor));
            texto += `(${vetor.x}, ${vetor.y}) = ${valor} * (${antigo_x}, ${antigo_y})`;
        } else if (direcao === 'x') {

        } else if (direcao === 'y') {

        }
        novos_vetores.push(vetor);
        draw_line_from_center(vetor);
    });
    $('#explicacao-dilatacao').text(texto);
    vetores = novos_vetores;
    update_inputs();
}

function cisalhamento() {
    clear_canvas();
}

function rotacao() {
    // x’ = x . cos (q) – y . sen (q)
    // y’ = x . sen (q) + y . cos (q)
    clear_canvas();
    const valor_rotacao = parseFloat($('#graus').val());
    const valor_convertido = toRadians(valor_rotacao);
    const eixo_rotacao_x = $('#centro-x').val();
    const eixo_rotacao_y = $('#centro-y').val();
    let novos_vetores = [];
    vetores.forEach(vetor => {
        const antigo_x = vetor.x;
        const antigo_y = vetor.y;
        const x = vetor.x * Math.cos(valor_convertido) - vetor.y * Math.sin(valor_convertido);
        const y = vetor.x * Math.sin(valor_convertido) + vetor.y * Math.cos(valor_convertido);
        vetor_rotacionado = new Vector(x.toFixed(2), y.toFixed(2));
        novos_vetores.push(vetor_rotacionado);
        draw_line_from_center(vetor_rotacionado);
    });
    // $('#explicacao-rotacao').text(texto);
    vetores = novos_vetores;
    update_inputs();
}

$('#inputs-vetores').change(inputs_changed);

$('#modo-desenho').change(function() {
    if ($(this).is(':checked')) {
        draw_on_canvas();
    } else {
        inputs_changed();
    }
});

$('#aplicar-reflexao').click(function() {
    reflexao();
    $('#explicacao').slideDown();
});

$('#aplicar-dilatacao').click(function() {
    dilatacao();
    $('#item-dilatacao').slideDown();
});

$('#aplicar-rotacao').click(function() {
    rotacao();
    $('#item-rotacao').slideDown();
})

// Globals
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let vetores = [];
draw_axes();
