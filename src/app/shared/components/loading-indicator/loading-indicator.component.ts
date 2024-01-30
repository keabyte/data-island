import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'dil-loading-indicator',
	templateUrl: './loading-indicator.component.html',
	styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnInit {
	@Input() show: boolean = false;

	@Input()
	format: 'bar' | 'spinner' = 'bar';

	@Input()
	diameter: number = 100;

	constructor() {}

	ngOnInit(): void {}
}
