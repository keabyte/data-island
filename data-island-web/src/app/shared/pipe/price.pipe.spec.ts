import { PricePipe } from './price.pipe';

describe('PricePipe', () => {
	it('create an instance', () => {
		const pipe = new PricePipe('en-US');
		expect(pipe).toBeTruthy();
	});

	it('formats small numbers correctly', () => {
		const pipe = new PricePipe('en-US');
		expect(pipe.transform(0.000012345)).toBe('$0.000012');
	});

	it('formats large numbers correctly', () => {
		const pipe = new PricePipe('en-US');
		expect(pipe.transform(55321.555)).toBe('$55,321.56');
	});

	it('formats small numbers with rounding', () => {
		const pipe = new PricePipe('en-US');
		expect(pipe.transform(1.999)).toBe('$2.00');
	});

	it('formats smaller numbers with rounding', () => {
		const pipe = new PricePipe('en-US');
		expect(pipe.transform(0.555)).toBe('$0.56');
	});

	it('formats numbers with currency', () => {
		const pipe = new PricePipe('en-US');
		expect(pipe.transform(1.2, 'GBP')).toBe('£1.20');
	});

	it('formats large numbers with small fractions correctly', () => {
		const pipe = new PricePipe('en-US');
		expect(pipe.transform(1.005, 'GBP')).toBe('£1.01');
	});
});
