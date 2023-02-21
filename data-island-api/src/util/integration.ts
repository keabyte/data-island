import { DynamoDB } from '@aws-sdk/client-dynamodb';

export function dynamodbClient() {
	const dynamodb = new DynamoDB({
		region: 'localhost',
		endpoint: 'http://localhost:8000'
	});

	return dynamodb;
}
