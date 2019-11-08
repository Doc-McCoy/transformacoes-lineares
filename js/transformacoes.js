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
        draw_on_canvas(vetor);
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
            // texto += `(${vetor.x}, ${vetor.y}) = ${valor} * (${antigo_x}, ${antigo_y})`;
        } else if (direcao === 'x') {
            vetor = new Vector(valor * vetor.x, vetor.y);
        } else if (direcao === 'y') {
            vetor = new Vector(vetor.x, valor * vetor.y);

        }
        novos_vetores.push(vetor);
        draw_on_canvas(vetor);
    });
    // $('#explicacao-dilatacao').text(texto);
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
        draw_on_canvas(vetor_rotacionado);
    });
    // $('#explicacao-rotacao').text(texto);
    vetores = novos_vetores;
    update_inputs();
}
