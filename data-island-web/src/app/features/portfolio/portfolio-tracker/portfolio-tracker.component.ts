import { Component, OnInit } from '@angular/core';
import { CoinDetails } from 'src/app/shared/services/coin-gecko.service';

@Component({
	selector: 'dil-portfolio-tracker',
	templateUrl: './portfolio-tracker.component.html',
	styleUrls: ['./portfolio-tracker.component.scss']
})
export class PortfolioTrackerComponent implements OnInit {
	selectedPortfolio: Portfolio | null = null;

	portfolios: Portfolio[] = [
		{
			name: 'Main',
			order: 1,
			totalValue: 1000,
			createdDate: new Date(),
			assets: [
				{ id: 'bitcoin', units: 1.304 },
				{ id: 'ethereum', units: 2.5 }
			]
		},
		{
			name: 'Alts',
			order: 1,
			totalValue: 1000,
			createdDate: new Date(),
			assets: [
				{ id: 'algorand', units: 3001 },
				{ id: 'cardano', units: 2000 }
			]
		}
	];

	constructor() {}

	ngOnInit(): void {
		this.selectPortfolio(this.portfolios[0]);
	}

	selectPortfolio(portfolio: Portfolio) {
		this.selectedPortfolio = portfolio;
	}
}

export interface Portfolio {
	name: string;
	order: number;
	totalValue: number;
	createdDate: Date;
	assets: Asset[];
}

export interface Asset {
	id: string;
	units: number;
}

export interface AssetPricePoint extends Asset, CoinDetails {}
