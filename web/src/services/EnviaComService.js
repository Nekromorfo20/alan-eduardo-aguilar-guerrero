import axios from "axios"

const shippingQuoteService = async (quoteInfo) => {
    const response = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_ENVIACOM_URL}/ship/rate/`,
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_API_ENVIACOM_TOKEN}`
        },
        data: {
            origin: {
                name: quoteInfo.originName,
                company: quoteInfo.originCompany,
                email: quoteInfo.originEmail,
                phone: quoteInfo.originPhone,
                street: quoteInfo.originStreet,
                number: quoteInfo.originNumber,
                district: quoteInfo.originDistrict,
                city: quoteInfo.originCity,
                state: quoteInfo.originState,
                country: quoteInfo.originCountry,
                postalCode: quoteInfo.originPostalCode,
                reference: quoteInfo.originReference
            },
            destination: {
                name: quoteInfo.destinyName,
                company: quoteInfo.destinyCompany,
                email: quoteInfo.destinyEmail,
                phone: quoteInfo.destinyPhone,
                street: quoteInfo.destinyStreet,
                number: quoteInfo.destinyNumber,
                district: quoteInfo.destinyDistrict,
                city: quoteInfo.destinyCity,
                state: quoteInfo.destinyState,
                country: quoteInfo.destinyCountry,
                postalCode: quoteInfo.destinyPostalCode,
                reference: quoteInfo.destinyReference
            },
            packages: [
                {
                    content: quoteInfo.packageContent,
                    amount: Number(quoteInfo.packageAmount),
                    type: quoteInfo.packageType,
                    dimensions: {
                        length: Number(quoteInfo.packageLength),
                        width: Number(quoteInfo.packageWidth),
                        height: Number(quoteInfo.packageHeight)
                    },
                    weight: Number(quoteInfo.packageWeiht),
                    insurance: 0,
                    declaredValue: 400,
                    weightUnit: "KG",
                    lengthUnit: "CM"
                }
            ],
            shipment: {
                carrier: quoteInfo.shipmentCarrier,
                service: quoteInfo.shipmentService,
                type: 1
            },
            settings: {
                printFormat: "PDF",
                printSize: "STOCK_4X6",
                comments: quoteInfo.shipmentComments
            }
        
        },
        responseType: 'json'
    })
    return response
}

const shippingGenerateService = async (shippingInfo) => {
    const response = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_ENVIACOM_URL}/ship/generate/`,
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_API_ENVIACOM_TOKEN}`
        },
        data: {
            origin: {
                name: shippingInfo.originName,
                company: shippingInfo.originCompany,
                email: shippingInfo.originEmail,
                phone: shippingInfo.originPhone,
                street: shippingInfo.originStreet,
                number: shippingInfo.originNumber,
                district: shippingInfo.originDistrict,
                city: shippingInfo.originCity,
                state: shippingInfo.originState,
                country: shippingInfo.originCountry,
                postalCode: shippingInfo.originPostalCode,
                reference: shippingInfo.originReference
            },
            destination: {
                name: shippingInfo.destinyName,
                company: shippingInfo.destinyCompany,
                email: shippingInfo.destinyEmail,
                phone: shippingInfo.destinyPhone,
                street: shippingInfo.destinyStreet,
                number: shippingInfo.destinyNumber,
                district: shippingInfo.destinyDistrict,
                city: shippingInfo.destinyCity,
                state: shippingInfo.destinyState,
                country: shippingInfo.destinyCountry,
                postalCode: shippingInfo.destinyPostalCode,
                reference: shippingInfo.destinyReference
            },
            packages: [
                {
                    content: shippingInfo.packageContent,
                    amount: Number(shippingInfo.packageAmount),
                    type: shippingInfo.packageType,
                    dimensions: {
                        length: Number(shippingInfo.packageLength),
                        width: Number(shippingInfo.packageWidth),
                        height: Number(shippingInfo.packageHeight)
                    },
                    weight: Number(shippingInfo.packageWeiht),
                    insurance: 0,
                    declaredValue: 400,
                    weightUnit: "KG",
                    lengthUnit: "CM"
                }
            ],
            shipment: {
                carrier: shippingInfo.shipmentCarrier,
                service: shippingInfo.shipmentService,
                type: 1
            },
            settings: {
                printFormat: "PDF",
                printSize: "STOCK_4X6",
                comments: shippingInfo.shipmentComments
            }
        },
        responseType: 'json'
    })
    return response
}

const availableCarrierService = async (country, international) => {
    const response = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_ENVIACOM_URL}/available-carrier/${country}/${international}`,
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_API_ENVIACOM_TOKEN}`
        },
        responseType: 'json'
    })
    return response
}

export {
    shippingQuoteService,
    shippingGenerateService,
    availableCarrierService
}