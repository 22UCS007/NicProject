import React from "react"
import { useState } from "react"
import LeftMenu from "../components/LeftMenu"
import FormApprover from "../components/finish/FormApprover"

const Finish = () => {

  return (
    <div className="flex w-full">
      <LeftMenu activeItem="Finish" />

      <div className="w-full">
        <FormApprover/>
      </div>

    </div>
  )
}

export default Finish
