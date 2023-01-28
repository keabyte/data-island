import { APIGatewayProxyEventV2, APIGatewayProxyResult } from 'aws-lambda';

export const lambdaHandler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResult> => {
	try {
		// switch (event.routeKey) {
		//     case 'DELETE /items/{id}':
		return {
			statusCode: 200,
			body: JSON.stringify({
				e: event.requestContext.http.method + ' ' + event.requestContext.http.path
			})
		};
		// }
	} catch (err: unknown) {
		console.error(err);
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: err instanceof Error ? err.message : 'some error happened'
			})
		};
	}
};
