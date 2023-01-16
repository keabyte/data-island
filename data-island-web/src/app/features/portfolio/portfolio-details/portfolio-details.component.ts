import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	QueryList,
	SimpleChanges,
	ViewChild,
	ViewChildren
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoinGeckoService } from 'src/app/shared/services/coin-gecko.service';
import { AssetPricePoint, Portfolio } from 'src/app/shared/services/portfolio.service';

declare type AssetRow = AssetPricePoint & { editHoldings?: boolean };

@Component({
	selector: 'dil-portfolio-details',
	templateUrl: './portfolio-details.component.html',
	styleUrls: ['./portfolio-details.component.scss']
})
export class PortfolioDetailsComponent implements OnInit, AfterViewInit, OnChanges {
	@ViewChildren('unitsInput') inputRows: QueryList<ElementRef>;
	@Input() portfolio: Portfolio;
	totalPortfolioValue: number = 0;

	@ViewChild(MatSort) sort: MatSort;
	dataSource: MatTableDataSource<AssetRow> = new MatTableDataSource<AssetRow>();

	displayedColumns = ['name', 'price', 'holdings', 'price_change_percentage', 'actions'];

	@Output() portfolioDeleted = new EventEmitter<Portfolio>();

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

	editAssetHoldings(assetRow: AssetRow) {
		this.dataSource.data.forEach(a => (a.editHoldings = false));

		assetRow.editHoldings = true;
		setTimeout(() => {
			console.log(this.inputRows);
			this.inputRows.last.nativeElement.focus();
		});
	}

	saveAssetHoldings(assetRow: AssetRow) {
		assetRow.editHoldings = false;
	}

	deleteAsset(assetRow: AssetRow) {
		this.dataSource.data = this.dataSource.data.filter(a => a.id !== assetRow.id);
	}
}
