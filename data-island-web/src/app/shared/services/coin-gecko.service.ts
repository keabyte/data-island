import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CoinGeckoService {
	private readonly API_URL = 'https://api.coingecko.com/api/v3';

	constructor(private http: HttpClient) {}

	getCoins(): Observable<CoinMarket[]> {
		return this.http.get<CoinMarket[]>(`${this.API_URL}/coins/markets`, {
			params: new HttpParams().set('vs_currency', 'USD').set('price_change_percentage', '1h,24h,7d')
		});
	}
}

export interface CoinMarket {
	id: string;
	symbol: string;
	name: string;
	image: string;
	current_price: number;
	market_cap: number;
	market_cap_rank: number;
	total_supply: number;
	max_supply: number;
	total_volume: number;
	price_change_percentage_1h_in_currency: number;
	price_change_percentage_24h_in_currency: number;
	price_change_percentage_7d_in_currency: number;
}
