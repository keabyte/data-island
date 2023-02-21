import { GetItemCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { dynamodbClient } from '../../util/integration';
import { Table } from '../../util/table';

export class PortfolioService {
	async getPortfolioById(portfolioId: string) {
		const params = {
			TableName: Table.PORTFOLIO,
			Key: {
				id: { S: portfolioId }
			}
		};

		const result = await dynamodbClient().send(new GetItemCommand(params));
		return unmarshall(result.Item || {});
	}
}
