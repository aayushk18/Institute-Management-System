import React from 'react'
import pinData from './pincode_IN.json'


const pincode = (pin) => {


    console.log(pin);

    function findAddressByPincode(pincode) {
        const cleanPin = pincode.trim();

        console.log(cleanPin);


        for (const state in pinData) {



            const districts = pinData[state];


            for (const district in districts) {
                const areas = districts[district];
                for (const area in areas) {
                    if (areas[area].trim() === cleanPin) {
                        return {
                            state: state.trim(),
                            district: district.trim(),
                            area: area.trim(),
                            pincode: cleanPin
                        };
                    }
                }
            }
        }

        return null;
    }

    const result = findAddressByPincode(pin);
    console.log(result);





    return result;
}

export default pincode;