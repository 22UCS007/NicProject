import React, { useState } from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

const LeftMenu = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { tinNumber } = useParams();

  const menuItems = [
    { id: "partA", label: "Part (A)" },
    { id: "partB", label: "Part (B)" },
    { id: "cst", label: "CST" },
    { id: "partC", label: "Part (C)" },
    { id: "bankinfo", label: "Bank Info" },
    { id: "additional", label: "Additional" },
    { id: "businessplaces", label: "Business Places" },
    { id: "businesspartner", label: "Business Partner details" },
    { id: "documents", label: "Documents" },
    { id: "finish", label: "Finish" },
  ];

  const currentPath = location.pathname;

  const handleClick = (id)=>{
    navigate(`/form/${id}/${tinNumber}`)
  }

  return (
    <div>
      <div className="text-[14px] bg-white border flex items-center px-2 py-1">
        <span className="text-red-600 font-bold">Ack.No.: </span>
        <span className="text-green-700 font-bold ml-1">12633089</span>
      </div>

      <div className="w-[180px] bg-blue-500 p-1 h-screen box-border text-md font-normal text-left">
        <div className="flex flex-col">
          {menuItems.map((item) => {
            const isActive = currentPath.includes(`/form/${item.id}`);
            return (
              <div
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`text-left font-bold text-[#1a237e] underline cursor-pointer hover:text-blue-800 ${
                  isActive ? "bg-white" : ""
                }`}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;
