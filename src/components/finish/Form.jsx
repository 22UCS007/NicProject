import React from "react"
import { useState } from "react"
import LeftMenu from "../components/LeftMenu"
import FileUpload from "./FileUpload"
import "./Finish.css"


const Form = () => {
    const [inspectorComment, setInspectorComment] = useState("")
    const [approvingComment, setApprovingComment] = useState("")

    const [formData, setFormData] = useState({
        dateOfVisit: "",
        natureOfBusiness: "",
        dateOfCommencementPurchase: "",
        amountOfPurchase: "",
        dateOfCommencementSales: "",
        amountOfSales: "",
        capitalProposed: "",
        amountOfStock: "",
        booksOfAccount: "",
        verificationOfOriginals: "",
        verificationOfTitle: "",
        otherInformation: "",
        longitudeDegrees: "",
        longitudeMinutes: "",
        longitudeSeconds: "",
        latitudeDegrees: "",
        latitudeMinutes: "",
        latitudeSeconds: "",
        securityDepositAmount: "",
    })

    return (
        <div>Form</div>
    )
}

export default Form