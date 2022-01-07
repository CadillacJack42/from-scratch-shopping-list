const SUPABASE_URL = 'https://cmewyjgphfnmytfmmpjy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDAxOTY4MywiZXhwIjoxOTU1NTk1NjgzfQ.0WT-gqj-qvV0wYfg0QdblxbkS4J4rIq0wf8BI3R45yc';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getUser() {
    return client.auth.session();
}

export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./shopping-list');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}

export const createItem = async(item) => {
    const response = await client
        .from('shopping_list')
        .insert([item]);
    return checkError(response);
};

export const getItems = async() => {
    const response = await client
        .from('shopping_list')
        .select();
    // for (const res of response.data) {
    //     console.log(res.created_at);
    // }
    return checkError(response);
};

export const buyItem = async(item) => {
    let bool;
    if (item.bought) {
        bool = false;
    } else {
        bool = true;
    }

    const response = await client
        .from('shopping_list')
        .update({ bought: bool })
        .match({ id: item.id });

    return checkError(response);
};

export const deleteAllItems = async() => {
    const response = await client 
        .from('shopping_list')
        .delete();
    return checkError(response);
};

export const removeSingleItem = async(item) => {
    const response = await client
        .from('shopping_list')
        .delete()
        .match({ id: item.id });
    return checkError(response);
};

const getTime = async() => {
    const items = await getItems();
    for (const item of items) {
        const timeStamp = JSON.stringify(item.created_at);
        console.log(timeStamp);
        const cleanTime = [];
        let places = '';
        for (let i = 12; i < 17; i++) {
            const element = timeStamp[i];
            if (element !== ':') {
                places += element;
            } else {
                cleanTime.push(places);
                places = '';
            }
        }
        cleanTime.push(places);
        console.log(cleanTime);
    }
};


