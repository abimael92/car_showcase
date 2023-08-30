'use client';

import { useState, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';

import { fetchModels } from '@/utils';

interface SearchModelProps {
    manufacturer: string; // Define the type for the manufacturer prop
}

const SearchModel = ({ manufacturer }: SearchModelProps) => {
    console.log('manufacturer: ', manufacturer);
    const [modelOptions, setModelOptions] = useState<string[]>([]);

    const [query, setQuery] = useState('');

    // Function to fetch model options based on manufacturer
    const fetchModelOptions = async (manufacturer: any) => {
        console.log('manufacturer: ', manufacturer);
        try {
            const models = await fetchModels({
                manufacturer: manufacturer,
                year: 2022,
                fuel: '',
                limit: 10,
                model: '',
            });
            console.log('models: ', models);
            setModelOptions(models);
        } catch (error) {
            console.error('Error fetching model options:', error);
        }
    };

    console.log('modelOptions: ', modelOptions);

    return (
        <Combobox>
            <Combobox.Input
                className="searchbar__input"
                placeholder="Jetta..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={fetchModelOptions} // Fetch models when the input is focused
            />

            <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery('')}
            >
                <Combobox.Options
                    className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    static
                >
                    {modelOptions &&
                        modelOptions.map(item => (
                            <Combobox.Option
                                key={item}
                                className={({ active }) =>
                                    `relative search-manufacturer__option ${
                                        active
                                            ? 'bg-primary-blue text-white'
                                            : 'text-gray-900'
                                    }`
                                }
                                value={item}
                            >
                                {({ selected, active }) => (
                                    <>
                                        <span
                                            className={`block truncate ${
                                                selected
                                                    ? 'font-medium'
                                                    : 'font-normal'
                                            }`}
                                        >
                                            {item}
                                        </span>
                                        {selected ? (
                                            <span
                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                    active
                                                        ? 'text-white'
                                                        : 'text-primary-purple'
                                                }`}
                                            ></span>
                                        ) : null}
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                </Combobox.Options>
            </Transition>
        </Combobox>
    );
};

export default SearchModel;
