import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import 'echarts';
import { EChartsOption } from 'echarts';
import { Subscription } from 'rxjs';
import { PricePipe } from 'src/app/shared/pipe/price.pipe';
import { CoinGeckoService, PricePoint } from 'src/app/shared/services/coin-gecko.service';

@Component({
	selector: 'dil-coin-price-history-chart',
	templateUrl: './coin-price-history-chart.component.html',
	styleUrls: ['./coin-price-history-chart.component.scss']
})
export class CoinPriceHistoryChartComponent implements OnChanges {
	@Input() coinId: string;
	currency = 'USD';

	retrieveDays: number = 7;
	chartOption: EChartsOption;
	loading$: Subscription = new Subscription();

	constructor(private coinService: CoinGeckoService, private pricePipe: PricePipe, private datePipe: DatePipe) {}

	ngOnChanges(changes: SimpleChanges): void {
		this.refresh();
	}

	refresh(): void {
		this.loadData();
	}

	get loading() {
		return !this.loading$.closed;
	}

	loadData() {
		this.loading$ = this.coinService
			.getCoinPriceHistory(this.coinId, this.retrieveDays)
			.subscribe(data => this.createChart(data));
	}

	retrieveDaysChanged() {
		this.loadData();
	}

	createChart(data: PricePoint[]) {
		this.chartOption = {
			textStyle: {
				fontFamily: 'Poppins'
			},
			grid: {
				containLabel: true,
				right: 10,
				left: 10,
				top: 10,
				bottom: 10
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: data.map(p => p.date.toISOString()),
				axisLabel: {
					formatter: (label: any) => {
						return this.datePipe.transform(new Date(label), 'mediumDate') || label;
					}
				}
			},
			yAxis: {
				type: 'value',
				min: 'dataMin',
				axisLabel: {
					formatter: (label: any) => {
						const priceFormatted = this.formatShortCurrency(label);
						return `${priceFormatted}`;
					}
				}
			},
			series: [
				{
					data: data.map(p => p.price),
					type: 'line',
					areaStyle: {
						color: 'rgba(33, 150, 243, 0.6)'
					},
					lineStyle: { color: '#2196f3' }
				}
			],
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: '#6a7985',
						formatter: (params: any) => {
							if (params.axisDimension === 'y') {
								const priceFormatted = this.formatShortCurrency(params.value);
								return `${priceFormatted}`;
							} else if (params.axisDimension === 'x') {
								return this.datePipe.transform(new Date(params.value), 'mediumDate') || params.value;
							}
							return params.value;
						}
					}
				},
				formatter: (series: any) => {
					const p = series[0];
					const price = Number(p['value']);
					const priceFormatted = this.pricePipe.transform(price, this.currency);
					const date = this.datePipe.transform(new Date(p['name']), 'medium') || p['name'];
					return `${date}<br><b>${priceFormatted}</b>`;
				}
			},
			graphic: [
				{
					type: 'group',
					rotation: 0,
					bounding: 'raw',
					right: 84,
					bottom: 40,
					z: 100,
					children: [
						{
							type: 'text',
							left: 'center',
							top: 'center',
							z: 100,
							style: {
								fill: 'rgba(172, 175, 178, 0.3)',
								text: 'dataisland.io',
								fontFamily: 'Poppins',
								fontSize: '22px'
							}
						}
					]
				}
			]
		};
	}

	formatShortCurrency(value: string | number) {
		const price = Number(value);
		const priceFormatted = this.pricePipe.transform(price, this.currency);
		return priceFormatted;
	}
}
