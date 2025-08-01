import { Patient, Payload } from '../types';
import { put, query, response } from './tools';
import { ulid } from 'ulid';

export const getPatient = async (payload: Payload) => {

    const id = payload && 'id' in payload ? payload.id : '';

    if (!id) return response(400, { message: 'Patient ID Required' });

    const { Items } = await query({
        Limit: 1,
        IndexName: 'type-id',
        TableName: 'MedTable',
        ExpressionAttributeValues: {
            ':t': 'patient',
            ':i': id,
        },
        ExpressionAttributeNames: {
            '#t': 'type',
            '#i': 'id',
        },
        KeyConditionExpression: '#t=:t AND #i=:i',
    });

    if (!Items?.[ 0 ]) return response(400, { message: 'Patient Not Found' });

    return response(200, Items[ 0 ]);
};

export const putPatient = async (payload: Payload) => {

    const {
        id,
        lastName,
        firstName,
    } = (payload as Patient) ?? {};

    if (!firstName) return response(400, { message: 'Medication First Name Required' });
    if (!lastName) return response(400, { message: 'Medication Last Name Required' });

    const Item = {
        id: id || ulid(),
        type: 'patient',
        firstName,
        lastName,
    };

    await put({ TableName: 'MedTable', Item });

    return response(200, Item);
};