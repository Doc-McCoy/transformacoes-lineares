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
        draw_on_canvas(vetor_a);
    }
    if (ponto_b_x && ponto_b_y) {
        const vetor_b = new Vector(ponto_b_x, ponto_b_y);
        vetores.push(vetor_b);
        draw_on_canvas(vetor_b);
    }
    if (ponto_c_x && ponto_c_y) {
        const vetor_c = new Vector(ponto_c_x, ponto_c_y);
        vetores.push(vetor_c);
        draw_on_canvas(vetor_c);
    }
}

function update_inputs() {
    $('#ponto-a').find('#eixo-x').val(vetores[0].x.toFixed(2));
    $('#ponto-a').find('#eixo-y').val(vetores[0].y.toFixed(2));
    $('#ponto-b').find('#eixo-x').val(vetores[1].x.toFixed(2));
    $('#ponto-b').find('#eixo-y').val(vetores[1].y.toFixed(2));
    $('#ponto-c').find('#eixo-x').val(vetores[2].x.toFixed(2));
    $('#ponto-c').find('#eixo-y').val(vetores[2].y.toFixed(2));
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
});

$('#aplicar-dilatacao').click(function() {
    dilatacao();
});

$('#aplicar-cisalhamento').click(function() {
    cisalhamento();
});

$('#aplicar-rotacao').click(function() {
    rotacao();
})

// Globals
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let vetores = [];
draw_axes();
