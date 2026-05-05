function mostrartabela() {
  try {
    const container = document.getElementById("container");

    if (container.querySelector("img")) {
      alert("A imagem já foi inserida!");
      return;
    }

    const img = document.createElement("img");
    img.src = "Tabela_Jogos.png"; 
    img.alt = "Imagem inserida via JavaScript";

    container.appendChild(img);
  } catch (error) {
    console.error("Erro ao inserir imagem:", error);
  }
}


