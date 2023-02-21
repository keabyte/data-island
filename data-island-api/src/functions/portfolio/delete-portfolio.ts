import { DeleteItemCommand, DynamoDB } from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Request } from '../../util/request';
import { Table } from '../../util/table';

module.exports.handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	const request = new Request(event);
	const dynamodb = new DynamoDB({
		region: 'localhost',
		endpoint: 'http://localhost:8000'
	});

	const { portfolioId } = request.pathParameters;

	const params = {
		TableName: Table.PORTFOLIO,
		Key: {
			id: { S: portfolioId }
		}
	};

	try {
		await dynamodb.send(new DeleteItemCommand(params));
		return {
			statusCode: 200,
			body: JSON.stringify(`Deleted portfolio ${portfolioId}`)
		};
	} catch (error) {
		console.error(error);
		return {
			statusCode: 500,
			body: JSON.stringify({ message: `Could not delete porfolio ${portfolioId}` })
		};
	}
};
