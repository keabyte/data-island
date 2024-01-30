import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CoinDetails, CoinGeckoService, CoinMarket } from 'src/app/shared/services/coin-gecko.service';

@Component({
	selector: 'dil-coin-details',
	templateUrl: './coin-details.component.html',
	styleUrls: ['./coin-details.component.scss']
})
export class CoinDetailsComponent implements OnChanges {
	@Input() coin: CoinMarket;
	coinDetails: CoinDetails;

	@Output() closeClicked = new EventEmitter();

	constructor(private coinService: CoinGeckoService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.coin) {
			this.coinService.getCoinById(this.coin.id).subscribe(response => (this.coinDetails = response));
		}
	}
}
