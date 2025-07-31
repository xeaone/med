import { APIGatewayProxyResultV2, APIGatewayProxyEventV2 } from 'aws-lambda';
import mime from 'mime';

import path from 'path';
import fs from 'fs';

import { getPatients } from './patients';
import { getMedications } from './medications';
import { getPatient } from './patient';

const rootPage = async () => {
    return {
        statusCode: 200,
        headers: { 'content-type': 'text/html' },
        body: /*html*/`
        <html lang="en">
            <head>
                <!-- <base href="/Stage/"> -->
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="color-scheme" content="light dark" />
                <script type="module" src="/client.js" defer></script>
                <link rel="stylesheet" href="/client.css" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.colors.min.css" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            </head>
            <body>
                <div class="container"></div>
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
        return { statusCode: 200, headers: { 'content-type': type }, body };
    } catch (error) {
        console.error(error);
        return { statusCode: 404, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ message: 'Not Found' }) };
    }
};

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    try {

        const method = event.requestContext.http.method;
        const pathname = event.requestContext.http.path?.replace(/\/(Stage|Pro)\/?/, '/');

        // const url = new URL(`http://${event.requestContext.domainName}${event.requestContext.http.path?.replace(/\/(Stage|Pro)\/?/, '/')}`);
        // console.log(url.pathname);
        // console.log(event);

        let body: Record<any, any> | Array<any> | null;
        try {
            body = event.body ? JSON.parse(event.body) : null;
        } catch {
            return { statusCode: 400, body: JSON.stringify({ message: 'body not valid' }) };
        }

        if (method === 'GET' && pathname === '/api/patient') return getPatient();
        if (method === 'GET' && pathname === '/api/patients') return getPatients();
        if (method === 'GET' && pathname === '/api/medications') return getMedications();

        if (method === 'GET' && pathname === '/') return rootPage();
        if (method === 'GET' && pathname === '/patient') return rootPage();
        if (method === 'GET' && pathname === '/patients') return rootPage();
        if (method === 'GET' && pathname === '/medications') return rootPage();

        if (method === 'GET' && pathname.includes('.')) return fileHandle('../client', pathname);

        return { statusCode: 404, body: JSON.stringify({ message: 'Not Found' }) };

    } catch (error) {
        console.error(error);
        return { statusCode: 500, body: JSON.stringify(error) };
    }

};

// import Handler from 'serverless-http';
// import Express from 'express';

// const app = Express();

// app.get('/api/patients', getPatients);

// app.get('/', rootPage)
// app.get('/mediations', )
// app.get('/mediations', )


// export const handler = Handler(app);