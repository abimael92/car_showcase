import { CarProps, FilterProps } from '@/types';

export async function fetchCars(filters: FilterProps) {
    const { manufacturer, year, model, limit, fuel } = filters;

    // Set the required headers for the API request
    const headers: HeadersInit = {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY || '',
        // 'X-RapidAPI-Key': '717449cec2msh8e01a145ed06b37p1e5072jsn60ef7ff90bde',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
    };

    // Set the required headers for the API request
    const response = await fetch(
        `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
        {
            headers: headers,
        }
    );

    // Parse the response as JSON
    const result = await response.json();

    return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age

    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;

    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

    return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL('https://cdn.imagin.studio/getimage');
    const { make, model, year } = car;

    url.searchParams.append(
        'customer',
        process.env.NEXT_PUBLIC_IMAGIN_API_KEY || ''
    );
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(' ')[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    // url.searchParams.append('zoomLevel', zoomLevel);
    url.searchParams.append('angle', `${angle}`);

    return `${url}`;
};

/* 
rapidapi
https://rapidapi.com/apininjas/api/cars-by-api-ninjas
Cars by API-Ninjas

const url = 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '717449cec2msh8e01a145ed06b37p1e5072jsn60ef7ff90bde',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
} */
