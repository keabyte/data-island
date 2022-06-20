import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassicLayoutContainerComponent } from './shared/layouts/classic/classic-layout-container/classic-layout-container.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: ClassicLayoutContainerComponent,
		loadChildren: () => import('./features/coins/coins.module').then(m => m.CoinsModule)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
