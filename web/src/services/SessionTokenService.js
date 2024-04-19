import axios from "axios"

const getSessionTokenService = async () => {
    const response = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_URL}/session-token`,
        headers: {
            "content-type": "application/json"
        },
        data: {
            name: `${import.meta.env.VITE_API_USER_NAME}`
        },
        responseType: 'json'
    })

    return response
}

export {
    getSessionTokenService
}