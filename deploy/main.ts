import { App, Stack } from 'aws-cdk-lib';
import { CorsHttpMethod, HttpApi } from 'aws-cdk-lib/aws-apigatewayv2';
import { AttributeType, TableV2 } from 'aws-cdk-lib/aws-dynamodb';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';

const app = new App();

const stack = new Stack(app, 'MedStack', {
    crossRegionReferences: true,
    env: { region: 'us-east-1' }
});

const lambda = new Function(stack, 'MedLambda', {
    functionName: 'MedFunction',
    handler: 'server/server.handler',
    runtime: Runtime.NODEJS_20_X,
    code: Code.fromAsset('../bundle'),
});

const gate = new HttpApi(stack, 'MedGateway', {
    apiName: 'MedGate',
    corsPreflight: {
        allowOrigins: [ '*' ],
        allowMethods: [ CorsHttpMethod.ANY ],
    },
});

const integration = new HttpLambdaIntegration('MedIntegration', lambda);

gate.addRoutes({ path: '/', integration, });
gate.addRoutes({ path: '/{any+}', integration, });

// Database
const table = new TableV2(stack, 'MedTable', {
    tableName: 'MedTable',
    // sortKey: { name: 's', type: AttributeType.STRING },
    partitionKey: { name: 'id', type: AttributeType.STRING },
    globalSecondaryIndexes: [
        {
            indexName: 'type-id',
            sortKey: { name: 'id', type: AttributeType.STRING },
            partitionKey: { name: 'type', type: AttributeType.STRING },
        },
        {
            indexName: 'type-patient',
            sortKey: { name: 'patient', type: AttributeType.STRING },
            partitionKey: { name: 'type', type: AttributeType.STRING },
        },
        {
            indexName: 'type-medication',
            sortKey: { name: 'medication', type: AttributeType.STRING },
            partitionKey: { name: 'type', type: AttributeType.STRING },
        },
    ],
});

table.grantReadWriteData(lambda);
