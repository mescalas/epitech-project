import axios from "axios"
let token = localStorage.getItem('SESSID');

const getAllCategories = () => {
    return axios.get('http://127.0.0.1:8000/category', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

const getAllProducts = () => {
    return axios.get('http://127.0.0.1:8000/product', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

const getAllSubCategories = () => {
    return axios.get('http://127.0.0.1:8000/subcategory', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

const getProduct = id => {
    return axios.get(`http://127.0.0.1:8000/product/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

const getSubCategory = id => {
    return axios.get(`http://127.0.0.1:8000/subcategory/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        } 
    })
}

const getUserAdresses = email => {
    return axios.get(`http://127.0.0.1:8000/api/address/user/${email}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        } 
    })
}

const getUserPaiements = email => {
    return axios.get(`http://127.0.0.1:8000/api/payment_method/user/${email}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        } 
    })
}

const getUserOrders = email => {
    return axios.get(`http://127.0.0.1:8000/order/user/${email}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        } 
    })
}

export {
    getAllCategories,
    getAllProducts,
    getAllSubCategories,
    getProduct,
    getSubCategory,
    getUserAdresses,
    getUserPaiements,
    getUserOrders
}