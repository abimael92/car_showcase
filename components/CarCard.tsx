'use client';

import { CarProps } from '@/types';
import Image from 'next/image';
import CustomButton from './CustomButton';
import { useState, useEffect } from 'react';
import { calculateCarRent, generateCarImageUrl } from '@/utils';
import CarDetails from './CarDetails';

interface CarCardProps {
    car: CarProps;
}

const driveType = (drive: string) => {
    switch (drive.toLowerCase()) {
        case 'f':
            return {
                abbreviation: 'FWD',
                fullText: 'Front-Wheel Drive'
            };
        case 'r':
            return {
                abbreviation: 'RWD',
                fullText: 'Rear-Wheel Drive'
            };
        case '4':
            return {
                abbreviation: 'AWD',
                fullText: 'All-Wheel Drive'
            };
        case '4x4':
            return {
                abbreviation: '4x4',
                fullText: 'Four-Wheel Drive'
            };
        default:
            return {
                abbreviation: 'Unknown',
                fullText: 'Unknown Drive Type'
            };
    }
};


const CarCard = ({ car }: CarCardProps) => {
    const { city_mpg, year, make, model, transmission, drive } = car;

    const [isOpen, setIsOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const carRent = calculateCarRent(city_mpg, year);

    useEffect(() => {
        const fetchImageUrl = async () => {
            const url = await generateCarImageUrl(car);
            setImageUrl(url);
        };

        fetchImageUrl();
    }, [car]);

    return (
        <div className="car-card group">
            <div className="car-card__content">
                <h2 className="car-card__content-title">
                    {make} {model}
                </h2>
            </div>
            <p className="flex mt-6 text-[32px] leading-[38px] font-extrabold">
                <span className="self-start text-[14px] leading-[17px] font-semibold">
                    $
                </span>
                {carRent}
                <span className="self-end text-[14px] leading-[17px] font-medium">
                    /day
                </span>
            </p>
            <div className="relative w-full h-40 my-3 object-contain">
            {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt="car model"
                        width={500}   // Example width
                        height={300}  // Example height
                        unoptimized
                        className="object-contain"
                        style={{ maxWidth: '100%', height: 'auto' }} // Makes the image responsive
                    />
                ) : (
                    <div>Loading...</div>  // Display a loading state until image is ready
                )}
            </div>
            <div className="relative flex w-full mt-2">
                <div className="flex group-hover:invisible w-full justify-between text-grey">
                    <div className="flex flex-col justify-center items-center gap-2">
                        <Image
                            src="/steering-wheel.svg"
                            width={20}
                            height={20}
                            alt="steering wheel"
                        />
                        <div className="car-card__icon-text">
                                <p className="drive-type"> {transmission === 'a' ? 'Automatic' : 'Manual'}</p>
                        </div>
                    </div>
                    <div className="car-card__icon">
                        <Image
                            src="/tire.svg"
                            width={20}
                            height={20}
                            alt="seat"
                        />
                            <div className="car-card__icon-text">
                                <p className="drive-type">{`(${driveType(drive).abbreviation})`}</p>
                                <p className="full-text">{driveType(drive).fullText}</p>
                        </div>
                    </div>
                    <div className="car-card__icon">
                        <Image
                            src="/gas.svg"
                            width={20}
                            height={20}
                            alt="seat"
                        />
                        <p className="car-card__icon-text">{city_mpg} MPG</p>
                    </div>
                </div>

                <div className="car-card__btn-container">
                    <CustomButton
                        title="View More"
                        containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
                        textStyles="text-white text-[14px] leading-[17px] font-bold"
                        rightIcon="/right-arrow.svg"
                        handleClick={() => setIsOpen(true)}
                    />
                </div>
            </div>
            <CarDetails
                isOpen={isOpen}
                closeModal={() => setIsOpen(false)}
                car={car}
            />
        </div>
    );
};

export default CarCard;
