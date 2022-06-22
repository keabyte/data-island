import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { AmountChangeComponent } from './components/amount-change/amount-change.component';
import { MaterialModule } from './modules/material.module';
import { PricePipe } from './pipe/price.pipe';
import { ShortCurrencyPipe } from './pipe/short-currency.pipe';

const modules = [MaterialModule, NgxEchartsModule];

const components = [PricePipe, ShortCurrencyPipe, AmountChangeComponent];

@NgModule({
	declarations: [...components],
	imports: [
		CommonModule,
		NgxEchartsModule.forRoot({
			echarts: () => import('echarts')
		}),
		...modules
	],
	exports: [...modules, ...components]
})
export class SharedModule {}
