import { Medication, Payload } from '../types';
import { query, response } from './tools';

export const getMedications = async (payload: Payload) => {

    const patient = payload && 'patient' in payload ? payload.patient : '';

    if (!patient) return response(400, { message: 'Medication Patient Required' });

    const { Items } = await query({
        IndexName: 'type-patient',
        TableName: 'MedTable',
        ExpressionAttributeValues: {
            ':t': 'medication',
            ':p': patient,
        },
        ExpressionAttributeNames: {
            '#t': 'type',
            '#p': 'patient',
        },
        KeyConditionExpression: '#t=:t AND #p=:p',
    });

    return response(200, Items ?? []);
};