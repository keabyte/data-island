export function round(n: number) {
	return Math.round((n + Number.EPSILON) * 100) / 100;
}
