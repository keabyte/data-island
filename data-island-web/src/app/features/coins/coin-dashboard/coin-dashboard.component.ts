import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CoinGeckoService, CoinMarket } from 'src/app/shared/services/coin-gecko.service';

@Component({
	selector: 'dil-coin-dashboard',
	templateUrl: './coin-dashboard.component.html',
	styleUrls: ['./coin-dashboard.component.scss']
})
export class CoinDashboardComponent implements OnInit {
	dataSource: MatTableDataSource<CoinMarket> = new MatTableDataSource<CoinMarket>();

	constructor(private coinService: CoinGeckoService) {}

	ngOnInit(): void {
		this.loadCoins();
	}

	displayedColumns = [
		'market_cap_rank',
		'current_price',
		'price_change_percentage_1h_in_currency',
		'price_change_percentage_24h_in_currency',
		'price_change_percentage_7d_in_currency',
		'market_cap',
		'total_volume'
	];

	loadCoins() {
		this.coinService.getCoins().subscribe(coins => {
			this.dataSource = new MatTableDataSource<CoinMarket>(coins);
		});
	}
}
