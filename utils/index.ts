import { CarProps, FilterProps } from '@/types';


export async function fetchCars(filters: FilterProps) {
    const { manufacturer, year, model, limit, fuel } = filters;

    // Set the headers for the API request
    const headers: HeadersInit = {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY || '',
        'X-RapidAPI-Host': process.env.RAPID_API_BASE_URL || 'https://car-api2.p.rapidapi.com/'
    };

    const apiBaseUrl = process.env.RAPID_API_BASE_URL || 'https://car-api2.p.rapidapi.com/'; // Fallback to default if not found

    const response = await fetch(
        `${apiBaseUrl}api/bodies?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
        {
            headers: headers,
        }
    );

    // Parse the response as JSON
    const result = await response.json();

    return result;
}


export async function fetchCars2(filters: FilterProps) {
    const { manufacturer, year, model, limit, fuel } = filters;

    // Set the headers for the API request
    const headers: HeadersInit = {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY || '',
        'X-RapidAPI-Host': process.env.RAPID_API_BASE_URL || 'https://car-api2.p.rapidapi.com/'
    };

    const apiBaseUrl = process.env.RAPID_API_BASE_URL || 'https://car-api2.p.rapidapi.com/'; // Fallback to default if not found

    const response = await fetch(
        `${apiBaseUrl}api/bodies?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
        {
            headers: headers,
        }
    );

    // Parse the response as JSON
    const result = await response.json();

    return result;
}

export async function fetchCars3(filters: FilterProps) {
    const { manufacturer, model } = filters;

    const headers: HeadersInit = {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY || '',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
    };

    const apiBaseUrl = 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars';
    const apiUrl = `${apiBaseUrl}?model=${model}`;

    console.log('Requesting URL:', apiUrl);  // Check if the URL is formed correctly

    const response = await fetch(apiUrl, {
        headers: headers,
    });

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

export const generateCarImageUrl = async (car: CarProps) => {
    const { make, model, year } = car;
    const query = `${make} ${model} ${year}`;
  
    const url = `https://cars-database-with-image.p.rapidapi.com/api/search?q=${encodeURIComponent(query)}&page=1`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'cars-database-with-image.p.rapidapi.com',
          'x-rapidapi-key': '717449cec2msh8e01a145ed06b37p1e5072jsn60ef7ff90bde', // Your RapidAPI key
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);  // Log the full response
  
        const imageUrl = data?.results?.[0]?.image; // Access the image field in the response
  
        if (imageUrl) {
            console.log(imageUrl);
            
          return imageUrl; // Return the car image URL
        } else {
          console.error('No image URL found in the response.');
        }
      } else {
        console.error('Failed to fetch car image data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching car image:', error);
    }
  };
  

export const generateCarImageUrl2 = async (car: CarProps) => {
    const { make, model, year } = car;
    const url = `https://www.carimagery.com/api.asmx/GetImageUrl?searchTerm=${encodeURIComponent(`${make} ${model} ${year}`)}`;
    
    // Proxy URL (CORS Anywhere)
    // const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const corsProxyUrl = 'https://api.allorigins.win/get?url=';

    
    try {
        const response = await fetch(corsProxyUrl + url, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Origin': 'http://localhost:3000', // Replace with your frontend URL
                'X-Requested-With': 'XMLHttpRequest',
            },
        });

        if (response.ok) {
            // Check the content type of the response
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/xml')) {
                const xmlText = await response.text(); // Get the response as plain text
                console.log('XML Response:', xmlText);
                
                // Parse the XML to extract the image URL
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
                const imageUrl = xmlDoc.getElementsByTagName('string')[0]?.textContent;
                
                if (imageUrl) {
                    return imageUrl; // Return the extracted URL
                } else {
                    console.error('Image URL not found in response');
                }
            } else {
                const data = await response.json(); // If it's JSON, parse as JSON
                return data;
            }
        } else {
            console.error('Failed to fetch image data:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error fetching image:', error);
    }
};




export const updateSearchParams = (type: string, value: string) => {
    // Get the current URL search params
    const searchParams = new URLSearchParams(window.location.search);

    // Set the specified search parameter to the given value
    searchParams.set(type, value);

    // Set the specified search parameter to the given value
    const newPathName = `${
        window.location.pathname
    }?${searchParams.toString()}`;

    return newPathName;
};

export async function fetchModels(filters: FilterProps) {
    const { manufacturer, year, model, limit, fuel } = filters;

    const headers: HeadersInit = {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY || '',
        'X-RapidAPI-Host': process.env.RAPID_BASE_URL|| '',
    };

    try {
        const response = await fetch(
            `${process.env.RAPID_API_BASE_URL}api/models?manufacturer=${manufacturer}`
        );
        const data = await response.json();
        return data.models; // Assuming the API response provides an array of model names
    } catch (error) {
        console.error('Error fetching models:', error);
        return []; // Return an empty array in case of error
    }
}
