import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import Slider from '@mui/material/Slider';

import { v4 as uuidv4 } from 'uuid';
import getCroppedImg from './getCroppedImg';

const CropGuardianImage = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [showCropper, setShowCropper] = useState(false);

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

    const handleCropSubmit = async () => {
        try {
            const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
            setCroppedImage(croppedImg);
            setShowCropper(false);
        } catch (err) {
            console.error('Cropping failed:', err);
        }
    };




    return (
        <div className=' bg-white w-full h-full rounded-2xl '>
            <div className=' border-2 rounded-xl border-gray-300'>
                <div className='w-full p-3'>

                    <div>
                        <input type="file" accept="image/*" onChange={handleImageChange} />

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
                                    <button className='p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition duration-300' onClick={handleCropSubmit}>Set Image</button>
                                </div>
                            </>
                        )}
                    </div>


                    {croppedImage && (
                        <div className='w-auto h-40'>
                            <h3>Cropped Image Preview:</h3>
                            <img className='w-fit h-30'
                                src={croppedImage}
                                alt="Cropped"
                                style={{ maxWidth: '100%', border: '1px solid #ccc' }}
                            />
                            <button className='p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition duration-300'>Submit</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}




export default CropGuardianImage;
