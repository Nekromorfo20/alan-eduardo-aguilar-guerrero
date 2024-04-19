import axios from "axios"

const getProductsService = async (id, token) => {
    const exts = (id !== '' && id !== null) ? `?id=${id}` : ''

    const response = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_URL}/products${exts}`,
        headers: {
            "content-type": "application/json",
            "X-Auth-Token": token
        },
        responseType: 'json'
    })
    return response
}

const createProductService = async (name, description, height, length, width, token) => {
    const response = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_URL}/products`,
        headers: {
            "content-type": "application/json",
            "X-Auth-Token": token
        },
        data: {
            name: name,
            description: description,
            height: height,
            length: length,
            width: width
        },
        responseType: 'json'
    })
    return response
}

const updateProductService = async (id, name, description, height, length, width, token) => {
    const response = await axios({
        method: 'put',
        url: `${import.meta.env.VITE_API_URL}/products`,
        headers: {
            "content-type": "application/json",
            "X-Auth-Token": token
        },
        data: {
            id: id,
            name: name,
            description: description,
            height: height,
            length: length,
            width: width
        },
        responseType: 'json'
    })
    return response
}

const deleteProductService = async (id, token) => {
    const response = await axios({
        method: 'delete',
        url: `${import.meta.env.VITE_API_URL}/products`,
        headers: {
            "content-type": "application/json",
            "X-Auth-Token": token
        },
        data: {
            id: id
        },
        responseType: 'json'
    })
    return response
}

export {
    getProductsService,
    createProductService,
    updateProductService,
    deleteProductService
}