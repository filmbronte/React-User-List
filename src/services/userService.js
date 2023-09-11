const baseUrl = 'http://localhost:3005/api';

export const getAll = async () => {
    const response = await fetch(baseUrl + '/users');

    const res = await response.json();

    return res.users;
};

export const getOne = async (id) => {
    const response = await fetch(`${baseUrl}/users/${id}`);

    const res = await response.json();

    return res.user;
};

export const create = async (userData) => {
    const response = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    const res = await response.json();

    return res.user;
}
