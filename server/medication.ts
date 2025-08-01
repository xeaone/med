import { Medication, Payload } from '../types';
import { put, query, response } from './tools';
import { ulid } from 'ulid';

export const getMedication = async (payload: Payload) => {

    const id = payload && 'id' in payload ? payload.id : '';

    if (!id) return response(400, { message: 'Medication ID Required' });

    const { Items } = await query({
        Limit: 1,
        IndexName: 'type-id',
        TableName: 'MedTable',
        ExpressionAttributeValues: {
            ':t': 'medication',
            ':i': id,
        },
        ExpressionAttributeNames: {
            '#t': 'type',
            '#i': 'id',
        },
        KeyConditionExpression: '#t=:t AND #i=:i',
    });

    if (!Items?.[ 0 ]) return response(400, { message: 'Medication Not Found' });

    return response(200, Items[ 0 ]);
};

export const putMedication = async (payload: Payload) => {

    const {
        title,
        patient,
        description,
    } = (payload ?? {} as any);

    if (!title) return response(400, { message: 'Medication Title Required' });
    if (!patient) return response(400, { message: 'Medication Patient Required' });
    if (!description) return response(400, { message: 'Medication Description Required' });

    const Item = {
        id: ulid(),
        type: 'medication',
        title,
        patient,
        description,
    };

    const result = await put({
        Item,
        TableName: 'MedTable',
    });

    return response(200, Item);
};