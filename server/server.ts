import { APIGatewayProxyResultV2, APIGatewayProxyEventV2 } from 'aws-lambda';
import mime from 'mime';

import path from 'path';
import fs from 'fs';

import { getPatients } from './patients';
import { getMedications } from './medications';
import { getPatient, putPatient } from './patient';

import { Payload } from '../types';
import { response } from './tools';
import { getMedication, putMedication } from './medication';

const rootPage = async () => {
    return {
        statusCode: 200,
        headers: {
            'content-type': 'text/html',
            'cache-control': 'public, max-age=5000',
        },
        body: /*html*/`
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="color-scheme" content="light dark" />
                <link rel="stylesheet" href="/client.css" />
                <script type="module" src="/client.js" defer></script>
            </head>
            <body>
            </body>
        </html>
        `,
    };
};

const fileHandle = async (basename: string, pathname: string) => {
    // note probably need to make path safe
    const filePath = path.join(import.meta.dirname, path.normalize(basename), path.normalize(pathname));
    const type = mime.getType(filePath) ?? 'text/html';

    try {
        // probably cache the file after read
        const body = await fs.promises.readFile(filePath, { encoding: 'utf8' });
        return response(200, body, { 'content-type': type });
    } catch (error) {
        console.error(error);
        return response(404, { message: 'Not Found' });
    }
};

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    try {
        // console.log('event', event);

        const method = event.requestContext.http.method;
        const pathname = event.requestContext.http.path;
        const params = event.queryStringParameters;

        let body: Payload = null;
        try {
            body = event.body ? JSON.parse(event.body) : null;
        } catch {
            return response(400, { message: 'Body Not Valid' });
        }

        const payload: Payload = method === 'GET' ? params ?? null : body;

        if (method === 'PUT' && pathname === '/api/medication') return putMedication(payload);
        if (method === 'GET' && pathname === '/api/medication') return getMedication(payload);
        if (method === 'GET' && pathname === '/api/medications') return getMedications(payload);

        if (method === 'PUT' && pathname === '/api/patient') return putPatient(payload);
        if (method === 'GET' && pathname === '/api/patient') return getPatient(payload);
        if (method === 'GET' && pathname === '/api/patients') return getPatients();

        if (pathname.startsWith('/api/')) return response(404, { message: 'Not Found' });

        if (method === 'GET' && pathname.includes('.')) return fileHandle('../client', pathname);
        if (method === 'GET' && !pathname.includes('.')) return rootPage();

        return response(404, { message: 'Not Found' });

    } catch (error) {
        console.error(error);
        // return response(500, { message: 'Internal Server Error' });
        return response(500, error);
    }

};
