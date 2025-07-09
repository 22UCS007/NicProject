
import React, { useState, useEffect } from 'react';

const BusinessPartnerForm = () => {
    // --- State for the Main Business Partner/Contact Person Details ---
    const [mainContact, setMainContact] = useState({
        applicantName: '',
        slNo: '',
        personName: '',
        fatherName: '',
        dob: '',
        partnerType: 'Contact Person', // Default value
        educationalQualification: '',
        panNo: '',
        presentAddress: '',
        areaLocality: '',
        villageTownCity: '',
        permanentAddress: '',
        telNo: '',
        faxNo: '',
        emailId: '',
        extentOfInterest: '',
        dateOfEntry: '',
        dateOfLeaving: '',
        votersId: '',
        residentialCertNo: ''
    });

    // State for the Partner Details Table (list of partners)
    const [partners, setPartners] = useState([]);

    // Loading and Error states for both API calls
    const [loadingMainContact, setLoadingMainContact] = useState(true);
    const [errorMainContact, setErrorMainContact] = useState(null);

    const [loadingPartners, setLoadingPartners] = useState(true);
    const [errorPartners, setErrorPartners] = useState(null);

    // --- useEffect for fetching Main Contact Data ---
    useEffect(() => {
        const fetchMainContactData = async () => {
            setLoadingMainContact(true);
            setErrorMainContact(null);
            try {
                // Replace with your actual API endpoint for main contact data
                // Example: /api/businessPartner/123 (if fetching a specific partner)
                // For a design preview, we'll use a Promise to simulate an async fetch
                const response = await new Promise(resolve => setTimeout(() => {
                    resolve({
                        applicantName: 'Actual Applicant Name from API',
                        slNo: '001',
                        personName: 'Jane Doe API',
                        fatherName: 'Richard Doe API',
                        dob: '1988-12-25',
                        partnerType: 'Partner', // Example: API returns 'Partner'
                        educationalQualification: 'M.Tech',
                        panNo: 'XYZAB9876C',
                        presentAddress: '123 API Street',
                        areaLocality: 'API Downtown',
                        villageTownCity: 'Agartala',
                        permanentAddress: '456 API Avenue, Agartala, Tripura',
                        telNo: '1234567890',
                        faxNo: '033-9876543',
                        emailId: 'jane.doe.api@example.com',
                        extentOfInterest: '75%',
                        dateOfEntry: '2018-03-10',
                        dateOfLeaving: '', // Could be null or empty if still active
                        votersId: 'API1234567',
                        residentialCertNo: 'API-98765'
                    });
                }, 1000)); // Simulate 1-second API delay

                setMainContact(response);
            } catch (err) {
                console.error("Error fetching main contact data:", err);
                setErrorMainContact(err);
            } finally {
                setLoadingMainContact(false);
            }
        };

        fetchMainContactData();
    }, []); // Empty dependency array means this runs once on component mount

    // --- useEffect for fetching Partners Table Data ---
    useEffect(() => {
        const fetchPartnersData = async () => {
            setLoadingPartners(true);
            setErrorPartners(null);
            try {
                // Replace with your actual API endpoint for partners list
                // Example: /api/partners/businessPartnerId
                const response = await new Promise(resolve => setTimeout(() => {
                    resolve([
                        {
                            id: 1,
                            name: 'Jane Smith from API',
                            fatherName: 'Robert Smith API',
                            street: '789 Oak Lane API',
                            area: 'Greenwood API',
                            place: 'Agartala',
                            telephone: '1112223333',
                            dateOfBirth: '1995-01-01',
                            dateOfEntry: '2022-01-01',
                            dateOfLeaving: '',
                            type: 'Partner'
                        },
                        {
                            id: 2,
                            name: 'Alice Brown from API',
                            fatherName: 'David Brown API',
                            street: '101 Pine Road API',
                            area: 'Lakeside API',
                            place: 'Agartala',
                            telephone: '4445556666',
                            dateOfBirth: '1980-03-10',
                            dateOfEntry: '2010-05-20',
                            dateOfLeaving: '',
                            type: 'Contact Person'
                        },
                        
                    ]);
                }, 1500)); // Simulate 1.5-second API delay

                setPartners(response);
            } catch (err) {
                console.error("Error fetching partners data:", err);
                setErrorPartners(err);
            } finally {
                setLoadingPartners(false);
            }
        };

        fetchPartnersData();
    }, []); // Empty dependency array means this runs once on component mount

    // Consolidated loading and error checks
    if (loadingMainContact || loadingPartners) {
        return <div className="text-center p-6">Loading business partner details and associated partners...</div>;
    }

    if (errorMainContact) {
        return <div className="text-center p-6 text-red-600">Error loading main contact: {errorMainContact.message}</div>;
    }

    if (errorPartners) {
        return <div className="text-center p-6 text-red-600">Error loading partners list: {errorPartners.message}</div>;
    }

    return (
        <div className="min-h-screen bg-slate-200 p-6 flex items-center justify-center">
            <div className="w-full max-w-6xl bg-slate-200 shadow-lg rounded-lg p-2">
                <div className="w-full mx-auto border border-blue-600">
                    <div className="border-r border-t border-l bg-sky-400 border-blue-600 w-full">
                        <div className="pl-1 text-black font-semibold flex justify-center">
                            [Business Partner details/Contact Person]
                        </div>
                    </div>
                    {/* Partner Type Selection - Controlled by mainContact data, disabled for display */}
                    <div className="border-r border-t border-l border-blue-600 w-full">
                        <div className="flex pl-7 text-gray-700 gap-3">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="partnerTypeSelection"
                                    value="Contact Person"
                                    checked={mainContact.partnerType === 'Contact Person'}
                                    disabled={true}
                                    className="mr-2"
                                />
                                Contact Person
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="partnerTypeSelection"
                                    value="Partner"
                                    checked={mainContact.partnerType === 'Partner'}
                                    disabled={true}
                                    className="mr-2"
                                />
                                Partner
                            </label>
                        </div>
                    </div>
                    {/* Form Fields populated from mainContact object */}
                    <div className="border-r border-t border-l border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                        <div className="pl-7 text-gray-700 font-medium">
                            Name of the Applicant
                        </div>
                        <div className="flex border-l border-blue-600 items-center p-1">
                            <div className="p-1 border border-black bg-gray-50 text-gray-700 w-11/12 h-[23px] flex items-center">
                                {mainContact.applicantName}
                            </div>
                        </div>
                    </div>
                    <div className="border-r border-t border-l border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                        <div className="pl-7 text-gray-700 font-medium">
                            Sl. No.
                        </div>
                        <div className="flex border-l border-blue-600 items-center gap-2 p-1">
                            <div className="p-1 border border-black bg-gray-50 text-gray-700 w-1/3 h-[23px] flex items-center">
                                {mainContact.slNo}
                            </div>
                        </div>
                    </div>
                    {/* Section 2: 20 Rows (approx), 2 Columns */}
                    <div className="border-r border-t border-l border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                        <div className="pl-7 text-gray-700 font-medium">
                            Name of the Person
                        </div>
                        <div className="flex border-l border-blue-600 items-center gap-2 p-1">
                            <div className="p-1 border border-black bg-gray-50 text-gray-700 w-11/12 h-[23px] flex items-center">
                                {mainContact.personName}
                            </div>
                        </div>
                    </div>
                    <div className="border-r border-t border-l border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                        <div className="pl-7 text-gray-700 font-medium">
                            Father's Name
                        </div>
                        <div className="flex border-l border-blue-600 items-center gap-2 p-1">
                            <div className="p-1 border border-black bg-gray-50 text-gray-700 w-11/12 h-[23px] flex items-center">
                                {mainContact.fatherName}
                            </div>
                        </div>
                    </div>
                    <div className="border-r border-t border-l border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                        <div className="pl-7 text-gray-700 font-medium">
                            Date of Birth
                        </div>
                        <div className="flex border-l border-blue-600 items-center gap-2 p-1">
                            <div className="p-1 border border-black bg-gray-50 text-gray-700 w-1/3 h-[23px] flex items-center">
                                {mainContact.dob}
                            </div>
                        </div>
                    </div>
                    <div className="border-r border-t border-l border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                        <div className="pl-7 text-gray-700 font-medium">
                            Partner Type/ Designation
                        </div>
                        <div className="flex border-l border-blue-600 items-center gap-2 p-1">
                            <div className="p-1 border border-black bg-gray-50 text-gray-700 w-3/5 h-[23px] flex items-center">
                                {mainContact.partnerType}
                            </div>
                        </div>
                    </div>
                    <div className="border-r border-t border-l border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                        <div className="pl-7 text-gray-700 font-medium">
                            Educational Qualification
                        </div>
                        <div className="flex border-l border-blue-600 items-center gap-2 p-1">
                            <div className="p-1 border border-black bg-gray-50 text-gray-700 w-1/3 h-[23px] flex items-center">
                                {mainContact.educationalQualification}
                            </div>
                        </div>
                    </div>
                    <div className="border-r border-t border-l border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                        <div className="pl-7 text-gray-700 font-medium">
                            PAN No.
                        </div>
                        <div className="flex border-l border-blue-600 items-center gap-2 p-1">
                            <div className="p-1 border border-black bg-gray-50 text-gray-700 w-1/3 h-[23px] flex items-center">
                                {mainContact.panNo}
                            </div>
                        </div>
                    </div>
                    <div className="border-r border-t border-l border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                        <div className="pl-7 text-gray-700 font-medium">
                            Present Address
                        </div>
                        <div className="flex border-l border-blue-600 items-center gap-2 p-1">
                            <div className="p-1 border border-black bg-gray-50 text-gray-700 w-11/12 h-[23px] flex items-center">
                                {mainContact.presentAddress}
                            </div>
                        </div>
                    </div>
                    <div className="border-r border-t border-l border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                        <div className="pl-7 text-gray-700 font-medium">
                            Area of Locality
                        </div>
                        <div className="flex border-l border-blue-600 items-center gap-2 p-1">
                            <div className="p-1 border border-black bg-gray-50 text-gray-700 w-11/12 h-[23px] flex items-center">
                                {mainContact.areaLocality}
                            </div>
                        </div>
                    </div>
                    <div className="border-r border-t border-l border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                        <div className="pl-7 text-gray-700 font-medium">
                            Village/ Town/ City
                        </div>
                        <div className="flex border-l border-blue-600 items-center gap-2 p-1">
                            <div className="p-1 border border-black bg-gray-50 text-gray-700 w-11/12 h-[23px] flex items-center">
                                {mainContact.villageTownCity}
                            </div>
                        </div>
                    </div>
                    <div className="border-r border-t border-l border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                        <div className="pl-7 text-gray-700 font-medium">
                            Permanent Address
                        </div>
                        <div className="flex border-l border-blue-600 items-center gap-2 p-1">
                            <div className="p-1 border border-black bg-gray-50 text-gray-700 w-11/12 h-[23px] flex items-center">
                                {mainContact.permanentAddress}
                            </div>
                        </div>
                    </div>
                    <div className="border-r border-t border-l border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                        <div className="pl-7 text-gray-700 font-medium">
                            {/* Empty div for layout */}
                        </div>
                        <div className="flex border-l border-blue-600 items-center gap-2 p-1">
                            <div className="p-1 border border-black bg-gray-50 text-gray-700 w-11/12 h-[23px] flex items-center">
                                {/* This div seems to be a duplicate or placeholder for an additional address line.
                                If it's intended for a second line of permanent address, you should name the state variable accordingly. */}
                            </div>
                        </div>
                    </div>
                    <div className="border-r border-t border-l border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                        <div className="pl-7 text-gray-700 font-medium">
                            <b>Contact Details</b>
                        </div>
                        <div className="flex border-l border-blue-600 items-stretch h-full gap-2 p-1">
                            {/* Empty div for layout */}
                        </div>
                    </div>
                    <div className="border-r border-t border-l border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                        <div className="pl-7 text-gray-700 font-medium">
                            Tel No.
                        </div>
                        <div className="flex border-l border-blue-600 items-center gap-2 p-1">
                            <div className="p-1 border border-black bg-gray-50 text-gray-700 w-1/3 h-[23px] flex items-center">
                                {mainContact.telNo}
                            </div>
                        </div>
                    </div>
                    <div className="border-r border-t border-l border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                        <div className="pl-7 text-gray-700 font-medium">
                            Fax No.
                        </div>
                        <div className="flex border-l border-blue-600 items-center gap-2 p-1">
                            <div className="p-1 border border-black bg-gray-50 text-gray-700 w-1/3 h-[23px] flex items-center">
                                {mainContact.faxNo}
                            </div>
                        </div>
                    </div>
                    <div className="border-r border-t border-l border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                        <div className="pl-7 text-gray-700 font-medium">
                            Email ID
                        </div>
                        <div className="flex border-l border-blue-600 items-center gap-2 p-1">
                            <div className="p-1 border border-black bg-gray-50 text-gray-700 w-4/6 h-[23px] flex items-center">
                                {mainContact.emailId}
                            </div>
                        </div>
                    </div>
                    <div className="border-r border-t border-l border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                        <div className="pl-7 text-gray-700 font-medium">
                            Extent of Interest in the Business (%)
                        </div>
                        <div className="flex border-l border-blue-600 items-stretch h-full gap-2 p-1">
                            <div className="p-1 border border-black bg-gray-50 text-gray-700 w-1/4 h-[23px] flex items-center">
                                {mainContact.extentOfInterest}
                            </div>
                        </div>
                    </div>
                    <div className="border-r border-t border-l border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                        <div className="pl-7 text-gray-700 font-medium">
                            Date of Entry To Partnership/<br />Date from which associated
                        </div>
                        <div className="grid grid-cols-[1fr_2fr_1fr] gap-x-4 items-center w-full">
                            <div className="border-l border-blue-600 items-stretch h-full gap-2 p-1">
                                <div className="p-1 border border-black bg-gray-50 text-gray-700 w-full h-[23px] flex items-center">
                                    {mainContact.dateOfEntry}
                                </div>
                            </div>
                            <div className="pl-7 border-l border-blue-600 items-stretch h-full text-gray-700 font-medium">
                                Date of leaving Partnership/<br />Date up to which associated
                            </div>
                            <div className="border-l border-blue-600 items-stretch h-full gap-2 p-1">
                                <div className="p-1 border border-black bg-gray-50 text-gray-700 w-full h-[23px] flex items-center">
                                    {mainContact.dateOfLeaving}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-r border-t border-l border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                        <div className="pl-7 text-gray-700 font-medium">
                            <b>Electrical Details</b>
                        </div>
                        <div className="flex border-l border-blue-600 items-stretch h-full gap-2 p-1">
                            {/* Empty div for layout */}
                        </div>
                    </div>
                    <div className="border-r border-t border-l border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                        <div className="pl-7 text-gray-700 font-medium">
                            Voters ID card No.
                        </div>
                        <div className="flex border-l border-blue-600 items-center gap-2 p-1">
                            <div className="p-1 border border-black bg-gray-50 text-gray-700 w-1/3 h-[23px] flex items-center">
                                {mainContact.votersId}
                            </div>
                        </div>
                    </div>
                    <div className="border border-blue-600 grid grid-cols-[1.4fr_3fr] gap-x-4 items-center w-full">
                        <div className="pl-7 text-gray-700 font-medium">
                            Residential Certificate No issued by the Jurisdictional revenue authority of the state in which the dealer resides
                        </div>
                        <div className="flex border-l border-blue-600 items-stretch h-full gap-2 p-1">
                            <div className="p-1 border border-black bg-gray-50 text-gray-700 w-1/3 h-[23px] flex items-center">
                                {mainContact.residentialCertNo}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center space-x-4 border-l border-r border-blue-600 p-1">
                        <div className="bg-violet-400 font-semibold text-white border border-blue-700 px-4">
                            [+]Add
                        </div>
                        <div className="bg-violet-400 font-semibold text-white border border-blue-700 px-4">
                            [!]Update
                        </div>
                        <div className="bg-violet-400 font-semibold text-white border border-blue-700 px-4">
                            [X]Delete
                        </div>
                    </div>
                    {/* Section 3: List of Partner Details Table - Populated from 'partners' array */}
                   <div className="border-l border-r border-t border-blue-600  items-center w-full">
                         <h3 className=" pl-7 text-gray-900 font-semibold flex justify-center">List of Partner Details</h3>

                     </div>
                     <div className="border border-blue-600  items-center w-full p-2">
                         <div className="overflow-x-auto">
                             <table className="min-w-full bg-white border border-black rounded-lg">
                                 <thead>
                                     <tr className="bg-blue-500 text-white">
                                         <th className="py-2 px-4 border-b border-r border-black text-left">Select</th>
                                         <th className="py-2 px-4 border-b border-r border-black text-left">Name</th>
                                         <th className="py-2 px-4 border-b border-r border-black text-left">Father Name</th>
                                         <th className="py-2 px-4 border-b border-r border-black text-left">Street</th>
                                         <th className="py-2 px-4 border-b border-r border-black text-left">Area</th>
                                         <th className="py-2 px-4 border-b border-r border-black text-left">Place</th>
                                         <th className="py-2 px-4 border-b border-r border-black text-left">Telephone</th>
                                         <th className="py-2 px-4 border-b border-r border-black text-left">Date of Birth</th>
                                         <th className="py-2 px-4 border-b border-r border-black text-left">Date of Entry</th>
                                         <th className="py-2 px-4 border-b border-r border-black text-left">Date of Leaving</th>
                                         <th className="py-2 px-4 border-b border-black text-left">Type</th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     {partners.map((partner) => (
                                        <tr key={partner.id} className="hover:bg-gray-50">
                                            <td className="py-2 px-4 border-b border-r border-black">
                                                <div className='form-checkbox h-4 w-4 border border-black'>

                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b border-r border-black">{partner.name}</td>
                                            <td className="py-2 px-4 border-b border-r border-black">{partner.fatherName}</td>
                                            <td className="py-2 px-4 border-b border-r border-black">{partner.street}</td>
                                            <td className="py-2 px-4 border-b border-r border-black">{partner.area}</td>
                                            <td className="py-2 px-4 border-b border-r border-black">{partner.place}</td>
                                            <td className="py-2 px-4 border-b border-r border-black">{partner.telephone}</td>
                                            <td className="py-2 px-4 border-b border-r border-black">{partner.dateOfBirth}</td>
                                            <td className="py-2 px-4 border-b border-r border-black">{partner.dateOfEntry}</td>
                                            <td className="py-2 px-4 border-b border-r border-black">{partner.dateOfLeaving}</td>
                                            <td className="py-2 px-4 border-b border-black">{partner.type}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
                {/* Navigation Buttons */}
                <div className="flex justify-center space-x-4 mt-6">
                    <button className="bg-blue-600 text-white px-6 font-bold hover:bg-blue-800">
                        Previous
                    </button>
                    <button className="bg-blue-600 text-white px-6 font-bold hover:bg-blue-800">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BusinessPartnerForm;