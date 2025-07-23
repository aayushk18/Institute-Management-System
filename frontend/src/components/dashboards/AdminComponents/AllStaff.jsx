import React from 'react'
import { useState } from 'react'

export const AllStaff = () => {



    const [loginID, setLoginID] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [designation, setDesignation] = useState('');

    const [selectedBranch, setSelectedBranch] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedSubRole, setSelectedSubRole] = useState("");


    const schoolJobs = [

        {
            branch: "Academic Staff",
            roles: [
                { name: "Primary School Teacher" },
                { name: "Secondary School Teacher", sub_roles: ["Math", "Science", "English", "History"] },
                { name: "Special Education Teacher" },
                { name: "Physical Education (PE) Teacher" },
                { name: "Art/Music/Dance Teacher", sub_roles: ["Art", "Music", "Dance"] },
                { name: "Language Teacher", sub_roles: ["French", "Spanish", "German"] },
                { name: "Computer Science/ICT Teacher" },
                { name: "Substitute Teacher" },
                { name: "Teaching Assistant / Paraprofessional" }
            ]
        },

        {
            branch: "Administrative Staff",
            roles: [
                { name: "Principal / Headmaster" },
                { name: "Vice Principal / Assistant Principal" },
                { name: "School Administrator" },
                { name: "Academic Coordinator" },
                { name: "Admissions Officer" },
                { name: "Registrar" },
                { name: "Front Desk Receptionist" },
                { name: "Office Assistant / Clerk" },
                { name: "HR Officer" },
                { name: "School Counselor / Guidance Counselor" }
            ]
        },
        {
            branch: "Support & Maintenance Staff",
            roles: [
                { name: "Librarian" },
                { name: "IT Technician / Network Administrator" },
                { name: "Janitor / Custodian" },
                { name: "Security Guard" },
                { name: "Bus Driver" },
                { name: "Bus Attendant" },
                { name: "Maintenance Worker" },
                { name: "Lab Technician" },
                { name: "Groundskeeper" }
            ]
        },
        {
            branch: "Food Service Staff",
            roles: [
                { name: "Cafeteria Manager" },
                { name: "Cook / Chef" },
                { name: "Kitchen Helper / Food Server" },
                { name: "Nutritionist" }
            ]
        },
        {
            branch: "Student Support Services",
            roles: [
                { name: "School Psychologist" },
                { name: "Social Worker" },
                { name: "Speech Therapist" },
                { name: "Occupational Therapist" },
                { name: "Nurse / Health Aide" },
                { name: "Career Counselor" }
            ]
        },
        {
            branch: "Finance & Procurement",
            roles: [
                { name: "Accountant / Bursar" },
                { name: "Procurement Officer" },
                { name: "Fee Collection Clerk" }
            ]
        }
    ];



    const handleBranchChange = (e) => {
        setSelectedBranch(e.target.value);
        setSelectedRole("");
        setSelectedSubRole("");
    };

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
        setSelectedSubRole("");
    };

    const currentBranch = schoolJobs.find(b => b.branch === selectedBranch);
    const currentRole = currentBranch?.roles.find(r => r.name === selectedRole);







    const [IsGenderOption, setIsGenderOption] = useState(false)
    return (
        <div>
            <form

                className='grid md:grid-cols-4 gap-6 sm:gap-8 relative p-6 md:p-10 shadow-md bg-orange-500 rounded-3xl shadow-gray-500'
            >


                <div className="">
                    <label className="block text-white mb-2">Login ID</label>
                    <input
                        type="text"
                        value={loginID}
                        onChange={(e) => setLoginID(e.target.value)}
                        className="p-4 rounded-md w-full text-white placeholder-gray-400 border-white border-2 "
                        placeholder="Enter login ID"
                        required
                    />
                </div>

                <div className="">
                    <label className="block text-white mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-4 rounded-md w-full text-white placeholder-gray-400 border-white border-2 "
                        placeholder="Enter password"
                        required
                    />
                </div>

                <div className="">
                    <label className="block text-white mb-2">First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="p-4 rounded-md w-full text-white placeholder-gray-400 border-white border-2 "
                        placeholder="Enter first name"
                        required
                    />
                </div>

                <div className="">
                    <label className="block text-white mb-2">Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="p-4 rounded-md w-full text-white placeholder-gray-400 border-white border-2 "
                        placeholder="Enter last name"
                        required
                    />
                </div>

                <div className="">
                    <label className="block text-white mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-4 rounded-md w-full text-white placeholder-gray-400 border-white border-2 "
                        placeholder="Enter email"
                        required
                    />
                </div>

                <div className="">
                    <label className="block text-white mb-2">Gender</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="p-4 rounded-md w-full text-white placeholder-gray-400 border-white border-2 "
                        required
                    >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="">
                    <label className="block text-white mb-2">Date of Birth</label>
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="p-4 rounded-md w-full text-white placeholder-gray-400 border-white border-2  "
                        required
                    />
                </div>

                <div className="col-span-4  ">
                    <label className=" text-white text-3xl block  mb-2 ">Designation</label>

                    <div className='grid grid-cols-4 gap-5 text-white'>




                        <div className='' >
                            <label className="block mb-2">Branch</label>
                            <select
                                value={selectedBranch}
                                onChange={handleBranchChange}
                                className="p-4 rounded-md w-full text-white placeholder-gray-400 border-white border-2 "
                            >
                                <option value="">Select a branch</option>
                                {schoolJobs.map((b, i) => (
                                    <option key={i} value={b.branch}>{b.branch}</option>
                                ))}
                            </select>
                        </div>

                        {selectedBranch && (
                            <div>
                                <label className="block mb-2">Role</label>
                                <select
                                    value={selectedRole}
                                    onChange={handleRoleChange}
                                    className="p-4 rounded-md w-full text-white placeholder-gray-400 border-white border-2 "
                                >
                                    <option value="">Select a role</option>
                                    {currentBranch?.roles.map((r, i) => (
                                        <option key={i} value={r.name}>{r.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}


                        {selectedRole && currentRole?.sub_roles && (
                            <div>
                                <label className="block mb-2">Sub Role</label>
                                <select
                                    value={selectedSubRole}
                                    onChange={(e) => setSelectedSubRole(e.target.value)}
                                    className="p-4 rounded-md w-full text-white placeholder-gray-400 border-white border-2 "
                                >
                                    <option value="">Select a sub-role</option>
                                    {currentRole.sub_roles.map((sub, i) => (
                                        <option key={i} value={sub}>{sub}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>


                </div>




            </form>
        </div>
    )
}
