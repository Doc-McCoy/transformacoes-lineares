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
        draw_on_canvas(vetor);
    });
    vetores = novos_vetores;
    update_inputs();
}

function dilatacao() {
    clear_canvas();
    const valor = $('#valor-dilatacao').val();
    const direcao = $('#form-dilatacao').find('[name="eixo-dilatacao"]:checked').val();
    let novos_vetores = [];
    vetores.forEach(vetor => {
        if (direcao === 'vetor') {
            vetor = Vector.mul(vetor, parseFloat(valor));
        } else if (direcao === 'x') {
            vetor = new Vector(valor * vetor.x, vetor.y);
        } else if (direcao === 'y') {
            vetor = new Vector(vetor.x, valor * vetor.y);
        }
        novos_vetores.push(vetor);
        draw_on_canvas(vetor);
    });
    vetores = novos_vetores;
    update_inputs();
}

function cisalhamento() {
    clear_canvas();
    const valor = $('#form-cisalhamento').find('#valor-cisalhamento').val();
    const eixo = $('#form-cisalhamento').find('[name="eixo-cisalhamento"]:checked').val();
    let novos_vetores = [];
    vetores.forEach(vetor => {
        if (eixo === 'x') {
            let x = vetor.x + valor * vetor.y;
            vetor = new Vector(x, vetor.y);
        } else if (eixo === 'y') {
            let y = vetor.y + valor * vetor.x;
            vetor = new Vector(vetor.x, y);
        }
        novos_vetores.push(vetor);
        draw_on_canvas(vetor);
    });
    vetores = novos_vetores;
    update_inputs();
}

function rotacao() {
    // x’ = x . cos (q) – y . sen (q)
    // y’ = x . sen (q) + y . cos (q)
    clear_canvas();
    const valor_rotacao = parseFloat($('#graus').val());
    const valor_convertido = toRadians(valor_rotacao);
    // const eixo_rotacao_x = $('#centro-x').val();
    // const eixo_rotacao_y = $('#centro-y').val();
    let novos_vetores = [];
    vetores.forEach(vetor => {
        const x = vetor.x * Math.cos(valor_convertido) - vetor.y * Math.sin(valor_convertido);
        const y = vetor.x * Math.sin(valor_convertido) + vetor.y * Math.cos(valor_convertido);
        vetor_rotacionado = new Vector(x.toFixed(2), y.toFixed(2));
        novos_vetores.push(vetor_rotacionado);
        draw_on_canvas(vetor_rotacionado);
    });
    vetores = novos_vetores;
    update_inputs();
}
