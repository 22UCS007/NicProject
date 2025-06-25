import React from "react"
import { useState } from "react"

const EDRSection = () => {
  const [edrDate, setEdrDate] = useState("13/06/2025")

  return (
    <div className="my-2 p-2 border border-gray-300 rounded bg-white">
      <div className="flex items-center gap-3">
        <label className="font-bold min-w-[40px]">EDR:</label>
        <input
          type="text"
          value={edrDate}
          onChange={(e) => setEdrDate(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded w-[100px] focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          className="bg-blue-600 text-white border-none px-2 py-1 rounded text-xs cursor-pointer hover:bg-blue-700 transition"
        >
          Submit Query
        </button>
      </div>
    </div>
  )
}

export default EDRSection
