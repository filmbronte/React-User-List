const baseUrl = 'http://localhost:3005/api';

export const getAll = async () => {
    const response = await fetch(baseUrl + '/users');

    const res = await response.json();

    return res.users;
}