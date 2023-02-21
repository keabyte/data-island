import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
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

	const portfolio = {
		id: portfolioId,
		name: request.body.name,
		order: request.body.order,
		createdDate: request.body.order,
		assets: request.body.assets
	};

	const params = {
		TableName: Table.PORTFOLIO,
		Item: marshall(portfolio)
	};

	try {
		await dynamodb.putItem(params);

		return {
			statusCode: 200,
			body: JSON.stringify(portfolio)
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			body: JSON.stringify('Error during database operation')
		};
	}
};
