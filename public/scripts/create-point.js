function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => { return res.json() })
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
};

populateUFs();

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const ufValue = event.target.value;
    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    console.log(stateInput.value);

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
    citySelect.disabled = true;

    fetch(url).then((res) => { return res.json() })
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false;
        })
};



//Quando o UF for selecionado o Evento Listener chama a função getCities//PegarCidades
document.querySelector("select[name=uf]")
    .addEventListener("change", getCities);


//Itens de Coleta
//Pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
    item.addEventListener("click",handleSelectedItem);
}


const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event) {
    const itemLi = event.target;

    //adicionar ou remover uma classe com JS
    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id; 

    console.log('ITEM ID: ', itemId)




    //Verificar se existem itens sleecionados, se sim
    //pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId;
        return itemFound;
    });

    // se já estiver selecionado, tirar da seleção
    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId; // retorna Falso
            return itemIsDifferent;
        })

        selectedItems = filteredItems;
    }
    else {

        //se não estiver selecionado, adicionar à seleção
        selectedItems.push(itemId);
    }

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems;

    console.log("Itens Selecionados: ",selectedItems);
}