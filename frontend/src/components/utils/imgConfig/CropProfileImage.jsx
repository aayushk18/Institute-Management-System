import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import Slider from '@mui/material/Slider';

import { v4 as uuidv4 } from 'uuid';
import getCroppedImg from './getCroppedImg';
import { useAdminStore } from '../useAuthStore';
import toast from 'react-hot-toast';

const CropProfileImage = ({ student }) => {

    console.log(student?.studentpic);

    const { setStudentpic } = useAdminStore()


    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [showCropper, setShowCropper] = useState(false);

    const formData = new FormData();

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result);
            setShowCropper(true);
            setCroppedImage(null); // reset previous crop
        };
        reader.readAsDataURL(file);
    };

    const handleCropSubmit = async (e) => {

        e.preventDefault()
        try {
            const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
            setCroppedImage(croppedImg);
            setShowCropper(false);
        } catch (err) {
            console.error('Cropping failed:', err);
        }
    };

    const finalSubmit = async (e) => {
        try {

            e.preventDefault()
            // Convert base64 cropped image to a Blob
            const blob = await fetch(croppedImage).then(res => res.blob());

            // Convert Blob to File (with .jpg extension)
            const fileName = `${student.firstName}_${student.StudentClass}_${student.phone}_${uuidv4()}.jpg`;
            const file = new File([blob], fileName, { type: 'image/jpeg' });

            // Create a FormData object

            formData.append('file', file);

            // Add student info
            formData.append('firstName', student.firstName);
            formData.append('email', student.email);
            formData.append('StudentClass', student.StudentClass);
            // formData.append('_id', student._id);

            // 🔁 Example API call (adjust endpoint and method as needed)


            const success = await setStudentpic(formData)
            if (success == true) {
                setCroppedImage(false)
            }

        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Image upload failed.');
        }
    };





    return (
        <div className=' bg-white w-full h-full rounded-2xl '>
            <div className=' '>
                <div className='w-full flex flex-col justify-items-center p-3'>
                    {!showCropper && !croppedImage && (<img className='h-40 self-center rounded-sm w-30' src={`http://localhost:3000/pics/${student?.studentpic}`} />)}
                    <div className='w-full overflow-hidden'>
                        <input
                            className="block relative  w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 p-2"
                            type="file" accept="image/*" onChange={handleImageChange} />

                        {showCropper && (
                            <>
                                <div className=''
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                        maxWidth: 150,
                                        height: 200,
                                        marginTop: 20,
                                        background: '#222',
                                    }}
                                >
                                    <Cropper
                                        image={imageSrc}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={3 / 4} // Portrait aspect ratio
                                        onCropChange={setCrop}
                                        onZoomChange={setZoom}
                                        onCropComplete={onCropComplete}
                                        cropShape="rect"
                                        showGrid={false}
                                        style={{
                                            containerStyle: {
                                                width: '100%',
                                                height: '100%',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                            },
                                            mediaStyle: {
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain',
                                            },
                                        }}
                                    />
                                </div>

                                <div className='w-full' style={{ marginTop: 10 }}>
                                    <Slider
                                        value={zoom}
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        onChange={(e, z) => setZoom(z)}
                                    />
                                    <button className='p-1 bg-gray-500 m-1 font-semibold text-sm rounded-md text-white hover:bg-gray-600 w-full transition duration-300' onClick={(e) => handleCropSubmit(e)}>Set Image</button>
                                </div>
                            </>
                        )}
                    </div>


                    {croppedImage && (
                        <div className='w-auto h-40 rounded-sm'>

                            <img className='w-fit h-30'
                                src={croppedImage}
                                alt="Cropped"
                                style={{ maxWidth: '100%', border: '1px solid #ccc' }}
                            />
                            <button onClick={(e) => finalSubmit(e)} className='p-1 bg-gray-500 m-1 font-semibold text-sm w-full rounded-md text-white hover:bg-gray-600'>Submit</button>
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}




export default CropProfileImage;
