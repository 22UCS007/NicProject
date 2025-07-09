import React from "react"
import { useState } from "react"

const VATSection = ({newFormData, handleChange}) => {

  return (
    <div className="my-2 p-2">

      <div className="flex items-center gap-3">

        <label className="font-bold min-w-[80px]">VAT or CoT:</label>

        <select
          value={newFormData.vatOrCot}
          name="vatOrCot"
          onChange={handleChange}
          className="px-2 py-1 border border-gray-300 rounded bg-white min-w-[120px] focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="Normal VAT">Normal VAT</option>
          <option value="CoT">CoT</option>
        </select>

      </div>

    </div>
  )
}

export default VATSection
