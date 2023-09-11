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

export const update = async (userId, userData) => {

    const response = await fetch(`${baseUrl}/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });

    const result = await response.json();

    return result.user;
};

export const del = async (userId) => {
    const response = await fetch(`${baseUrl}/users/${userId}`, {
        method: 'DELETE',
    })

    const result = await response.json();

    return result;
}