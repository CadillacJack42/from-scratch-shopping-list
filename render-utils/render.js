

export const renderItem = (item) => {
    const itemDiv = document.createElement('div');
    const itemQuantityEl = document.createElement('span');
    const itemNameEl = document.createElement('p');
    
    itemQuantityEl.textContent = item.quantity;
    itemNameEl.textContent = item.item;

    itemDiv.append(itemQuantityEl, itemNameEl);

    return itemDiv;
};

export const displayShoppingListItems = async() => {
    
    return checkError(response);
};