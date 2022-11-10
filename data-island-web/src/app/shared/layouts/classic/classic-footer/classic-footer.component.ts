import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'dil-classic-footer',
	templateUrl: './classic-footer.component.html',
	styleUrls: ['./classic-footer.component.scss']
})
export class ClassicFooterComponent implements OnInit {
	environment = environment;

	constructor() {}

	ngOnInit(): void {}
}
