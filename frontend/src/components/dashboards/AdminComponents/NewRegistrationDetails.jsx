import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';

import domtoimage from 'dom-to-image-more';

import { jsPDF } from "jspdf";

const NewRegistrationDetails = () => {

    const [selectedYear, setSelectedYear] = useState("2025");
    const location = useLocation();
    const state = location.state;
    const st = state?.pass;

    console.log(st);


    // console.log(student);
    const printRef = useRef();


    // const handlePrint = async () => {
    //     const node = printRef.current;

    //     const scale = 2;
    //     const width = node.offsetWidth;
    //     const height = node.scrollHeight;

    //     const param = {
    //         width: width * scale,
    //         height: height * scale,
    //         style: {
    //             transform: `scale(${scale})`,
    //             transformOrigin: 'top left',
    //             width: `${width}px`,
    //             height: `${height}px`,
    //         },
    //     };

    //     try {
    //         const dataUrl = await domtoimage.toPng(node, param);

    //         const img = new Image();
    //         img.src = dataUrl;

    //         img.onload = () => {
    //             const pdf = new jsPDF('p', 'pt', 'a4');
    //             const pageWidth = pdf.internal.pageSize.getWidth();
    //             const pageHeight = pdf.internal.pageSize.getHeight();

    //             const imgWidth = pageWidth;
    //             const imgHeight = (img.height * imgWidth) / img.width;

    //             let remainingHeight = imgHeight;
    //             let position = 0;

    //             while (remainingHeight > 0) {
    //                 pdf.addImage(
    //                     dataUrl,
    //                     'PNG',
    //                     0,
    //                     position,
    //                     imgWidth,
    //                     imgHeight
    //                 );
    //                 remainingHeight -= pageHeight;
    //                 position -= pageHeight;
    //                 if (remainingHeight > 0) {
    //                     pdf.addPage();
    //                 }
    //             }

    //             pdf.save('student-details.pdf');
    //         };
    //     } catch (error) {
    //         console.error("Error generating PDF:", error);
    //     }
    // };



    // const handlePrint = useReactToPrint({
    //     content: () => printRef.current,
    //     documentTitle: 'Student Details',
    // });













    const handlePrint = () => {
        const printContent = printRef.current.innerHTML;
        const win = window.open('', '', 'width=900,height=700');
        win.document.write(`
          <html>
            <head>
              <title>Print Preview</title>
              <style>
                body { font-family: sans-serif; padding: 20px; }
              </style>
            </head>
            <body>
              ${printContent}
            </body>
          </html>
        `);
        win.document.close();
        win.focus();
        win.print();
        win.close();
    };

    const marksData = {
        "2022": [
            { subject: "Math", ut1: 9, half: 35, ut2: 8, annual: 36 },
            { subject: "Science", ut1: 10, half: 38, ut2: 9, annual: 39 },
            { subject: "English", ut1: 8, half: 32, ut2: 9, annual: 37 },
        ],
        "2023": [
            { subject: "Math", ut1: 8, half: 36, ut2: 9, annual: 35 },
            { subject: "Science", ut1: 10, half: 37, ut2: 10, annual: 38 },
            { subject: "English", ut1: 9, half: 34, ut2: 8, annual: 36 },
        ],
        "2024": [
            { subject: "Math", ut1: 10, half: 38, ut2: 10, annual: 40 },
            { subject: "Science", ut1: 9, half: 37, ut2: 9, annual: 39 },
            { subject: "English", ut1: 8, half: 35, ut2: 8, annual: 37 },
        ],
        "2025": [
            { subject: "Math", ut1: 9 },
            { subject: "Science", ut1: 10 },
            { subject: "English", ut1: 8 },
        ],
    };




    return (
        <div>

            <div className="w-full h-full p-8">

                {/* Print button */}
                <div className="flex justify-end mb-4">
                    <button
                        onClick={handlePrint}
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                        Download PDF
                    </button>
                </div>

                <div className=" h-full">
                    <div ref={printRef} className="print-clean p-8"   >
                        {/* All your existing content here (student profile, marks, achievements, etc.) */}


                        <div className="   h-full   text-gray-800 space-y-8 ">

                            <div className="bg-gray-200 pt-4  border-4 shadow-md border-gray-200  ">
                                <div>
                                    <h1 className="text-3xl font-bold flex w-full justify-center text-gray-800  bg-gray-200    "> MADAN MOHAN PUBLIC SCHOOL</h1>
                                    <h2 className="text-2xl font-semibold flex w-full justify-center  bg-gray-200  text-gray-800  ">Vivek vihar, Delhi - 110092</h2>
                                </div>
                                <h3 className="text-xl font-semibold flex w-full justify-center text-gray-800 bg-gray-200   "> Student Registration Form</h3>


                                <h2 className="p-2 text-gray-800 font-bold bg-gray-200">Students Details</h2>
                                <div className="flex-row flex border-2 bg-white border-gray-200 ">
                                    <div className="w-full">

                                        <p className=" justify-items-center   p-6"><img className="h-50" src={`http://localhost:3000/pics/${st.studentpic}`} /></p>

                                    </div>
                                    <div className="w-full p-5 flex flex-row">
                                        <div className="w-full ">

                                            <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Name: </strong><span className="w-full">{st.firstName} {st.midName} {st.lastName}</span></div>
                                            <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Date of Birth: </strong><span className="w-full">{st.dob}</span></div>
                                            <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Category: </strong><span className="w-full">{st.category}</span></div>
                                            <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Quota: </strong><span className="w-full">{st.quota}</span></div>
                                            <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Alt Phone no: </strong><span className="w-full">{st.altphone}</span></div>
                                            <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Blood Group: </strong><span className="w-full">{st.bloodGroup}</span></div>

                                        </div>

                                    </div>
                                    <div className="w-full  p-5">
                                        <div className="w-full ">

                                            <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Class: </strong><span className="w-full">{st.StudentClass}</span></div>
                                            <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Gender: </strong><span className="w-full">{st.gender}</span></div>
                                            <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Sub- Category: </strong><span className="w-full">{st.subCategory}</span></div>
                                            <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Phone no.: </strong><span className="w-full">{st.phone}</span></div>
                                            <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Email: </strong><span className="w-full">{st.email}</span></div>


                                        </div>
                                    </div>




                                </div>
                                <h2 className="p-2 bg-gray-200 text-gray-800 font-bold">Parent Details</h2>

                                <div className="flex-row flex border-2 bg-white border-gray-200 ">

                                    <div className="w-full p-5">
                                        <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Father Name: </strong><span className="w-full">{st.fatherFirstName} {st.fatherMidName} {st.fatherLastName}</span></div>
                                        <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Mob no.: </strong><span className="w-full">{st.fatherPhone}</span></div>
                                        <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Occupation: </strong><span className="w-full">{st.fatherOccupation}</span></div>
                                        <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Office address: </strong><span className="w-full">{st.fatherOfficeAddress}</span></div>
                                        <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Office Phone: </strong><span className="w-full">{st.fatherOffice}</span></div>

                                    </div>
                                    <div className="w-full p-5">
                                        <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Mother Name: </strong><span className="w-full">{st.motherFirstName} {st.motherMidName} {st.motherLastName}</span></div>
                                        <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Mob no.: </strong><span className="w-full">{st.motherPhone}</span></div>
                                        <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Occupation: </strong><span className="w-full">{st.motherOccupation}</span></div>
                                        <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Office address: </strong><span className="w-full">{st.motherOfficeAddress}</span></div>
                                        <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Office Phone: </strong><span className="w-full">{st.motherOffice}</span></div>

                                    </div>
                                    <div className="w-full p-5">
                                        <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Guardian's Name: </strong><span className="w-full">{st.guardianFirstName} {st.guardianMidName} {st.guardianLastName}</span></div>
                                        <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full"> Mob no.: </strong><span className="w-full">{st.guardianPhone}</span></div>
                                        <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full"> Occupation: </strong><span className="w-full">{st.guardianOccupation}</span></div>
                                        <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full"> Office address: </strong><span className="w-full">{st.guardianOfficeAddress}</span></div>
                                        <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full"> Office Phone: </strong><span className="w-full">{st.guardianOffice}</span></div>

                                    </div>

                                </div>

                                <div className="flex-row flex border-2 border-gray-200 ">

                                    <div className="w-full ">
                                        <h2 className="p-2 bg-gray-200 text-gray-800 font-bold">Current Address</h2>
                                        <div className="grid grid-cols-2 bg-white p-5">

                                            <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">House/ Flat No. </strong><span className="w-full"> {st.currentHouseNo}</span></div>
                                            <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Street / Locality </strong><span className="w-full">{st.currentLocality}</span></div>
                                            <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">City / Town </strong><span className="w-full">{st.currentCity}</span></div>
                                            <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">District </strong><span className="w-full">{st.currentDistrict}</span></div>
                                            <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">State </strong><span className="w-full">{st.currentState}</span></div>
                                            <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">PIN Code </strong><span className="w-full">{st.currentPinCode}</span></div>

                                        </div>

                                    </div>
                                    <div className="w-full ">
                                        <h2 className="p-2 bg-gray-200 text-gray-800 font-semibold">Permanent Address</h2>
                                        <div className="grid grid-cols-2 bg-white p-5">


                                            <div className="hover:bg-gray-50  p-0.5 flex flex-row"><strong className="w-full">House/ Flat No. </strong><span className="w-full">{st.permanentHouseNo}</span></div>
                                            <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Street / Locality </strong><span className="w-full">{st.permanentLocality}</span></div>
                                            <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">City / Town </strong><span className="w-full">{st.permanentCity}</span></div>
                                            <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">District </strong><span className="w-full">{st.permanentDistrict}</span></div>
                                            <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">State </strong><span className="w-full">{st.permanentState}</span></div>
                                            <div className="hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">PIN Code </strong><span className="w-full">{st.permanentPinCode}</span></div>

                                        </div>
                                    </div>
                                </div>
                                <h2 className="p-2 bg-gray-200 text-gray-800 font-bold">Bank A/C Details</h2>

                                <div className="flex-row flex bg-white border-2 border-b-4 border-gray-200">
                                    <div className="w-full ">
                                        <div className="grid grid-cols-2 p-5">

                                            <div className=" hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Bank A/C No. </strong><span className="w-full">201112435637</span></div>
                                            <div className=" hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Bank Name </strong><span className="w-full">Bank of Maharastra</span></div>
                                            <div className=" hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">IFSC Code </strong><span className="w-full">MAHB0000322</span></div>
                                            <div className=" hover:bg-gray-50 p-0.5 flex flex-row"><strong className="w-full">Aadhar Card </strong><span className="w-full">4532 3432 4255</span></div>

                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 bg-white">
                                    <div>
                                        <p>
                                            I, _________________________ <strong>(Name of Parent/Guardian)</strong>, hereby declare that the information provided in this form is true and correct to the best of my knowledge. I understand that any false information may result in cancellation of admission.
                                        </p>
                                        <br />
                                        <br />
                                        <span>I also undertake to:</span>

                                        <ul>
                                            <br />
                                            <li>- Abide by all rules and regulations of the school.</li>
                                            <li>- Ensure my child attends school regularly and maintains discipline.</li>
                                            <li>- Pay the school fees as per the schedule.</li>
                                        </ul>
                                        <br />
                                        <br />
                                        <p>
                                            Signature of Parent/Guardian: _________________________<br></br>
                                            Name: _____________________________________________<br></br>
                                            Date: _______________
                                            <br />
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div >

        </div >
    )
}

export default NewRegistrationDetails




