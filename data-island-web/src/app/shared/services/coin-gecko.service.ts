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

	getCoinById(coinId: string): Observable<CoinDetails> {
		return this.http.get<CoinDetails>(`${this.API_URL}/coins/${coinId}`, {
			params: new HttpParams()
				.set('tickers', false)
				.set('localization', false)
				.set('market_data', true)
				.set('community_data', false)
				.set('developer_data', false)
				.set('sparkline', false)
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

export interface CoinDetails {
	id: string;
	symbol: string;
	name: string;
	market_data: MarketData;
}

export interface MarketData {
	current_price: { [key: string]: number };
}
