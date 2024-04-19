import { useState, useEffect } from "react"
import { useLocation, Link } from "react-router-dom"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { getProductsService, shippingQuoteService, shippingGenerateService } from "../services"
import { FormGenerateQuote, TableQuote, TableShipment, TableOrderCompleted } from "../components"

const ShippingView = () => {
    const location = useLocation()
    const token = JSON.parse(localStorage.getItem("token"))

    const [quoteCompleted, setquoteCompleted] = useState(false)
    const [shipmentCompleted, setShipmentCompleted] = useState(false)

    const [quote, setQuote] = useState({
      originName: "oscar mx",
      originCompany: "envia",
      originEmail: "noreply@envia.com",
      originPhone: "8116300800",
      originStreet: "av vasconcelos",
      originNumber: "1400",
      originDistrict: "mirasierra",
      originCity: "Monterrey",
      originState: "NL",
      originCountry: "MX",
      originPostalCode: "66236",
      originReference: "",

      destinyName: "oscar",
      destinyCompany: "empresa",
      destinyEmail: "noreply@envia.com",
      destinyPhone: "8116300800",
      destinyStreet: "av vasconcelos",
      destinyNumber: "1400",
      destinyDistrict: "palo blanco",
      destinyCity: "monterrey",
      destinyState: "NL",
      destinyCountry: "MX",
      destinyPostalCode: "66240",
      destinyReference: "",

      packageContent: "",
      packageAmount: 1,
      packageType: "box",
      packageWeiht: 10,
      packageLength: 0,
      packageWidth: 0,
      packageHeight: 0,

      shipmentCarrier: "dhl",
      shipmentService: "express",
      shipmentComments: "Ninguno"
    })

    const [shipment, setShipment] = useState({
      carrier: "",
      service: "",
      serviceDescription: "",
      deliveryEstimate: "",
      deliveryDateDate: "",
      deliveryDateTime: "",
      quantity: "",
      basePrice: "",
      totalPrice: "",
      currency: ""
    })

    const [resume, setResume] = useState({
      carrier: "",
      service: "",
      trackingNumber: "",
      trackUrl: "",
      label: "",
      totalPrice: 0
    })

    const loadProductInfo = async () => {
      let id = Number(location.pathname.replace(/\D/g, ""))

      const result = await getProductsService(id, token)
        if (result?.data?.statusCode == 200) {
            const res = result.data.data[0]
          setQuote({
            ...quote,
            packageContent: res.name,
            packageLength: res.length,
            packageWidth: res.width,
            packageHeight: res.height
          })

      } else {
          console.log('¡Cannot find the product with the id provided!')
          goTo("/")
      }
    }

    const handleChangeForm = (e) => {
      setQuote({
        ...quote,
        [e.target.id]: e.target.value
      })
    }

    const handleSubmitQuote = async (e) => {
      e.preventDefault()

      Swal.fire({
        title: "Realizando cotización",
        text: "Realizando cotización, espere un momento por favor...",
        icon: "info",
        timer: 4000,
        showConfirmButton: false
      })

      const quoteInfo = {
        originName: quote.originName,
        originCompany: quote.originCompany,
        originEmail: quote.originEmail,
        originPhone: quote.originPhone,
        originStreet: quote.originStreet,
        originNumber: quote.originNumber,
        originDistrict: quote.originDistrict,
        originCity: quote.originCity,
        originState: quote.originState,
        originCountry: quote.originCountry,
        originPostalCode: quote.originPostalCode,
        originReference: quote.originReference,

        destinyName: quote.destinyName,
        destinyCompany: quote.destinyCompany,
        destinyEmail: quote.destinyEmail,
        destinyPhone: quote.destinyPhone,
        destinyStreet: quote.destinyStreet,
        destinyNumber: quote.destinyNumber,
        destinyDistrict: quote.destinyDistrict,
        destinyCity: quote.destinyCity,
        destinyState: quote.destinyState,
        destinyCountry: quote.destinyCountry,
        destinyPostalCode: quote.destinyPostalCode,
        destinyReference: quote.destinyReference,

        packageContent: quote.packageContent,
        packageAmount:quote.packageAmount,
        packageType: quote.packageType,
        packageWeiht:quote.packageWeiht,
        packageLength:quote.packageLength,
        packageWidth:quote.packageWidth,
        packageHeight:quote.packageHeight,

        shipmentCarrier: quote.shipmentCarrier,
        shipmentService: quote.shipmentService,
        shipmentComments: quote.shipmentComments
      }

      const result = await shippingQuoteService(quoteInfo)
      if (result?.data?.data) {
        const res = result?.data?.data[0]
        setquoteCompleted(true)
        setShipment({
            ...shipment,
            carrier: res.carrier,
            service: res.service,
            serviceDescription: res.serviceDescription,
            deliveryEstimate: res.deliveryEstimate,
            deliveryDateDate: res.deliveryDate.date,
            deliveryDateTime: res.deliveryDate.time,
            quantity: res.quantity,
            basePrice: res.basePrice,
            totalPrice: res.totalPrice,
            currency: res.currency
        })
      } else {
        console.log('¡An error ocurs!')
        Swal.fire({
            title: "Ocurrio un error",
            text: "No se pudo generar la cotización",
            icon: "error",
            timer: 3000,
            showConfirmButton: true
        })
      }
    }

    const handleSubmitShipment = async (e) => {
        e.preventDefault()
        const result = await shippingGenerateService(quote)
        if (result?.data?.data) {

            Swal.fire({
                title: "Envio exitoso",
                text: "El envio con la cotización se ha generado con exito",
                icon: "success",
                timer: 3000,
                showConfirmButton: true
            })

            const res = result?.data?.data[0]
            setShipmentCompleted(true)
            setResume({
                ...resume,
                carrier: res.carrier,
                service: res.service,
                trackingNumber: res.trackingNumber,
                trackUrl: res.trackUrl,
                label: res.label,
                totalPrice: res.totalPrice
            })
      } else {
        console.log('¡An error ocurs!')
        Swal.fire({
            title: "Ocurrio un error",
            text: "No se pudo generar el envio",
            icon: "error",
            timer: 3000,
            showConfirmButton: true
        })
      }
    }

    useEffect(() => {
      loadProductInfo()
  }, [])

  return (
    <div>
        <div className="row d-flex justify-content-center align-items-center h-100">
            {quoteCompleted && shipmentCompleted ? (
                <>
                    <TableOrderCompleted
                        title="Envio realizado"
                        carrier={resume.carrier}
                        service={resume.service}
                        trackingNumber={resume.trackingNumber}
                        trackUrl={resume.trackUrl}
                        label={resume.label}
                        totalPrice={resume.totalPrice}
                    />

                    <div className="d-flex justify-content-between">
                        <Link className="btn btn-secondary" to="/">Regresar</Link>
                    </div>
                </>
            ) : quoteCompleted && !shipmentCompleted ? (
                <>
                    <form
                        onSubmit={handleSubmitShipment}
                    >
                        <TableQuote
                            title="Información origen"
                            name={quote.originName}
                            company={quote.originCompany}
                            email={quote.originEmail}
                            phone={quote.originPhone}
                            street={quote.originStreet}
                            number={quote.originNumber}
                            district={quote.originDistrict}
                            city={quote.originCity}
                            state={quote.originState}
                            country={quote.originCountry}
                            postalCode={quote.originPostalCode}
                            reference={quote.originReference}
                        />

                        <TableQuote
                            title="Información de destino"
                            name={quote.destinyName}
                            company={quote.destinyCompany}
                            email={quote.destinyEmail}
                            phone={quote.destinyPhone}
                            street={quote.destinyStreet}
                            number={quote.destinyNumber}
                            district={quote.destinyDistrict}
                            city={quote.destinyCity}
                            state={quote.destinyState}
                            country={quote.destinyCountry}
                            postalCode={quote.destinyPostalCode}
                            reference={quote.destinyReference}
                        />

                        <TableShipment
                            title="Información de envio"
                            carrier={shipment.carrier}
                            service={shipment.service}
                            serviceDescription={shipment.serviceDescription}
                            deliveryEstimate={shipment.deliveryEstimate}
                            deliveryDateDate={shipment.deliveryDateDate}
                            deliveryDateTime={shipment.deliveryDateTime}
                            quantity={shipment.quantity}
                            basePrice={shipment.basePrice}
                            totalPrice={shipment.totalPrice}
                            currency={shipment.currency}
                        />
                        
                        <div className="d-flex justify-content-between">
                            <Link className="btn btn-secondary" to="/">Regresar</Link>
                            <input
                                className="btn btn-primary"
                                type="submit"
                                value="Generar envio"
                            />
                        </div>
                    </form>
                </>
            ) : (
                <FormGenerateQuote
                    quote={quote}
                    handleChangeForm={handleChangeForm}
                    handleSubmitQuote={handleSubmitQuote}
                />
            )}
      </div>
    </div>
  )
}

export default ShippingView