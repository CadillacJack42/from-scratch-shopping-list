import { checkAuth, createItem, deleteAllItems, logout } from '../fetch-utils.js';
import { displayShoppingListItems } from '../render-utils/render.js';
import { countDown } from '../timer/timer.js';

const addItemForm = document.getElementById('add-item');

const clearList = document.getElementById('clear-all');

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() => {
    displayShoppingListItems();
});

addItemForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    const newRow = new FormData(addItemForm);
    const quantity = newRow.get('quantity');
    const name = newRow.get('name');
    const expiry = newRow.get('date');

    const item = {
        quantity,
        item: name,
        due_date: expiry
    };
    await createItem(item);
    addItemForm.reset();
    await displayShoppingListItems();
});

clearList.addEventListener('click', async() => {
    await deleteAllItems();
    await displayShoppingListItems();
});

