import React from "react"
import { useState } from "react"
import FormApprover from "../components/finish/FormApprover"
const Finish = () =>{
  return (
    <div className="flex w-full">
      {/* <LeftMenu activeItem="Finish" /> */}

      <div className="w-full">
        <FormApprover/>
      </div>
    </div>
  )
}
export default Finish
