import { MouseEventHandler } from 'react';

export interface CustomButtonProps {
    isDisabled?: boolean;
    btnType?: 'button' | 'submit';
    containerStyles?: string;
    textStyles?: string;
    title: string;
    rightIcon?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface SearchManuFacturerProps {
    manufacturer: string;
    setManuFacturer: (manufacturer: string) => void;
}

export interface CarProps {
    city_mpg: number;
    drive: string;
    fuel_type?: string;
    highway_mpg?: number;
    make: string;
    model: string;
    transmission: string;
    year: number;
    class?: string;  // Make these properties optional
    combination_mpg?: number;
    cylinders?: number;
    displacement?: number;
}



export interface FilterProps {
    manufacturer?: string;
    year?: number;
    model?: string;
    limit?: number;
    fuel?: string;
}



export interface HomeProps {
    searchParams: FilterProps;
}

export interface OptionProps {
    title: string;
    value: string;
}

export interface CustomFilterProps {
    title: string;
    options: OptionProps[];
}

export interface ShowMoreProps {
    pageNumber: number;
    isNext: boolean;
}
