import { Component, OnInit } from '@angular/core';
import { Portfolio, PortfolioService } from 'src/app/shared/services/portfolio.service';

@Component({
	selector: 'dil-portfolio-tracker',
	templateUrl: './portfolio-tracker.component.html',
	styleUrls: ['./portfolio-tracker.component.scss']
})
export class PortfolioTrackerComponent implements OnInit {
	selectedPortfolio: Portfolio | null = null;

	portfolios: Portfolio[] = [];

	constructor(private portfolioService: PortfolioService) {}

	ngOnInit(): void {
		this.portfolioService.getPortfolios().subscribe(portfolios => {
			this.portfolios = portfolios.sort((a, b) => (a.order > b.order ? 1 : -1));
			this.selectPortfolio(this.portfolios[0]);
		});
	}

	selectPortfolio(portfolio: Portfolio) {
		this.selectedPortfolio = portfolio;
	}

	deletePortfolio(portfolio: Portfolio) {
		this.portfolios = this.portfolios.filter(p => p.order !== portfolio.order);
		this.selectPortfolio(this.portfolios.reverse().find(p => p.order < portfolio.order));
		this.portfolios.reverse();
	}

	createPortfolio() {
		const maxOrderAssetRow = this.portfolios.sort((a, b) => (a.order > b.order ? -1 : 1))[0];

		const portfolio: Portfolio = {
			name: 'New portfolio',
			assets: [],
			createdDate: new Date(),
			totalValue: 0,
			order: (maxOrderAssetRow?.order || 0) + 1
		};
		this.portfolios.push(portfolio);
		this.portfolios = this.portfolios.sort((a, b) => (a.order > b.order ? 1 : -1));
		this.selectPortfolio(portfolio);
	}
}
