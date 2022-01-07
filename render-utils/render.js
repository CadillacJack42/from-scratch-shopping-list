import { getItems } from '../fetch-utils.js';

const listContainerEl = document.getElementById('list-container');


export const renderItem = (item) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('no-margin');
    const itemQuantityEl = document.createElement('span');
    const itemNameEl = document.createElement('p');
    
    itemQuantityEl.textContent = item.quantity;

    itemNameEl.textContent = item.item;
    itemNameEl.classList.add('no-margin');

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
    }
};