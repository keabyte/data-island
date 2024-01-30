import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PortfolioTrackerComponent } from './portfolio-tracker/portfolio-tracker.component';
import { PortfolioDetailsComponent } from './portfolio-details/portfolio-details.component';

const routes: Routes = [{ path: '', component: PortfolioTrackerComponent, pathMatch: 'full' }];

@NgModule({
	declarations: [PortfolioTrackerComponent, PortfolioDetailsComponent],
	imports: [RouterModule.forChild(routes), CommonModule, SharedModule]
})
export class PortfolioModule {}
