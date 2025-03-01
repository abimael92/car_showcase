'use client';

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components';
import { fuels, yearsOfProduction } from '@/constants';
import { HomeProps } from '@/types';
import { fetchCars } from '@/utils';
import Head from 'next/head';
import { useEffect, useState } from 'react';




export default function Home({ searchParams }: HomeProps) {
    const [allCars, setAllCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const top10SoldCars = [
        // { 
        //     make: 'Toyota', model: 'Corolla', year: 2021, image: '/images/toyota-corolla.jpg', 
        //     city_mpg: 30, transmission: 'a', drive: 'f', class: 'compact', combination_mpg: 35, cylinders: 4, displacement: 1.8 
        // },
        { 
            make: 'Honda', model: 'Civic', year: 2021, image: '/images/honda-civic.jpg', 
            city_mpg: 32, transmission: 'a', drive: 'f', class: 'compact', combination_mpg: 36, cylinders: 4, displacement: 2.0 
        },
        // { 
        //     make: 'Tesla', model: 'Model 3', year: 2021, image: '/images/tesla-model-3.jpg', 
        //     city_mpg: 120, transmission: 'a', drive: 'f', class: 'electric', combination_mpg: 130, cylinders: 0, displacement: 0 
        // },
        { 
            make: 'Ford', model: 'F-150', year: 2021, image: '/images/ford-f150.jpg', 
            city_mpg: 20, transmission: 'a', drive: 'r', class: 'truck', combination_mpg: 22, cylinders: 6, displacement: 3.5 
        },
        { 
            make: 'Chevrolet', model: 'Silverado', year: 2021, image: '/images/chevrolet-silverado.jpg', 
            city_mpg: 19, transmission: 'a', drive: 'r', class: 'truck', combination_mpg: 21, cylinders: 8, displacement: 5.3 
        },
        { 
            make: 'Ram', model: '1500', year: 2021, image: '/images/ram-1500.jpg', 
            city_mpg: 18, transmission: 'a', drive: 'r', class: 'truck', combination_mpg: 20, cylinders: 8, displacement: 5.7 
        },
        { 
            make: 'Toyota', model: 'RAV4', year: 2021, image: '/images/toyota-rav4.jpg', 
            city_mpg: 28, transmission: 'a', drive: 'f', class: 'SUV', combination_mpg: 30, cylinders: 4, displacement: 2.5 
        },
        { 
            make: 'Honda', model: 'CR-V', year: 2021, image: '/images/honda-crv.jpg', 
            city_mpg: 27, transmission: 'a', drive: 'f', class: 'SUV', combination_mpg: 29, cylinders: 4, displacement: 2.4 
        },
        { 
            make: 'BMW', model: 'X5', year: 2021, image: '/images/bmw-x5.jpg', 
            city_mpg: 21, transmission: 'a', drive: 'a', class: 'SUV', combination_mpg: 23, cylinders: 6, displacement: 3.0 
        },
        { 
            make: 'Nissan', model: 'Altima', year: 2021, image: '/images/nissan-altima.jpg', 
            city_mpg: 27, transmission: 'a', drive: 'f', class: 'sedan', combination_mpg: 30, cylinders: 4, displacement: 2.5 
        }
    ];
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cars = await fetchCars({
                    manufacturer: searchParams.manufacturer || '',
                    year: searchParams.year || 2024,
                    fuel: searchParams.fuel || '',
                    limit: searchParams.limit || 6,
                    model: searchParams.model || '',
                });
                setAllCars(cars);
            } catch (err) {
                setError('Failed to fetch cars.');
            } finally {
                setIsLoading(false);
            }
        };

        if (searchParams) {
            fetchData();
        }
    }, [searchParams]); // Only re-fetch if searchParams change

    const isDataEmpty =
        !Array.isArray(allCars) || allCars.length < 1 || !allCars;

    const carsToDisplay = isDataEmpty ? top10SoldCars : allCars;

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="overflow-hidden">
                <Hero />

                <div className="mt-12 padding-x padding-y max-width" id="discover">
                    <div className="home__text-container">
                        <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
                        <p>Explore our cars you might like</p>
                    </div>

                    <div className="home__filters">
                        <SearchBar />
                        <div className="home__filter-container">
                            <CustomFilter title="fuel" options={fuels} />
                            <CustomFilter title="year" options={yearsOfProduction} />
                        </div>
                    </div>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <section>
                            <div className="home__cars-wrapper">
                                {carsToDisplay?.map((carData, index) => (
                                    <CarCard key={index} car={carData} />
                                ))}
                            </div>
                            <ShowMore
                                pageNumber={(searchParams.limit || 10) / 10}
                                isNext={(searchParams.limit || 10) > carsToDisplay.length}
                            />
                        </section>
                    )}
                    {isDataEmpty || top10SoldCars && (
                        <div className="home__error-container">
                            <h2 className="text-black text-xl font-bold">
                                Oops, no results
                            </h2>
                            <p>{error || 'No cars found matching the search criteria. Showing top 10 most sold cars.'}</p>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
