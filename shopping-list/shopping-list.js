import { checkAuth, createItem, logout } from '../fetch-utils.js';
import { displayShoppingListItems } from '../render-utils/render.js';

const addItemForm = document.getElementById('add-item');
// const itemQuantity = document.getElementById('item-quantity');
// const itemName = document.getElementById('item-name');

// const listContainerEl = document.getElementById('list-container');

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

addItemForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    const newRow = new FormData(addItemForm);
    const quantity = newRow.get('quantity');
    const name = newRow.get('name');

    const item = {
        quantity,
        item: name,
    };
    await createItem(item);
    addItemForm.reset();
    await displayShoppingListItems();
});
displayShoppingListItems();

