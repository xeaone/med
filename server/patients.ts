import { Patient } from '../types';

export const getPatients = () => {

    const results: Array<Patient> = [
        {
            id: '0', // should be uuid
            firstName: 'Alex',
            lastName: 'Elias',
            medication: '0', // should be uuid
        }
    ];

    return { statusCode: 200, body: JSON.stringify(results) };
};