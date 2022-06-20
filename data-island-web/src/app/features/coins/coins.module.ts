import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoinDashboardComponent } from './coin-dashboard/coin-dashboard.component';

const routes: Routes = [{ path: '', component: CoinDashboardComponent, pathMatch: 'full' }];

@NgModule({
	declarations: [CoinDashboardComponent],
	imports: [RouterModule.forChild(routes), CommonModule, SharedModule]
})
export class CoinsModule {}
