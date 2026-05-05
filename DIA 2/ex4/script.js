function add() {

    const container = document.getElementById("Cards");

    const novoCard = document.createElement("div");
    novoCard.className = "card";
    novoCard.style.width = "22rem";

    novoCard.innerHTML = `
        <img src="Lucas_Paqueta.webp" class="card-img-top" alt="Lucas Paqueta">

        <div class="card-body">
            <h5 class="card-title">
                Lucas Tolentino Coelho de Lima
                <span class="badge text-bg-secondary">8,8</span>
            </h5>

            <p class="card-text">
                <strong>Nascimento:</strong> 27/08/1997 <br>
                <strong>Altura:</strong> 1,80 m <br>
                <strong>Posição:</strong> Meio-campista
            </p>
        </div>
    `;

    container.appendChild(novoCard);
}