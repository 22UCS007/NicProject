import React from "react"
import { useState } from "react"

const YesNoQuestions = () => {
  const [answers, setAnswers] = useState({
    appointments: "",
    payments: "",
    documents: "",
    verification: "",
  })

  const questions = [
    {
      id: "appointments",
      text: "All Appointments Cleared",
      subtext: "",
    },
    {
      id: "payments",
      text: "Necessary payments (Reg. Fees, RT and Security Deposit, etc.) are",
      subtext: "Duly received/ Exemption",
    },
    {
      id: "documents",
      text: "All Documents Uploaded",
      subtext: "",
    },
    {
      id: "verification",
      text: "All Documents Verified",
      subtext: "",
    },
  ]

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  return (
    <div className="my-4 p-4 border border-gray-300 bg-gray-50 rounded">
      <div className="mb-4 p-2 bg-blue-100 rounded text-sm font-semibold">
        <strong>Registration Payment Date(s): 05/2025</strong>
      </div>

      {questions.map((question) => (
        <div
          key={question.id}
          className="flex justify-between items-center mb-3 p-2 bg-white border border-gray-200 rounded"
        >
          <div className="flex-1 text-[13px]">
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
                value="yes"
                checked={answers[question.id] === "yes"}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                className="accent-blue-600"
              />
              Yes
            </label>
            <label className="flex items-center gap-1 text-xs cursor-pointer">
              <input
                type="radio"
                name={question.id}
                value="no"
                checked={answers[question.id] === "no"}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
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
