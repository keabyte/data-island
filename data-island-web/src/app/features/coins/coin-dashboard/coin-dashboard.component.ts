import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CoinGeckoService, CoinMarket } from 'src/app/shared/services/coin-gecko.service';

@Component({
	selector: 'dil-coin-dashboard',
	templateUrl: './coin-dashboard.component.html',
	styleUrls: ['./coin-dashboard.component.scss']
})
export class CoinDashboardComponent implements OnInit {
	dataSource: MatTableDataSource<CoinMarket> = new MatTableDataSource<CoinMarket>();
	selectedCoin: CoinMarket | null;
	page: number = 1;
	loadingMore$: Subscription;

	displayedColumns = [
		'market_cap_rank',
		'current_price',
		'price_change_percentage_24h_in_currency',
		'price_change_percentage_7d_in_currency',
		'market_cap',
		'total_volume'
	];

	constructor(private coinService: CoinGeckoService) {}

	ngOnInit(): void {
		this.loadCoins();
	}

	loadCoins() {
		this.coinService.getCoins(this.page).subscribe(coins => {
			this.dataSource = new MatTableDataSource<CoinMarket>(coins);
		});
	}

	rowClicked(coin: CoinMarket) {
		if (this.selectedCoin && this.selectedCoin.id === coin.id) {
			this.selectedCoin = null;
		} else {
			this.selectedCoin = coin;
		}
	}

	loadMore() {
		this.page++;
		this.loadingMore$ = this.coinService.getCoins(this.page).subscribe(coins => {
			let data = this.dataSource.data.concat(coins);
			this.dataSource.data = data;
		});
	}

	get loadingMore(): boolean {
		return this.loadingMore$ && !this.loadingMore$.closed;
	}
}
