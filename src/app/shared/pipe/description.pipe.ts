import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'description'
})
export class DescriptionPipe implements PipeTransform {
	transform(value: string, ...args: unknown[]): unknown {
		return value.replace(/\n/g, '<br />').replace(/<a/g, '<a target="_blank"');
	}
}
