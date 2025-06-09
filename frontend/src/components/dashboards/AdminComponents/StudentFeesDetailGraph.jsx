// FeeStatusRingChart.jsx

import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Mock data for demo
const feeData = {
    "Current Month": { submitted: 100, pending: 25 },
    "Previous Month": { submitted: 90, pending: 35 },
    "Previous 3 Months": { submitted: 280, pending: 70 },
    "Previous 6 Months": { submitted: 540, pending: 100 }
};

const StudentFeesDetailGraph = () => {
    const [selectedRange, setSelectedRange] = useState("Current Month");

    const { submitted, pending } = feeData[selectedRange];

    const data = {
        labels: ["Submitted", "Pending"],
        datasets: [
            {
                data: [submitted, pending],
                backgroundColor: ["#34d399", "#f87171"],
                borderWidth: 2
            }
        ]
    };

    const options = {
        cutout: "70%",
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    };

    return (
        <div className="max-w-sm mx-auto bg-white p-4 ">
            <h2 className="text-xl font-semibold text-center mb-4">Fees Status</h2>


            <Doughnut data={data} options={options} />
            <div className="flex  flex-row justify-between">
                <select
                    className=" text-sm w-fit  p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={selectedRange}
                    onChange={(e) => setSelectedRange(e.target.value)}
                >
                    <option>Current Month</option>
                    <option>Previous Month</option>
                    <option>Previous 3 Months</option>
                    <option>Previous 6 Months</option>
                </select>
                <button className="p-1 h-fit px-5 text-white text-sm bg-gray-500 rounded-sm hover:bg-gray-600">Details</button>

            </div>
            {/* 
            <div className="mt-6 text-center">
                <p className="text-lg font-medium text-green-600">✅ Submitted: {submitted}</p>
                <p className="text-lg font-medium text-red-500">⏳ Pending: {pending}</p>
            </div> */}
        </div>
    );
};

export default StudentFeesDetailGraph;
