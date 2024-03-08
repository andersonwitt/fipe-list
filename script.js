const marcaSelect = document.getElementById("marca-select");
const modeloList = document.getElementById("modelo-list");

async function loadMarcas() {
  const response = await fetch(
    "https://parallelum.com.br/fipe/api/v1/carros/marcas"
  );
  let options = `<option value="">Selecione a marca</option>`;

  if (response.ok) {
    const obj = await response.json();
    if (obj?.length) {
      obj.forEach((item) => {
        options += `<option value="${item.codigo}">${item.nome}</option>`;
      });

      marcaSelect.innerHTML = options;
    }
  }
}

async function loadModelos(marcaId) {
  const response = await fetch(
    `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaId}/modelos`
  );
  let items = "<li>Modelos desconhecidos</li>";

  if (response.ok) {
    const obj = await response.json();
    if (obj?.modelos?.length) {
      items = "";
      obj.modelos.forEach((item) => {
        items += `<li>${item.nome}</li>`;
      });

      modeloList.innerHTML = items;
    }
  }
}

window.addEventListener("load", () => {
  loadMarcas();

  marcaSelect.addEventListener("change", (e) => {
    const value = e.target.value;
    if (value) {
      loadModelos(value);
    }
  });
});
