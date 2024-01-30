import { CurrencyPipe, formatCurrency, getCurrencySymbol } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'price'
})
export class PricePipe implements PipeTransform {
	constructor(
		@Inject(LOCALE_ID) private _locale: string,
		@Inject(DEFAULT_CURRENCY_CODE) private _defaultCurrencyCode: string = 'USD'
	) {}

	transform(
		value: number | string | null | undefined,
		currencyCode: string = this._defaultCurrencyCode,
		display: 'code' | 'symbol' | 'symbol-narrow' | string | boolean = 'symbol',
		significantDigits: number = 2,
		locale?: string
	): string | null {
		if (!isValue(value)) return null;

		locale = locale || this._locale;

		if (typeof display === 'boolean') {
			console.warn(
				`Warning: the currency pipe has been changed in Angular v5. The symbolDisplay option (third parameter) is now a string instead of a boolean. The accepted values are "code", "symbol" or "symbol-narrow".`
			);
			display = display ? 'symbol' : 'code';
		}

		let currency: string = currencyCode || this._defaultCurrencyCode;
		if (display !== 'code') {
			if (display === 'symbol' || display === 'symbol-narrow') {
				currency = getCurrencySymbol(currency, display === 'symbol' ? 'wide' : 'narrow', locale);
			} else {
				currency = display;
			}
		}

		try {
			const num = strToNumber(value);
			return formatPrice(num, currency, significantDigits);
		} catch (error) {
			throw Error('Failed to pipe value: ' + value);
		}
	}
}

function formatPrice(value: number, currency: string, significantDigits: number = 2): string | null {
	const valueRounded = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
		value
	);
	if (value > 1) {
		return `${currency}${valueRounded}`;
	}
	const left = valueRounded.split('.')[0];
	const right = (value % 1).toPrecision(significantDigits).split('.')[1];
	return `${currency}${left}.${right === '0' ? '00' : right}`;
}

function isValue(value: number | string | null | undefined): value is number | string {
	return !(value == null || value === '' || value !== value);
}

function strToNumber(value: number | string): number {
	// Convert strings to numbers
	if (typeof value === 'string' && !isNaN(Number(value) - parseFloat(value))) {
		return Number(value);
	}
	if (typeof value !== 'number') {
		throw new Error(`${value} is not a number`);
	}
	return value;
}
