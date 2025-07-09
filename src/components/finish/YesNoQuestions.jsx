import React from "react"
import { useState } from "react"

const YesNoQuestions = ({newFormData,  handleChange}) => {

  const questions = [
    {
      id: "allAppointmentsClosed",
      text: "All Appointments Cleared",
      subtext: "",
    },
    {
      id: "payments",
      text: "Necessary payments (Reg. Fees, RT and Security Deposit, etc.),",
      subtext: "if applicable have been received ?",
    },
    {
      id: "ptExemption",
      text: "PT Exemption",
      subtext: "",
    },
    {
      id: "allDocumentsUploaded",
      text: "All Documents Uploaded",
      subtext: "",
    },
  ]

  return (
    <div className="my-4 p-4 md:w-[50%] m-auto">

      <div className="text-sm font-semibold">
        <strong>Registration Payment Date(s): 05/2025</strong>
      </div>

      {questions.map((question) => (
        <div
          key={question.id}
          className="flex items-center md:justify-between mb-3 p-2 border-gray-200 "
        >
          <div className="text-[13px]">
            <div>{question.text}</div>
            {question.subtext && (
              <div className="text-[11px] text-gray-500 italic">{question.subtext}</div>
            )}
          </div>

          <div className="flex gap-4 ml-4">
            <label className="flex items-center gap-1 text-xs cursor-pointer">
              <input
                type="radio"
                name={question.id}
                value={true}
                checked={newFormData[question.id] === true}
                onChange={handleChange}
                className="accent-blue-600"
              />
              Yes
            </label>
            <label className="flex items-center gap-1 text-xs cursor-pointer">
              <input
                type="radio"
                name={question.id}
                value={false}
                checked={newFormData[question.id] === false}
                onChange={handleChange}
                className="accent-blue-600"
              />
              No
            </label>
          </div>

        </div>
      ))}
    </div>
  )
}

export default YesNoQuestions
