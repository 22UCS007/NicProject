import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

const Documents = () => {
    const {tinNumber} = useParams();
    const navigate  = useNavigate();

    // State for the documents data
    const [documents, setDocuments] = useState([]);
    const [loadingDocuments, setLoadingDocuments] = useState(true);
    const [errorDocuments, setErrorDocuments] = useState(null);
    // --- useEffect for fetching Documents Table Data ---
    useEffect(() => {
        const fetchDocumentsData = async () => {
            setLoadingDocuments(true);
            setErrorDocuments(null);
            try {
                // Replace with your actual API endpoint for documents list
                // Example: `/api/documents/${tinNo}`
                // For demonstration, we'll use a simulated API call.
                const response = await new Promise(resolve => setTimeout(() => {
                    resolve([
                        {
                            id: 1,
                            document: 'SampleDocument1.pdf',
                            documentType: 'PDF',
                            documentSize: '350KB',
                            partnerName: 'Acme Corp',
                            enteredBy: 'John Doe',
                            enteredDate: '2023-01-15'
                        },
                        {
                            id: 2,
                            document: 'ImageProof.jpeg',
                            documentType: 'JPEG',
                            documentSize: '480KB',
                            partnerName: 'Beta Ltd',
                            enteredBy: 'Jane Smith',
                            enteredDate: '2023-02-20'
                        },
                        {
                            id: 3,
                            document: 'Contract_2024.pdf',
                            documentType: 'PDF',
                            documentSize: '210KB',
                            partnerName: 'Gamma Inc',
                            enteredBy: 'John Doe',
                            enteredDate: '2024-03-10'
                        },
                    ]);
                }, 1500)); // Simulate 1.5-second API delay

                setDocuments(response);
            } catch (err) {
                console.error("Error fetching documents data:", err);
                setErrorDocuments(err);
            } finally {
                setLoadingDocuments(false);
            }
        };
        fetchDocumentsData();
    }, []); // Dependency array includes tinNo so it refetches if tinNo changes

    // Placeholder functions for View and Delete
    const handleViewDocument = (documentId) => {
        // In a real application, this would open a new tab/modal to view the document
        console.log(`View document with ID: ${documentId}`);
        alert(`Viewing document with ID: ${documentId}`);
    };

    const handlePrevious = () => {
        navigate(`/form/businesspartner/${tinNumber}`); // Optional: pass tinNo back if PartA needs it on return
    };

    const handleNext = () => {
        // Before navigating, you might want to save Part B data to your backend
        // Or just proceed to Part C.
        console.log('Proceeding to finish with TIN:', tinNumber);
        navigate(`/form/finish/${tinNumber}`); // Pass tinNo to Part C
    };

    return (
        <div className="min-h-screen bg-slate-200 p-6 flex items-center justify-center">
            <div className="w-full max-w-6xl bg-slate-200 shadow-lg rounded-lg p-2">
                <div className="w-full mx-auto border border-blue-600">
                    <div className="border-r border-t border-l bg-sky-400 border-blue-600 w-full">
                        <div className="pl-1 text-black font-semibold flex justify-center">
                            Documents
                        </div>
                    </div>

                    {/* Form Fields populated from mainContact object */}
                    <div className="border-r border-t border-l border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                        <div className="pl-7 text-gray-700 font-medium">
                            Document
                        </div>
                        <div className="flex border-l border-blue-600 items-center p-1">
                            <select
                                className="p-1 border rounded-md border-black bg-gray-100 text-gray-400 w-3/5 "
                                disabled
                            // value={selectedDocument}
                            // onChange={(e) => setSelectedDocument(e.target.value)}
                            >
                                <option value="Address Proof of business place">Select Document</option>
                            </select>
                            <h1 className='text-red-600 pl-3'>Maximum size is 500kb</h1>
                        </div>
                    </div>
                    <div className="border-r border-t border-l border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                        <div className="pl-7 text-gray-700 font-medium">
                            Document Type
                        </div>
                        <div className="flex border-l border-blue-600 items-center gap-2 p-1">
                            <select
                                className="p-1 border rounded-md border-black bg-gray-100 text-gray-400 w-1/3 h-[28px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled
                            >
                                <option value="jpeg">.jpeg .jpg .pdf etc</option>
                            </select>
                        </div>
                    </div>
                    <div className="border-r border-t border-l border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                        <div className="pl-7 text-gray-700 font-medium">
                            Select File
                        </div>
                        <div className="flex border-l border-blue-600 items-center gap-2 p-1">
                            <label className=" bg-gray-200 text-black font-semibold px-4 py-1 rounded-md border border-black">
                                Browse...
                            </label>
                            <p className="p-1  bg-slate-200 text-gray-700 font-bold ">
                                No File Selected
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center space-x-4 border-l border-r border-t border-blue-600 p-1">
                        <div className="bg-violet-400 font-semibold text-white border border-blue-700 px-4">
                            Upload
                        </div>
                    </div>
                    <div className=" justify-center space-x-4 border-l border-r border-t border-blue-600 p-2 font-semibold">
                        <h1 className='pl-3 text-green-600'>Tips for reducing the file size:</h1>
                        <h1 className='text-blue-700'>1.Scan the photos with less resolution and crop/cut to the actual image.</h1>
                        <h1 className='text-blue-700'>2.Scan the documents in black/white with less resolution.</h1>
                    </div>

                    {/* Section 3: List of Document Details Table - Populated from 'documents' array */}
                    <div className="border-l border-r border-t border-blue-600  items-center w-full">
                        <h3 className=" pl-7 text-gray-900 font-semibold flex justify-center">Documents Attached</h3>
                    </div>
                    <div className="border border-blue-600  items-center w-full p-2">
                        <div className="overflow-x-auto">
                            {loadingDocuments ? (
                                <p>Loading documents...</p>
                            ) : errorDocuments ? (
                                <p className="text-red-600">Error loading documents: {errorDocuments.message}</p>
                            ) : documents.length === 0 ? (
                                <p>No documents found.</p>
                            ) : (
                                <table className="min-w-full bg-white border border-black rounded-lg">
                                    <thead>
                                        <tr className="bg-blue-500 text-white">
                                            <th className="py-2 px-4 border-b border-r border-black text-left">Document</th>
                                            <th className="py-2 px-4 border-b border-r border-black text-left">Document Type</th>
                                            <th className="py-2 px-4 border-b border-r border-black text-left">Document Size</th>
                                            <th className="py-2 px-4 border-b border-r border-black text-left">Partner Name</th>
                                            <th className="py-2 px-4 border-b border-r border-black text-left">Entered By</th>
                                            <th className="py-2 px-4 border-b border-r border-black text-left">Entered Date</th>
                                            <th className="py-2 px-4 border-b border-r border-black text-left"></th> {/* For View */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {documents.map((doc) => (
                                            <tr key={doc.id} className="hover:bg-gray-50">
                                                <td className="py-2 px-4 border-b border-r border-black">{doc.document}</td>
                                                <td className="py-2 px-4 border-b border-r border-black">{doc.documentType}</td>
                                                <td className="py-2 px-4 border-b border-r border-black">{doc.documentSize}</td>
                                                <td className="py-2 px-4 border-b border-r border-black">{doc.partnerName}</td>
                                                <td className="py-2 px-4 border-b border-r border-black">{doc.enteredBy}</td>
                                                <td className="py-2 px-4 border-b border-r border-black">{doc.enteredDate}</td>
                                                <td className="py-2 px-4 border-b border-r border-black">
                                                    <button
                                                        onClick={() => handleViewDocument(doc.id)}
                                                        className="text-blue-600 hover:text-blue-800 font-semibold"
                                                    >
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
                {/* Navigation Buttons */}
                <div className="flex justify-center space-x-4 mt-6">
                    <button className="bg-blue-600 text-white px-6 font-bold hover:bg-blue-800" onClick={handlePrevious}>
                        Previous
                    </button>
                    <button className="bg-blue-600 text-white px-6 font-bold hover:bg-blue-800" onClick={handleNext}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Documents;



