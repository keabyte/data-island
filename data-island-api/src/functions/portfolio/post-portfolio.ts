import { marshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { dynamodbClient } from '../../util/integration';
import { Request } from '../../util/request';
import { Table } from '../../util/table';
import { PortfolioService } from './portfolio-service';

module.exports.handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	const request = new Request(event);
	const { v4: uuidv4 } = require('uuid');

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
		await dynamodbClient().putItem(params);

		return {
			statusCode: 200,
			body: JSON.stringify(await new PortfolioService().getPortfolioById(portfolio.id))
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			body: JSON.stringify('Error during database operation')
		};
	}
};
