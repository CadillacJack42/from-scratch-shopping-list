import { buyItem, getItems } from '../fetch-utils.js';

const listContainerEl = document.getElementById('list-container');


export const renderItem = (item) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('no-margin');

    if (item.bought) {
        itemDiv.classList.add('bought');
    }

    const itemQuantityEl = document.createElement('span');
    
    const itemNameEl = document.createElement('p');
    itemNameEl.classList.add('no-margin');
    
    itemQuantityEl.textContent = item.quantity;
    itemNameEl.textContent = item.item;


    itemDiv.append(itemQuantityEl, itemNameEl);

    return itemDiv;
};

export const displayShoppingListItems = async() => {
    const shoppingList = await getItems();
    console.log(shoppingList);

    listContainerEl.textContent = '';
    for (const item of shoppingList) {
        const itemEl = renderItem(item);

        listContainerEl.append(itemEl);
        listenerGenerator(itemEl, item.id);
    }
};

const listenerGenerator = (itemDiv, id) => {
    itemDiv.addEventListener('click', async() => {
        await buyItem(id);
        await displayShoppingListItems();
    });
};