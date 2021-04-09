import axios from 'axios';

const rest = process.env.REACT_APP_ENV === 'production' ? axios : axios.create({
    baseURL: 'http://localhost:8000'
})

// USERS
export const getUser = (token, email) => 
    rest.get(`/api/user/${email}`)
    // {headers: {Authorization: `Bearer ${token}`}})
    .catch(e => console.error("request", e));
export const createUser = (token, payload) => 
    rest.post(`/api/user`, payload)
    // {headers: {Authorization: `Bearer ${token}`}})
    .catch(e => console.error("request", e));
export const updateUser = (token, id, payload) => 
    rest.put(`/api/user/${id}`, payload)
    // {headers: {Authorization: `Bearer ${token}`}})
    .catch(e => console.error("request", e));

const apis = {
    getUser,
    createUser,
    updateUser
}

export default apis;