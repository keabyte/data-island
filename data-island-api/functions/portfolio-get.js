module.exports.handler = async event => {
	const portfolios = [];
	return {
		statusCode: 200,
		body: JSON.stringify(portfolios)
	};
};
