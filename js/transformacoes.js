function reflexao() {

    clear_canvas();
    const eixo = $('#form-reflexao').find('[name="eixo-reflexao"]:checked').val();
    let novos_vetores = [];

    vetores.forEach(vetor => {

        if (eixo === 'x') {
            vetor = vetor.dot(new Vector(1, -1));

        } else if (eixo === 'y'){
            vetor = vetor.dot(new Vector(-1, 1));

        } else if (eixo === 'origem') {
            vetor = vetor.dot(new Vector(-1, -1));
        }

        novos_vetores.push(vetor);
    });
    
    vetores = novos_vetores;
    draw_on_canvas();
    update_inputs();
}


function dilatacao() {

    clear_canvas();
    const alpha = $('#valor-dilatacao').val();
    const direcao = $('#form-dilatacao').find('[name="eixo-dilatacao"]:checked').val();
    let novos_vetores = [];

    vetores.forEach(vetor => {

        if (direcao === 'vetor') {
            vetor = Vector.mul(vetor, parseFloat(alpha));

        } else if (direcao === 'x') {
            vetor = new Vector(alpha * vetor.x, vetor.y);

        } else if (direcao === 'y') {
            vetor = new Vector(vetor.x, alpha * vetor.y);
        }

        novos_vetores.push(vetor);
    });
    
    vetores = novos_vetores;
    draw_on_canvas();
    update_inputs();
}


function cisalhamento() {
    clear_canvas();
    const alpha = $('#form-cisalhamento').find('#valor-cisalhamento').val();
    const eixo = $('#form-cisalhamento').find('[name="eixo-cisalhamento"]:checked').val();
    let novos_vetores = [];

    vetores.forEach(vetor => {

        if (eixo === 'x') {
            let x = vetor.x + alpha * vetor.y;
            vetor = new Vector(x, vetor.y);

        } else if (eixo === 'y') {
            let y = vetor.y + alpha * vetor.x;
            vetor = new Vector(vetor.x, y);
        }

        novos_vetores.push(vetor);
    });

    vetores = novos_vetores;
    draw_on_canvas();
    update_inputs();
}


function rotacao() {

    clear_canvas();
    const teta = parseFloat($('#graus').val());
    const teta_convertido = toRadians(teta);
    let novos_vetores = [];

    vetores.forEach(vetor => {

        const x = vetor.x * Math.cos(teta_convertido) - vetor.y * Math.sin(teta_convertido);
        const y = vetor.x * Math.sin(teta_convertido) + vetor.y * Math.cos(teta_convertido);

        vetor_rotacionado = new Vector(x.toFixed(2), y.toFixed(2));

        novos_vetores.push(vetor_rotacionado);
    });

    vetores = novos_vetores;
    draw_on_canvas();
    update_inputs();
}
