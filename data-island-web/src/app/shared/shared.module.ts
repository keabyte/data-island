import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material.module';

const modules = [MaterialModule];

@NgModule({
	declarations: [],
	imports: [...modules],
	exports: [...modules]
})
export class SharedModule {}
