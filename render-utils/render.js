import { buyItem, getItems, removeSingleItem } from '../fetch-utils.js';

const listContainerEl = document.getElementById('list-container');


export const renderItem = (item) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('no-margin');

    if (item.bought) {
        itemDiv.classList.add('bought');
    } else {
        itemDiv.classList.remove('bought');
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

    listContainerEl.textContent = '';
    for (const item of shoppingList) {
        const itemEl = renderItem(item);

        const itemDelBtn = document.createElement('button');
        itemDelBtn.textContent = 'Remove Item';

        const itemContainerEl = document.createElement('div');
        itemContainerEl.classList.add('item-block');
        itemContainerEl.append(itemEl, itemDelBtn);

        listContainerEl.append(itemContainerEl);
        listenerGenerator(itemEl, item);
        removeItem(itemDelBtn, item);
    }
};

const listenerGenerator = (itemDiv, item) => {
    itemDiv.addEventListener('click', async() => {
        await buyItem(item);
        await displayShoppingListItems();
    });
};

const removeItem = async(itemDelBtn, item) => {
    itemDelBtn.addEventListener('click', async() => {
        await removeSingleItem(item);
        await displayShoppingListItems();
    });
    
};