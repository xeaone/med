import { ulid } from 'ulid';
import { Log, Payload } from '../types';
import { put, query, response } from './tools';

export const getLogs = async (payload: Payload = {}) => {

    const medication = payload && 'medication' in payload ? payload.medication : '';

    if (!medication) return response(400, { message: 'Log Medication Required' });

    const { Items } = await query({
        TableName: 'MedTable',
        IndexName: 'type-medication',
        ExpressionAttributeValues: {
            ':t': 'log',
            ':m': medication,
        },
        ExpressionAttributeNames: {
            '#t': 'type',
            '#m': 'medication',
        },
        KeyConditionExpression: '#t=:t AND #m=:m',
    });

    return response(200, Items ?? []);
};

export const putLog = async (payload: Payload) => {

    const {
        id,
        stamp,
        medication,
    } = (payload as Log) ?? {};

    if (!stamp) return response(400, { message: 'Log Stamp Required' });
    if (!medication) return response(400, { message: 'Log Medication Required' });

    const Item = {
        id: id || ulid(),
        type: 'log',
        stamp,
        medication,
    };

    await put({ TableName: 'MedTable', Item });

    return response(200, Item);
};