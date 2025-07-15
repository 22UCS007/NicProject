import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useParams, useNavigate } from "react-router-dom";

const API_BASE_URL_REGISTRATION = 'https://vat-portal-backend-nic.onrender.com/api/businessContact';
const API_BASE_URL_PARTNERS = 'https://vat-portal-backend-nic.onrender.com/api/businessPartners';

const BusinessPartnerForm = () => {
    const {tinNumber} = useParams();
    const navigate  = useNavigate();

    const [tin, setTin] = useState('TIN123456');
    const [mainContact, setMainContact] = useState({
        applicantName: '',
        slNo: '',
        personName: '',
        fatherName: '',
        dob: '',
        partnerType: 'Contact Person',
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

    const [partners, setPartners] = useState([]);

    const [loadingMainContact, setLoadingMainContact] = useState(true);
    const [errorMainContact, setErrorMainContact] = useState(null);

    const [loadingPartners, setLoadingPartners] = useState(true);
    const [errorPartners, setErrorPartners] = useState(null);

    const fetchMainContactData = async (currentTin) => {
        setLoadingMainContact(true);
        setErrorMainContact(null);
        const authToken = Cookies.get('authToken');

        if (!authToken) {
            setErrorMainContact(new Error('Authentication token not found. Please log in.'));
            setLoadingMainContact(false);
            return;
        }
        if (!currentTin) {
            setErrorMainContact(new Error('TIN is required to fetch registration details.'));
            setLoadingMainContact(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL_REGISTRATION}/${currentTin}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    Cookies.remove('authToken');
                    console.error("Authentication failed for main contact data. Please log in again.");
                }
                const errorData = await response.json();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message || response.statusText}`);
            }

            const data = await response.json();
            // FIX: Access the first element of the array
            if (Array.isArray(data) && data.length > 0) {
                setMainContact(data[0]);
            } else {
                // Handle case where no data is returned for the TIN
                setMainContact({
                    applicantName: '', slNo: '', personName: '', fatherName: '', dob: '',
                    partnerType: 'Contact Person', educationalQualification: '', panNo: '',
                    presentAddress: '', areaLocality: '', villageTownCity: '', permanentAddress: '',
                    telNo: '', faxNo: '', emailId: '', extentOfInterest: '', dateOfEntry: '',
                    dateOfLeaving: '', votersId: '', residentialCertNo: ''
                });
                console.log("No main contact data found for this TIN.");
            }
            console.log("Fetched main contact data:", data);
        } catch (err) {
            console.error("Error fetching main contact data:", err);
            setErrorMainContact(err);
        } finally {
            setLoadingMainContact(false);
        }
    };

    const fetchPartnersData = async (currentTin) => {
        setLoadingPartners(true);
        setErrorPartners(null);
        const authToken = Cookies.get('authToken');

        if (!authToken) {
            setErrorPartners(new Error('Authentication token not found. Please log in.'));
            setLoadingPartners(false);
            return;
        }
        if (!currentTin) {
            setErrorPartners(new Error('TIN is required to fetch partner details.'));
            setLoadingPartners(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL_PARTNERS}/${currentTin}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    Cookies.remove('authToken');
                    console.error("Authentication failed for partners data. Please log in again.");
                }
                const errorData = await response.json();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message || response.statusText}`);
            }

            const data = await response.json();
            setPartners(data);
            console.log("Fetched partners data:", data);
        } catch (err) {
            console.error("Error fetching partners data:", err);
            setErrorPartners(err);
        } finally {
            setLoadingPartners(false);
        }
    };

    useEffect(() => {
        fetchMainContactData(tin);
        fetchPartnersData(tin);
    }, [tin]);

    if (loadingMainContact || loadingPartners) {
        return <div className="text-center p-6">Loading business partner details and associated partners...</div>;
    }

    if (errorMainContact) {
        return <div className="text-center p-6 text-red-600">Error loading main contact: {errorMainContact.message}</div>;
    }

    if (errorPartners) {
        return <div className="text-center p-6 text-red-600">Error loading partners list: {errorPartners.message}</div>;
    }

    const handlePrevious = () => {
        navigate(`/form/businessplaces/${tinNumber}`); // Optional: pass tinNo back if PartA needs it on return
    };

    const handleNext = () => {
        // Before navigating, you might want to save Part B data to your backend
        // Or just proceed to Part C.
        console.log('Proceeding to Documents with TIN:', tinNumber);
        navigate(`/form/documents/${tinNumber}`); // Pass tinNo to Part C
    };

    return (
        <div className="min-h-screen bg-slate-200 p-6 flex items-center justify-center">
            <div className="w-full max-w-6xl bg-slate-200 shadow-lg rounded-lg p-2">
                <div className="w-full mx-auto border border-blue-600">
                    <div className="border-r border-t border-l bg-sky-400 border-blue-600 w-full">
                        <div className="pl-1 text-black font-semibold flex justify-center">
                            [Business Partner details/Contact Person]
                        </div>
                    </div>
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
                    <div className="border-l border-r border-t border-blue-600   items-center w-full">
                        <h3 className=" pl-7 text-gray-900 font-semibold flex justify-center">List of Partner Details</h3>
                    </div>
                    <div className="border border-blue-600   items-center w-full p-2">
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
                <div className="flex justify-center space-x-4 mt-6">
                    <button className="bg-blue-600 text-white px-6 font-bold py-2 rounded-md hover:bg-blue-800 transition duration-200" onClick={handlePrevious}>
                        Previous
                    </button>
                    <button className="bg-blue-600 text-white px-6 font-bold py-2 rounded-md hover:bg-blue-800 transition duration-200" onClick={handleNext}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BusinessPartnerForm;
