// responsavel por popular o select de estados.
function popularUf() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(estados => {
            for (let estado of estados) {
                ufSelect.innerHTML += `<option value="${estado.id}">${estado.nome}</option>`
            }
        });
}

// responsavel por popular o select de cidade de acordo com o estado escolhido.
function popularCidade(event) {
    const cidadeSelect = document.querySelector("[name=cidade]");
    const estadoInput = document.querySelector("[name=estado]");

    const uf = event.target.value;

    const indexOfSelectedCidade = event.target.selectedIndex;
    estadoInput.value = event.target.options[indexOfSelectedCidade].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`;
    
    // deixa o campo com option default e disabled
    cidadeSelect.innerHTML = "<option value>Selecione a cidade</option>";
    cidadeSelect.disabled = true;

    fetch(url)
        .then(res => res.json())
        .then(cidades => {
            for (const cidade of cidades) {
                cidadeSelect.innerHTML += `<option value="${cidade.nome}">${cidade.nome}</option>`
            }
            cidadeSelect.disabled = false;
        });
}
// executa a funcao para popular as cidades de acordo com o estado.
document.querySelector("select[name=uf]").addEventListener("change", popularCidade);