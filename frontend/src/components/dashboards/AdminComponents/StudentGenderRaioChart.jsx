// GenderRatioChart.jsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const StudentGenderRaioChart = ({ boys = 0, girls = 0 }) => {
    const data = {
        labels: ["Boys", "Girls"],
        datasets: [
            {
                data: [boys, girls],
                backgroundColor: ["#60a5fa", "#f472b6"],
                borderWidth: 2
            }
        ]
    };

    const options = {
        cutout: "70%", // Ring shape
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    };

    return (
        <div className="max-w-sm mx-auto bg-white p-4 ">
            <h2 className="text-lg font-semibold text-center mb-4">Gender Ratio</h2>
            <Doughnut data={data} options={options} />
            <div className="flex flex-row justify-center">

                <button className="p-1 px-5 h-fit text-white text-sm bg-gray-500 rounded-sm hover:bg-gray-600">Details</button>

            </div>
            {/* <div className="mt-4 flex flex-row justify-center text-center space-y-1">
                <p><span className="font-semibold">Boys:</span> {boys}</p>
                <p><span className="font-semibold">Girls:</span> {girls}</p>
            </div> */}
        </div>
    );
};

export default StudentGenderRaioChart;
