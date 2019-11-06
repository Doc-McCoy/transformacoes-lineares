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

function draw_line(vector) {
    vetores = [];
    vetores.push(vector);
    clear_canvas();
    const vetor_corrigido = map_vector(vector);
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'blue';
    ctx.moveTo(250, 250);
    ctx.lineTo(vetor_corrigido.x, vetor_corrigido.y);
    ctx.stroke();
}

function update_inputs() {
    vetores.forEach(element => {
        $('#eixo-x').val(element.x);
        $('#eixo-y').val(element.y);
    });
}

function change_vectors_count() {
    let coluna = $('#inputs-vetores');
    let divs = coluna.find("[clone=1]");

    let quant_vetores = $('#quant-vetores').val();
    for (let i = 0; i < quant_vetores; i++) {
        let div = $('.vetor').clone();
        div.attr('clone', 1);
        coluna.append(div);
        div.show();
    }
}

function map(value, x1, y1, x2, y2) {
    return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
}

function map_vector(vector) {
    const min_coord = -10;
    const max_coord = 10;
    const x = map(vector.x, min_coord, max_coord, 0, canvas.width);
    const y = map(vector.y, max_coord, min_coord, 0, canvas.height);
    return new Vector(x, y);
}

function reflexao() {
    const eixo = $('#form-reflexao').find('[name="eixo-reflexao"]:checked').val();
    vetores.forEach(vetor => {
        if (eixo === 'x') {
            vetor = vetor.dot(new Vector(1, -1));
        } else if (eixo === 'y'){
            vetor = vetor.dot(new Vector(-1, 1));
        } else if (eixo === 'origem') {
            vetor = vetor.dot(new Vector(-1, -1));
        }
        draw_line(vetor);
    });
    update_inputs();
}

function dilatacao() {
    const valor = $('#valor-dilatacao').val();
    let texto = '';
    vetores.forEach(vetor => {
        const antigo_x = vetor.x;
        const antigo_y = vetor.y;
        vetor = Vector.mul(vetor, parseFloat(valor));
        draw_line(vetor);
        texto += `(${vetor.x}, ${vetor.y}) = ${valor} * (${antigo_x}, ${antigo_y})`;
    });
    $('#explicacao-dilatacao').text(texto);
    update_inputs();
}

$('#vetores').change(function() {
    let eixo_x = $('#eixo-x').val();
    let eixo_y = $('#eixo-y').val();
    let ponto = new Vector(eixo_x, eixo_y);
    draw_line(ponto);
});

// $('#quant-vetores').change(change_vectors_count);

$('#aplicar-reflexao').click(function() {
    reflexao();
    $('#explicacao').slideDown();
});

$('#aplicar-dilatacao').click(function() {
    dilatacao();
    $('#item-dilatacao').slideDown();
});

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let vetores = [];
draw_axes();
