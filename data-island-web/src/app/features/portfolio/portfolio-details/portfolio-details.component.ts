import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoinGeckoService } from 'src/app/shared/services/coin-gecko.service';
import { AssetPricePoint, Portfolio } from 'src/app/shared/services/portfolio.service';

@Component({
	selector: 'dil-portfolio-details',
	templateUrl: './portfolio-details.component.html',
	styleUrls: ['./portfolio-details.component.scss']
})
export class PortfolioDetailsComponent implements OnInit, AfterViewInit, OnChanges {
	@Input() portfolio: Portfolio;
	totalPortfolioValue: number = 0;

	@ViewChild(MatSort) sort: MatSort;
	dataSource: MatTableDataSource<AssetPricePoint> = new MatTableDataSource<AssetPricePoint>();

	displayedColumns = ['name', 'price', 'holdings', 'price_change_percentage'];

	constructor(private coinService: CoinGeckoService) {}

	ngOnChanges(changes: SimpleChanges): void {
		this.loadAssetDetails();
	}

	ngOnInit(): void {}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
	}

	loadAssetDetails() {
		this.totalPortfolioValue = 0;
		this.dataSource.data = [];
		for (const asset of this.portfolio.assets) {
			this.coinService.getCoinById(asset.id).subscribe(response => {
				const pricePoint = { ...response, ...asset };
				this.dataSource.data = [...this.dataSource.data, pricePoint];
				this.totalPortfolioValue += pricePoint.units * pricePoint.market_data.current_price['usd'];
			});
		}
	}
}
