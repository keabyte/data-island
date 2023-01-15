import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { CoinDetails } from './coin-gecko.service';

@Injectable({
	providedIn: 'root'
})
export class PortfolioService {
	constructor(private http: HttpClient) {}

	getPortfolios() {
		return of([
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
				order: 2,
				totalValue: 1000,
				createdDate: new Date(),
				assets: [
					{ id: 'algorand', units: 3001 },
					{ id: 'cardano', units: 2000 }
				]
			}
		]);
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
