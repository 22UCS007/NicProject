

import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const NavBar = ({ userRole ,onSignOut}) => {
  const [isERegDropdownOpen, setIsERegDropdownOpen] = useState(false);
  const [isReturnsDropdownOpen, setIsReturnsDropdownOpen] = useState(false);
  const [isApprovalSubOpen, setIsApprovalSubOpen] = useState(false);
  const [isInspectorNoteOpen, setIsInspectorNoteOpen] = useState(false);
  const [user, setUser] = useState("approver");

  return (
    
      <nav className="bg-white shadow-md rounded-lg">
        <div className="bg-blue-500 text-white p-3 flex flex-col sm:flex-row justify-between items-center rounded-t-lg">
          <h1 className="text-lg sm:text-xl font-bold mb-2 sm:mb-0 text-yellow-300">
            VATSoft - VAT e-Filing System
          </h1>
          <div className="flex items-center space-x-4 text-sm">
            <span className="font-bold cursor-pointer hover:scale-110 duration-200 hover:text-yellow-300">
              Charge VII
            </span>
            <button // Changed to button for proper onClick handling
              onClick={onSignOut}
              className="text-white hover:underline rounded-md px-2 py-1 font-bold hover:scale-110 hover:text-yellow-300"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="bg-[#34495e] text-white p-2 flex flex-wrap justify-center gap-2 text-sm">
          {userRole === "checker" && (
            <div
              className="relative"
              onMouseEnter={() => setIsERegDropdownOpen(true)}
              onMouseLeave={() => {
                setIsERegDropdownOpen(false);
                setIsInspectorNoteOpen(false);
              }}
            >
              <button className="p-2 rounded hover:bg-white hover:bg-opacity-20 flex items-center">
                <span>e-registration</span>
                <ChevronDown className="ml-1" />
              </button>
              {isERegDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 bg-gray-300 text-black shadow-lg rounded-lg z-50">
                  <div
                    className="relative group"
                    onMouseEnter={() => setIsInspectorNoteOpen(true)}
                    onMouseLeave={() => setIsInspectorNoteOpen(false)}
                  >
                    <div className="flex justify-center items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Inspector Note
                      <ChevronRight className="ml-2" />
                    </div>
                    {isInspectorNoteOpen && (
                      <div className="absolute top-0 left-full ml-1 bg-gray-300 rounded-lg shadow-lg min-w-[180px] z-50">
                        {[
                          "New Registration",
                          "Transfer TIN",
                          "Deregistration",
                          "CST Registration",
                          "Transporter Registration",
                          "Registration Amedment",
                        ].map((sub) => (
                          <a
                            key={sub}
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap rounded-md"
                          >
                            {sub}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {userRole === "approver" && (
            <>
              <div
                className="relative"
                onMouseEnter={() => setIsERegDropdownOpen(true)}
                onMouseLeave={() => {
                  setIsERegDropdownOpen(false);
                  setIsApprovalSubOpen(false);
                }}
              >
                <button className="p-2 rounded hover:bg-white hover:bg-opacity-20 flex items-center">
                  <span>e-registration</span>
                  <ChevronDown className="ml-1" />
                </button>
                {isERegDropdownOpen && (
                  <div className="absolute left-0 top-full mt-1 bg-gray-300 text-black shadow-lg rounded-lg z-50">
                    <div
                      className="relative group"
                      onMouseEnter={() => setIsApprovalSubOpen(true)}
                      onMouseLeave={() => setIsApprovalSubOpen(false)}
                    >
                      <div className="flex justify-center items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Approval
                        <ChevronRight className="ml-2" />
                      </div>
                      {isApprovalSubOpen && (
                        <div className="absolute top-0 left-full ml-1 bg-gray-300 rounded-lg shadow-lg min-w-[180px] z-50">
                          {[
                            "New Reg./Amedment",
                            "Transfer TIN",
                            "Deregistration",
                            "CST Registration",
                            "Transporter Registration",
                            "Registration Amedment",
                          ].map((sub) => (
                            <a
                              key={sub}
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap rounded-md"
                            >
                              {sub}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {[
                      "Reports",
                      "Appointments",
                      "Assignments",
                      "Closing of appointments",
                      "Transfer In",
                      "Duplicate Certificates",
                      "Dealer (Backlog)",
                      "CST (Backlog)",
                      "Entry, Modify",
                    ].map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap rounded-md"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="#"
                className="p-2 rounded hover:bg-white hover:bg-opacity-20"
              >
                e-WayBill
              </Link>

              <Link
                to="#"
                className="p-2 rounded hover:bg-white hover:bg-opacity-20"
              >
                e-Audit
              </Link>

              <Link
                to="#"
                className="p-2 rounded hover:bg-white hover:bg-opacity-20"
              >
                e-CST Forms
              </Link>
            </>
          )}

          <Link
            to="#"
            className="p-2 rounded hover:bg-white hover:bg-opacity-20"
          >
            MIS Report
          </Link>

          {userRole === "approver" && (
            <>
              <Link
                to="#"
                className="p-2 rounded hover:bg-white hover:bg-opacity-20"
              >
                UPDATION
              </Link>

              <Link
                to="#"
                className="p-2 rounded hover:bg-white hover:bg-opacity-20"
              >
                DLR.ADMIN
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setIsReturnsDropdownOpen(true)}
                onMouseLeave={() => setIsReturnsDropdownOpen(false)}
              >
                <button className="p-2 rounded hover:bg-white hover:bg-opacity-20 flex items-center">
                  <span>Returns</span>
                  <ChevronDown size={16} className="ml-1" />
                </button>

                {isReturnsDropdownOpen && (
                  <div className="absolute left-0 top-full mt-1 bg-gray-300 text-black min-w-[180px] shadow-lg rounded-lg z-50">
                    {[
                      { label: "View/ACK e-Returns", path: "#" },
                      { label: "ACK(TDS/CST)", path: "#" },
                      { label: "Manual Payment", path: "/manual-payment" },
                      { label: "Returns Entry", path: "#" },
                      { label: "Returns Verify/Submit", path: "#" },
                      { label: "Refund", path: "#" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        to={item.path}
                        className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap rounded-md"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          <Link
            to="#"
            className="p-2 rounded hover:bg-white hover:bg-opacity-20"
          >
            Others
          </Link>
        </div>

        {/* <div className="bg-gray-200 px-4 py-2 text-gray-700 font-semibold border-t text-center text-sm rounded-b-lg">
          :: &lt;&lt;&lt; MAIN MENU &gt;&gt;&gt; ::
        </div> */}
      </nav>
    
  );
};

export default NavBar;
