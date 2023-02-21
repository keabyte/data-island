import { APIGatewayProxyEvent } from 'aws-lambda';

export class Request {
	private _body: any;

	constructor(event: APIGatewayProxyEvent) {
		this._body = event.body ? JSON.parse(event.body) : {};
	}

	get body() {
		return this._body;
	}
}
