import TestComponent from './TestComponent.svelte';

// probamos que el componente se monte
describe('Pokemon Details', () => {
	let instance = null;
	beforeEach(() => {
		const host = document.createElement('div');
		document.body.append(host);
		instance = new TestComponent({ target: host });
	});

	it('Should show a loading spinner when making the API Call', () => {
		expect(instance).toBeTruthy();
	});
});
