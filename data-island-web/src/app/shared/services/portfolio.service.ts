import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CoinDetails } from './coin-gecko.service';

@Injectable({
	providedIn: 'root'
})
export class PortfolioService {
	constructor(private http: HttpClient) {}

	getPortfolios() {
		return this.http.get<Portfolio[]>(environment.apiURL + '/portfolios');
	}

	createPortfolio(portfolio: Partial<Portfolio>) {
		return this.http.post<Portfolio>(environment.apiURL + '/portfolios', portfolio);
	}

	deletePortfolio(portfolioId: string) {
		return this.http.delete<any>(`${environment.apiURL}/portfolios/${portfolioId}`);
	}
}

export interface Portfolio {
	id: string;
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
