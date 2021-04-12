import axios from 'axios';

const rest = process.env.REACT_APP_ENV === 'production' ? axios : axios.create({
    baseURL: 'http://localhost:8000'
})

// USERS
export const getUser = (token, email) => rest.get(`/api/user/${email}`, {headers: {Authorization: `Bearer ${token}`}}).catch(e => console.error("request", e));
export const createUser = (token, payload) => 
    rest.post(`/api/user`, payload, {headers: {Authorization: `Bearer ${token}`}}).catch(e => console.error("request", e));
export const updateUser = (token, id, payload) => 
    rest.put(`/api/user/${id}`, payload, {headers: {Authorization: `Bearer ${token}`}}).catch(e => console.error("request", e));

// ENTRIES
export const getExpenses = (token) => rest.get(`/api/expenses`, {headers: {Authorization: `Bearer ${token}`}}).catch(e => console.error("request", e));
export const getExpense = (token, id) => rest.get(`/api/expense/${id}`, {headers: {Authorization: `Bearer ${token}`}}).catch(e => console.error("request", e));
export const createExpense = (token, payload) => rest.post(`/api/expense`, payload, {headers: {Authorization: `Bearer ${token}`}}).catch(e => console.error("request", e));
export const updateExpense = (token, id, payload) => rest.put(`/api/expense/${id}`, payload, {headers: {Authorization: `Bearer ${token}`}}).catch(e => console.error("request", e));
export const deleteExpense = (token, id) => rest.delete(`/api/expense/${id}`, {headers: {Authorization: `Bearer ${token}`}}).catch(e => console.error("request", e));

const apis = {
    createExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
    getExpense,
    getUser,
    createUser,
    updateUser
}

export default apis;