import { Patient } from '../types';
import { query, response } from './tools';

export const getPatients = async () => {

    // const results: Array<Patient> = [
    //     {
    //         id: '0', // should be uuid
    //         firstName: 'Alex',
    //         lastName: 'Elias',
    //         medication: '0', // should be uuid
    //     }
    // ];

    const { Items } = await query({
        IndexName: 'type-id',
        TableName: 'MedTable',
        ExpressionAttributeValues: {
            ':t': 'patient',
        },
        ExpressionAttributeNames: {
            '#t': 'type',
        },
        KeyConditionExpression: '#t=:t',
    });

    return response(200, Items);
};
