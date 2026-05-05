function trocarGrupos() {
    document.getElementById("grupoA").innerHTML = `
        <h2>Grupo D</h2>

        <h3>Seleções</h3>
        <ul>
            <li>Estados Unidos</li>
            <li>Paraguai</li>
            <li>Austrália</li>
            <li>Turquia</li>
        </ul>

        <details>
            <summary>Saiba Mais</summary>
            <p>Os EUA jogam em casa, vantagem histórica em Copas.</p>
            <p>Austrália enfrenta frequentemente seleções sul-americanas em torneios.</p>
        </details>
    `;

    document.getElementById("grupoB").innerHTML = `
        <h2>Grupo E</h2>

        <h3>Seleções</h3>
        <ul>
            <li>Alemanha</li>
            <li>Equador</li>
            <li>Costa do Marfin</li>
            <li>Curaçao</li>
        </ul>

        <details>
            <summary>Saiba Mais</summary>
            <p>Alemanha costuma dominar fases de grupos.</p>
            <p>Equador e Costa do Marfim têm estilos físicos semelhantes.</p>
        </details>
    `;

    document.getElementById("grupoC").innerHTML = `
        <h2>Grupo F</h2>

        <h3>Seleções</h3>
        <ul>
            <li>Holanda</li>
            <li>Japão</li>
            <li>Tunísia</li>
            <li>Suécia</li>
        </ul>

        <details>
            <summary>Saiba Mais</summary>
            <p>Brasil, Marrocos e Escócia já dividiram grupo em 1998.</p>
            <p>Brasil nunca perdeu para a Escócia em Copas.</p>
        </details>
    `;
}