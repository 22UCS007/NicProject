import React from "react";

const LeftMenu = ({ activeItem = "Finish" }) => {
  const menuItems = [
    { id: "part-a", label: "Part (A)", color: "bg-[#ff6b6b]" },
    { id: "part-b", label: "Part (B)", color: "bg-[#4ecdc4]" },
    { id: "part-c", label: "Part (C)", color: "bg-[#45b7d1]" },
    { id: "bank-info", label: "Bank Info", color: "bg-[#96ceb4]" },
    { id: "applicant", label: "Applicant", color: "bg-[#feca57]" },
    { id: "documents", label: "Documents", color: "bg-[#ff9ff3]" },
    { id: "business-partner", label: "Business Partner", color: "bg-[#54a0ff]" },
    { id: "attachments", label: "Attachments", color: "bg-[#5f27cd]" },
    { id: "finish", label: "Finish", color: "bg-[#00d2d3]" },
  ];

  return (
    <div className="w-32 bg-blue-600 p-2 h-screen box-border">

      <div className="bg-red-600 text-white p-2 mb-2 text-xs text-center rounded">
        <strong>Act No.: 12633089</strong>
      </div>

      <div className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`
              ${item.color}
              p-2 text-white text-xs font-bold text-center cursor-pointer rounded
              transition-opacity duration-200
              ${activeItem === item.label ? "shadow-inner" : ""}
              hover:opacity-80
            `}
          >
            {item.label}
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default LeftMenu;


