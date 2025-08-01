import { Payload } from '../types';
import { query, response } from './tools';

export const getMedications = async (payload: Payload = {}) => {

    const patient: string = payload && 'patient' in payload ? payload.patient ?? '' : '';

    if (patient) {
        const { Items } = await query({
            TableName: 'MedTable',
            IndexName: 'type-patient',
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
    } else {
        const { Items } = await query({
            TableName: 'MedTable',
            IndexName: 'type-id',
            ExpressionAttributeValues: {
                ':t': 'medication',
                ':a': true,
            },
            ExpressionAttributeNames: {
                '#t': 'type',
                '#a': 'active',
            },
            KeyConditionExpression: '#t=:t',
            FilterExpression: '#a=:a',
            
        });

        return response(200, Items ?? []);
    }

};