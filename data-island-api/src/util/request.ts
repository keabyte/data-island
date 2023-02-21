import { APIGatewayProxyEvent } from 'aws-lambda';

export class Request {
	private _body: any;
	private _pathParameters: any;

	constructor(event: APIGatewayProxyEvent) {
		this._body = event.body ? JSON.parse(event.body) : {};
		this._pathParameters = event.pathParameters;
	}

	get body() {
		return this._body;
	}

	get pathParameters() {
		return this._pathParameters;
	}
}
