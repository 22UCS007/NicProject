import React from "react"
import { useState } from "react"
import LeftMenu from "../components/LeftMenu"
import Form from "../components/finish/Form"

const Finish = () => {

  return (
    <div className="flex w-full">
      <LeftMenu activeItem="Finish" />

      <div className="w-full">
        <Form/>
      </div>

    </div>
  )
}

export default Finish
