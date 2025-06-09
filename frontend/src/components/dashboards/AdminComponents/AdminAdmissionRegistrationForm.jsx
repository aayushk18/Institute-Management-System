import React, { useState } from 'react'

const AdminAdmissionRegistrationForm = () => {

    const [selectedOrder, setselectedOrder] = useState(null)
    const [selectedRef, setselectedRef] = useState(null)

    return (

        <div className='w-full p-5'>

            <h2 className="  text-lg sm:text-3xl md:text-2xl font-bold  text-gray-800 mb-8 content-center text-center">
                Update Registration Form
            </h2>
            <div className='p-5 rounded-md bg-white border-t-1 flex flex-col content-center  shadow-md border-gray-200 border  text-black'>

                <h3 className="text-lg font-medium text-gray-700 mb-4">Add New Fields</h3>

                <div className='flex flex-row justify-around'>
                    <span>Field Name</span>
                    <input placeholder='Enter field name' className='inset-shadow-sm border-b-1 border-gray-200 p-1 rounded-md' type="text" />
                    <span>Field Type</span>

                    <select className=' shadow-md rounded-md border-t-1 hover:bg-gray-50 border-gray-100 shadow-gray-200' name="" id="">
                        <option value="">Select Type</option>
                        <option value="">Text</option>
                        <option value="male">Select</option>
                        <option value="female">File</option>
                        <option value="other">Other</option>
                    </select>
                    <span>Order</span>
                    <select onChange={(e) => {
                        setselectedOrder(e.target.value)
                        setselectedRef('')
                    }} value={selectedOrder} className=' shadow-md rounded-md border-t-1 hover:bg-gray-50 border-gray-100 shadow-gray-200' name="" id="">
                        <option value="">Select Order</option>
                        <option value="Before">Before</option>
                        <option value="After">After</option>
                    </select>

                    {selectedOrder && (
                        <span>{selectedOrder}:</span>
                    )}

                    {selectedOrder && (
                        <select value={selectedRef}
                            onChange={(e) => {
                                setselectedRef(e.target.value)
                            }}
                            className=' shadow-md rounded-md border-t-1 hover:bg-gray-50 border-gray-100 shadow-gray-200' name="" id="">
                            <option value="First Name">First Name</option>
                            <option value="Middle Name">Middle Name</option>
                            <option value="male">LAst Name</option>
                            <option value="female">Roll No</option>
                            <option value="other">Other</option>
                        </select>
                    )}



                    <button className='bg-gray-500 text-white hover:bg-gray-600 p-2 rounded-sm'>
                        Add Field
                    </button>

                </div>



            </div>
        </div>

    )
}

export default AdminAdmissionRegistrationForm