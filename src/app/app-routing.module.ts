import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassicLayoutContainerComponent } from './shared/layouts/classic/classic-layout-container/classic-layout-container.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: ClassicLayoutContainerComponent,
		loadChildren: () => import('./features/coins/coins.module').then(m => m.CoinsModule)
	},
	{
		path: 'portfolio',
		pathMatch: 'full',
		component: ClassicLayoutContainerComponent,
		loadChildren: () => import('./features/portfolio/portfolio.module').then(m => m.PortfolioModule)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
