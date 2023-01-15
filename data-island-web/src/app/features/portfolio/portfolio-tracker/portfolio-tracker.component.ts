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
}
