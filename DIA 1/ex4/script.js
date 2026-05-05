function revelar() {

    const nome = document.getElementById('Nome');
    const dataNas = document.getElementById('Data_Nas');
    const altura = document.getElementById('Altura');
    const posicao = document.getElementById('Posicao');
    const rank = document.getElementById('Rank');
    const imagem = document.querySelector('.card-img-top');

    imagem.src = '_vinicius_junior.png';
    imagem.alt = 'Vinícius Júnior';

    nome.innerHTML = 'Vinícius José Paixão de Oliveira Júnior <span id="Rank" class="badge text-bg-success">9,5</span>';
    nome.classList.remove('placeholder-glow');

    const cardText = document.querySelector('.card-text');
    cardText.classList.remove('placeholder-glow');

    dataNas.textContent = 'Nascimento: 12/07/2000 (25 anos)';
    dataNas.classList.remove('placeholder', 'col-4');

    altura.textContent = 'Altura: 1,76 m';
    altura.classList.remove('placeholder', 'col-4');

    posicao.textContent = 'Posição: Ponta-esquerda / Atacante';
    posicao.classList.remove('placeholder', 'col-6');
}