// Estados
popularUf();

// aplicando a class de selected
const itensCollect = document.querySelectorAll(".itens-grid li");

for (const item of itensCollect) {
    item.addEventListener("click", handleSelectedItem);
}

const collectedItens = document.querySelector("input[name=itens]");

// array de itens de coleta selecionados.
let selectedItens = [];

function handleSelectedItem(event) {
    const item_li = event.target;

    item_li.classList.toggle("selected");

    const item_id = item_li.dataset.id;

    // verificando o item está selecionado.
    const itemSelected = selectedItens.findIndex(item => {
        const itemEncontrado = item == item_id;
        return itemEncontrado;
    });

    // se o item tiver selecionado.
    if (itemSelected >= 0) {
        // remove da seleção
        const filterItens = selectedItens.filter(item => {
            const itemDiferente = item != item_id;
            return itemDiferente;
        });

        selectedItens = filterItens;
    } else {
        // se não tiver selecionado, adiciona a selecao.
        selectedItens.push(item_id);
    }

    // atualiza o valor do input hidden com os itens.
    collectedItens.value = selectedItens;
}