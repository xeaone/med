import { App, Stack } from 'aws-cdk-lib';
import { CorsHttpMethod, HttpApi, HttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';

const app = new App();

const stack = new Stack(app);

const lambda = new Function(stack, 'MedLambda', {
    functionName: 'MedFunction',
    handler: 'server.handler',
    runtime: Runtime.NODEJS_20_X,
    // runtime: Runtime.NODEJS_22_X,
    code: Code.fromAsset('../bundle'),
});

const gate = new HttpApi(stack, 'MedGateway', {
    apiName: 'MedAPI',
    corsPreflight: {
        allowOrigins: [ '*' ],
        allowMethods: [ CorsHttpMethod.ANY ],
    },
});

const integration = new HttpLambdaIntegration('MedIntegration', lambda);

gate.addRoutes({ path: '/', integration, });

gate.addRoutes({ path: '/{any+}', integration, });