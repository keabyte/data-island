import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { ClassicFooterComponent } from './classic-footer/classic-footer.component';
import { ClassicLayoutContainerComponent } from './classic-layout-container/classic-layout-container.component';
import { NavbarTopComponent } from './navbar-top/navbar-top.component';

@NgModule({
	declarations: [ClassicLayoutContainerComponent, NavbarTopComponent, ClassicFooterComponent],
	imports: [CommonModule, RouterModule, SharedModule],
	exports: [ClassicLayoutContainerComponent]
})
export class ClassicLayoutModule {}
