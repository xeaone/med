import { APIGatewayProxyResultV2 } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand, DynamoDBDocumentClient, QueryCommand, QueryCommandInput, PutCommandInput } from '@aws-sdk/lib-dynamodb';

export const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient());

export const query = (options: QueryCommandInput) => dynamo.send(new QueryCommand(options));

export const put = (options: PutCommandInput) => dynamo.send(new PutCommand(options));

export const response = (statusCode: number, body: any, headers?: Record<string, boolean | number | string>): APIGatewayProxyResultV2 => {

    headers = headers ?? {};

    if (!headers[ 'content-type' ] && body.constructor === Array || body.constructor === Object) {
        headers[ 'content-type' ] = 'application/json';
    }

    body = (
        body.constructor === Array ? JSON.stringify(body) :
            body.constructor === Object ? JSON.stringify(body) :
                body
        );

    return { statusCode, body, headers };
};