import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { round } from '../../utils/utils';
@Component({
	selector: 'dil-amount-change',
	templateUrl: './amount-change.component.html',
	styleUrls: ['./amount-change.component.scss']
})
export class AmountChangeComponent implements OnChanges {
	@Input() changeEffectIndicator: number = 0;
	@Input() changePercent: number = 0;
	@Input() changeAmount: number = 0;
	@Input() currency: string = 'USD';
	@Input() affix: string = '';
	@Input() defaultDisplay: string = '-';

	constructor() {}

	ngOnChanges(changes: SimpleChanges): void {
		this.changeEffectIndicator = 0;
		if (this.changeAmount) {
			if (this.changeAmount < 0) {
				this.changeEffectIndicator = -1;
			} else if (this.changeAmount > 0) {
				this.changeEffectIndicator = 1;
			}

			if (this.changeAmount < 0) {
				this.changeAmount *= -1;
			}
		} else if (this.changePercent) {
			if (round(this.changePercent) === 0) {
				this.changeEffectIndicator = 0;
			} else if (this.changePercent < 0) {
				this.changeEffectIndicator = -1;
			} else if (this.changePercent > 0) {
				this.changeEffectIndicator = 1;
			}

			if (this.changePercent < 0) {
				this.changePercent *= -1;
			}
		}
	}
}
