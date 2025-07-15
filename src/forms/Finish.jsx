import React from "react"
import { useState } from "react"
import FormApprover from "../components/finish/FormApprover"
import FormChecker from "../components/finish/FormChecker"
const Finish = ({userRole, userData}) =>{
  return (
    <div className="flex w-full">
      {/* <LeftMenu activeItem="Finish" /> */}

      <div className="w-full">
        {userRole==="approver" ? <FormApprover/> : <FormChecker/>}
      </div>
    </div>
  )
}
export default Finish
