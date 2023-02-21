import { unmarshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { dynamodbClient } from '../../util/integration';
import { Table } from '../../util/table';

module.exports.handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	const params = {
		TableName: Table.PORTFOLIO
	};

	try {
		const result = await dynamodbClient().scan(params);
		const portfolios = result.Items?.map(item => unmarshall(item));
		return {
			statusCode: 200,
			body: JSON.stringify(portfolios)
		};
	} catch (error) {
		console.error(error);
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'An error occurred while scanning the table.' })
		};
	}
};
