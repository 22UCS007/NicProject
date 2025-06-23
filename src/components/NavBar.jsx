import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const NavBar = () => {
  const [isERegDropdownOpen, setIsERegDropdownOpen] = useState(false);
  const [isReturnsDropdownOpen, setIsReturnsDropdownOpen] = useState(false);
  const [isApprovalSubOpen, setIsApprovalSubOpen] = useState(false);
  const [isInspectorNoteOpen, setIsInspectorNoteOpen] = useState(false);
  const [user, setUser] = useState("approver");

  return (
    <div className="p-2 sm:p-4 bg-[#f0f2f5] min-h-screen">
      <nav className="bg-white shadow-md rounded-lg">
        <div className="bg-blue-500 text-white p-3 flex flex-col sm:flex-row justify-between items-center rounded-t-lg text-center sm:text-left">
          <h1 className="text-lg sm:text-xl font-bold mb-2 sm:mb-0 text-yellow-300">
            VATSoft - VAT e-Filing System
          </h1>
          <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
            <span className="font-bold hover:scale-110 duration-200 hover:text-yellow-300 cursor-pointer">
              Charge VII
            </span>
            <a
              href="#"
              className="text-white hover:underline rounded-md px-1 sm:px-2 py-0.5 sm:py-1 font-bold hover:scale-110 hover:text-yellow-300"
            >
              Sign Out
            </a>
          </div>
        </div>

        <div className="bg-[#34495e] text-white p-2 flex flex-wrap justify-center items-center gap-2 md:gap-x-4 text-sm">
          {user === "checker" && (
            <div
              className="relative"
              onMouseEnter={() => setIsERegDropdownOpen(true)}
              onMouseLeave={() => {
                setIsERegDropdownOpen(false);
                setIsInspectorNoteOpen(false);
              }}
            >
              <button className="p-2 rounded-md hover:bg-white hover:bg-opacity-20 transition-colors duration-200 flex items-center space-x-1">
                <span>e-registration</span>
                <ChevronDown className="pl-1" />
              </button>

              {isERegDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 bg-gray-300 text-black min-w-[200px] shadow-lg rounded-lg z-50">
                  <div
                    className="relative group"
                    onMouseEnter={() => setIsInspectorNoteOpen(true)}
                    onMouseLeave={() => setIsInspectorNoteOpen(false)}
                  >
                    <div className="flex justify-center items-center px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
                      Inspector Note
                      <ChevronRight className="pl-2 w-7 h-7" />
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
          {user === "approver" && (
            <>
              <div
                className="relative"
                onMouseEnter={() => setIsERegDropdownOpen(true)}
                onMouseLeave={() => {
                  setIsERegDropdownOpen(false);
                  setIsApprovalSubOpen(false);
                }}
              >
                <button className="p-2 rounded-md hover:bg-white hover:bg-opacity-20 transition-colors duration-200 flex items-center space-x-1">
                  <span>e-registration</span>
                  <ChevronDown className="pl-1" />
                </button>

                {isERegDropdownOpen && (
                  <div className="absolute left-0 top-full mt-1 bg-gray-300 text-black min-w-[200px] shadow-lg rounded-lg z-50">
                    <div
                      className="relative group"
                      onMouseEnter={() => setIsApprovalSubOpen(true)}
                      onMouseLeave={() => setIsApprovalSubOpen(false)}
                    >
                      <div className="flex justify-center items-center px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
                        Approval
                        <ChevronRight className="pl-2 w-7 h-7" />
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
              <a
                href="#"
                className="p-2 rounded-md hover:bg-white hover:bg-opacity-20 transition-colors duration-200 flex justify-center items-center"
              >
                e-WayBill
              </a>
              <a
                href="#"
                className="p-2 rounded-md hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
              >
                e-Audit
              </a>
              <a
                href="#"
                className="p-2 rounded-md hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
              >
                e-CST Forms
              </a>
            </>
          )}

          <a
            href="#"
            className="p-2 rounded-md hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
          >
            MIS Report
          </a>

          {user === "approver" && (
            <a
              href="#"
              className="p-2 rounded-md hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
            >
              UPDATION
            </a>
          )}

          <a
            href="#"
            className="p-2 rounded-md hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
          >
            Others
          </a>

          {user === "approver" && (
            <>
              <a
                href="#"
                className="p-2 rounded-md hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
              >
                DLR.ADMIN
              </a>
              <div
                className="relative"
                onMouseEnter={() => setIsReturnsDropdownOpen(true)}
                onMouseLeave={() => setIsReturnsDropdownOpen(false)}
              >
                <button className="p-2 rounded-md hover:bg-white hover:bg-opacity-20 transition-colors duration-200 flex items-center space-x-1">
                  <span>Returns</span>
                  <ChevronDown size={16} />
                </button>

                {isReturnsDropdownOpen && (
                  <div className="absolute left-0 top-full mt-1 bg-gray-300 text-black min-w-[180px] shadow-lg rounded-lg z-50">
                    {[
                      "View/ACK e-Returns",
                      "ACK(TDS/CST)",
                      "Manual Payment",
                      "Returns Entry",
                      "Returns Verify/Submit",
                      "Refund",
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
            </>
          )}
        </div>

        <div className="bg-gray-200 px-4 py-2 text-gray-700 font-semibold border-t border-gray-200 text-center text-sm rounded-b-lg">
          :: &lt;&lt;&lt; MAIN MENU &gt;&gt;&gt; ::
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
