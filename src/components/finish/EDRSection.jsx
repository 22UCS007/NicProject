import React, { useState } from "react"

const EDRSection = ({newFormData, handleChange}) => {

  return (
    <div className="my-2 p-2">
      <div className="flex items-center gap-3">
        <label className="font-bold min-w-[40px]">EDR:</label>
        <input
          type="date"
          name="edr"
          value={newFormData.edr}
          onChange={handleChange}
          className="px-2 py-1 border border-gray-300 rounded w-[140px] focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button className="text-[17px] cursor-default">
          Submit Query
        </button>
      </div>
    </div>
  )
}

export default EDRSection
