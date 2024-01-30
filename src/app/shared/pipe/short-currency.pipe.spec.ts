import { ShortCurrencyPipe } from './short-currency.pipe';

describe('ShortCurrencyPipe', () => {
	it('create an instance', () => {
		const pipe = new ShortCurrencyPipe('en-US');
		expect(pipe).toBeTruthy();
	});

	it('formats trillions', () => {
		const pipe = new ShortCurrencyPipe('en-US');
		expect(pipe.transform(10000000000000)).toBe('$10.000T');
	});

	it('formats billions', () => {
		const pipe = new ShortCurrencyPipe('en-US');
		expect(pipe.transform(10000000000)).toBe('$10.000B');
	});

	it('formats millions', () => {
		const pipe = new ShortCurrencyPipe('en-US');
		expect(pipe.transform(10000000)).toBe('$10M');
	});
});
