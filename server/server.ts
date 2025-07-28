import { APIGatewayProxyResultV2, APIGatewayProxyEventV2, Handler } from 'aws-lambda';
import path from 'path';
import fs from 'fs';

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
                <script type="module" src="./client.js" defer></script>
                <link rel="stylesheet" href="./client.css" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.colors.min.css" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            </head>
            <body>
                <!-- <main class="container"></main> -->
                <div class="container"></div>
            </body>
        </html>
        `,
    };
};

let clientJsFile: string;
const clientJs = async () => {
    try {
        clientJsFile = clientJsFile ?? await fs.promises.readFile(path.resolve('./client.js'), { encoding: 'utf8' });
        return { statusCode: 200, headers: { 'content-type': 'text/javascript' }, body: clientJsFile };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify(error) };
    }
};

let clientCssFile: string;
const clientCss = async () => {
    try {
        clientCssFile = clientCssFile ?? await fs.promises.readFile(path.resolve('./client.css'), { encoding: 'utf8' });
        return { statusCode: 200, headers: { 'content-type': 'text/css' }, body: clientCssFile };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify(error) };
    }
};

export const handler: Handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    try {

        const method = event.requestContext.http.method;
        const pathname = event.requestContext.http.path?.replace(/\/(Stage|Pro)\/?/, '/');

        // console.log(event);

        // let body;
        // try {
        //     body = JSON.parse(event.body || '{}');
        // } catch {
        //     return { statusCode: 400, body: JSON.stringify({ message: 'body not valid' }) };
        // }

        // if (method === 'GET' && pathname === '/') {
        //     return rootPage();
        // }

        if (method === 'GET' && pathname === '/client.js') {
            return clientJs();
        }

        if (method === 'GET' && pathname === '/client.css') {
            return clientCss();
        }

        if (method === 'GET' && !pathname.includes('.')) {
            return rootPage();
        }

        return { statusCode: 404, body: JSON.stringify({ message: 'Not Found' }) };

    } catch (error) {
        return { statusCode: 500, body: JSON.stringify(error) };
    }

};