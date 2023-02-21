import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Request } from '../util/request';
import { Table } from '../util/table';

module.exports.handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	const request = new Request(event);
	const { v4: uuidv4 } = require('uuid');

	const dynamodb = new DynamoDB({
		region: 'localhost',
		endpoint: 'http://localhost:8000'
	});

	const portfolio = {
		id: uuidv4(),
		name: request.body.name || 'New Portfolio',
		order: request.body.order || 1,
		createdDate: new Date().toISOString(),
		assets: []
	};

	const params = {
		TableName: Table.PORTFOLIO,
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
