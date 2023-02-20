import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

module.exports.handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	const { v4: uuidv4 } = require('uuid');

	const dynamodb = new DynamoDB({
		region: 'localhost',
		endpoint: 'http://localhost:8000'
	});

	const portfolio = {
		id: uuidv4(),
		name: 'New Portfolio',
		order: 1,
		createdDate: new Date().toISOString(),
		assets: []
	};

	const params = {
		TableName: 'disl_portfolio',
		Item: marshall(portfolio)
	};

	try {
		await dynamodb.putItem(params, function (err, data) {
			if (err) {
				console.log('Error', err);
				throw err;
			}
		});

		return {
			statusCode: 200,
			body: JSON.stringify(portfolio)
		};
	} catch (err) {
		return {
			statusCode: 500,
			body: JSON.stringify('Error during database operation')
		};
	}
};
