import { Medication } from '../types';

export const getMedications = () => {

    const results: Array<Medication> = [
        {
            id: '1',
            title: 'Ibuprofen'
        }
    ];


    return { statusCode: 200, body: JSON.stringify(results) };
};