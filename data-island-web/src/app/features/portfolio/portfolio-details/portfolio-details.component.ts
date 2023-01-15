import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CoinGeckoService } from 'src/app/shared/services/coin-gecko.service';
import { AssetPricePoint, Portfolio } from 'src/app/shared/services/portfolio.service';

@Component({
	selector: 'dil-portfolio-details',
	templateUrl: './portfolio-details.component.html',
	styleUrls: ['./portfolio-details.component.scss']
})
export class PortfolioDetailsComponent implements OnInit, OnChanges {
	@Input() portfolio: Portfolio;
	totalPortfolioValue: number = 0;

	dataSource: MatTableDataSource<AssetPricePoint> = new MatTableDataSource<AssetPricePoint>();

	displayedColumns = ['name', 'price', 'holdings', 'price_change_percentage'];

	constructor(private coinService: CoinGeckoService) {}

	ngOnChanges(changes: SimpleChanges): void {
		this.loadAssetDetails();
	}

	ngOnInit(): void {}

	loadAssetDetails() {
		this.totalPortfolioValue = 0;
		this.dataSource = new MatTableDataSource<AssetPricePoint>();
		for (const asset of this.portfolio.assets) {
			this.coinService.getCoinById(asset.id).subscribe(response => {
				const pricePoint = { ...response, ...asset };
				this.dataSource.data = [...this.dataSource.data, pricePoint];
				this.totalPortfolioValue += pricePoint.units * pricePoint.market_data.current_price['usd'];
			});
		}
	}
}
