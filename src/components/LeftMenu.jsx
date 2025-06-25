import React, { useState } from "react";

const LeftMenu = ({ activeItem: initialActiveItem = "Finish" }) => {
  const [activeItem, setActiveItem] = useState(initialActiveItem);

  const menuItems = [
    { id: "part-a", label: "Part (A)" },
    { id: "part-b", label: "Part (B)" },
    { id: "cst", label: "CST" },
    { id: "part-c", label: "Part (C)" },
    { id: "bank-info", label: "Bank Info" },
    { id: "additional", label: "Additional" },
    { id: "business-places", label: "Business Places" },
    { id: "business-partner", label: "Business Partner details" },
    { id: "documents", label: "Documents" },
    { id: "finish", label: "Finish" },
  ];

  return (
    <div>
      <div className="text-[14px] bg-white border flex items-center px-2 py-1">
        <span className="text-red-600 font-bold">Ack.No.: </span>
        <span className="text-green-700 font-bold ml-1">12633089</span>
      </div>

      <div className="w-[180px] bg-blue-500 p-1 h-screen box-border text-md font-normal text-left">
        <div className="flex flex-col">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item.label)}
              className={`text-left font-bold text-[#1a237e] underline cursor-pointer hover:text-blue-800 ${
                activeItem === item.label ? "bg-white" : ""
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;
