import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'shortCurrency'
})
export class ShortCurrencyPipe implements PipeTransform {
	private static powers = [
		{ key: 'Q', value: Math.pow(10, 15), dp: 3 },
		{ key: 'T', value: Math.pow(10, 12), dp: 3 },
		{ key: 'B', value: Math.pow(10, 9), dp: 3 },
		{ key: 'M', value: Math.pow(10, 6), dp: 0 },
		{ key: 'K', value: 1000, dp: 0 }
	];

	constructor(
		@Inject(LOCALE_ID) private _locale: string,
		@Inject(DEFAULT_CURRENCY_CODE)
		private _defaultCurrencyCode: string = 'USD'
	) {}

	transform(number: number | undefined, currencyCode?: string): any {
		if (number === undefined) return null;
		if (isNaN(number)) return null;
		if (number === null) return null;
		if (number === 0) return null;
		let sign = number < 0 ? -1 : 1;
		let abs = Math.abs(number);
		let key = '';

		for (let i = 0; i < ShortCurrencyPipe.powers.length; i++) {
			let config = ShortCurrencyPipe.powers[i];
			let reduced = abs / config.value;
			reduced = Number(reduced.toFixed(config.dp));
			if (reduced >= 1) {
				abs = reduced;
				key = config.key;
				let result = formatCurrency(
					abs * sign,
					this._locale,
					getCurrencySymbol(currencyCode || this._defaultCurrencyCode, 'wide', this._locale),
					currencyCode || this._defaultCurrencyCode,
					'0.' + config.dp + '-' + config.dp
				);
				return result + key;
			}
		}
	}
}
