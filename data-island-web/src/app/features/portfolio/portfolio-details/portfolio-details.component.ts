import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CoinGeckoService } from 'src/app/shared/services/coin-gecko.service';
import { AssetPricePoint, Portfolio } from '../portfolio-tracker/portfolio-tracker.component';

@Component({
	selector: 'dil-portfolio-details',
	templateUrl: './portfolio-details.component.html',
	styleUrls: ['./portfolio-details.component.scss']
})
export class PortfolioDetailsComponent implements OnInit, OnChanges {
	@Input() portfolio: Portfolio;

	dataSource: MatTableDataSource<AssetPricePoint> = new MatTableDataSource<AssetPricePoint>();

	displayedColumns = ['name', 'price', 'units', 'amount'];

	constructor(private coinService: CoinGeckoService) {}

	ngOnChanges(changes: SimpleChanges): void {
		this.loadAssetDetails();
	}

	ngOnInit(): void {}

	loadAssetDetails() {
		this.dataSource = new MatTableDataSource<AssetPricePoint>();
		for (const asset of this.portfolio.assets) {
			this.coinService.getCoinById(asset.id).subscribe(response => {
				this.dataSource.data = [...this.dataSource.data, { ...response, ...asset }];
				console.log(this.dataSource.data);
			});
		}
	}
}
