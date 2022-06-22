import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

/**
 * CoinGecko API v3 https://www.coingecko.com/en/api/documentation
 */
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

	getCoinPriceHistory(id: string, days: number | 'max'): Observable<PricePoint[]> {
		return this.http
			.get<ChartData>(`${this.API_URL}/coins/${id}/market_chart`, {
				params: new HttpParams().set('vs_currency', 'USD').set('days', days)
			})
			.pipe(
				map(data =>
					data.prices.map((p: any) => {
						return { date: new Date(p[0]), price: p[1] } as PricePoint;
					})
				)
			);
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
	high_24h: number;
	low_24h: number;
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

export interface PricePoint {
	date: Date;
	price: number;
}

export interface ChartData {
	prices: [number, number];
}
