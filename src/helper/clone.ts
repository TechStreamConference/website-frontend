export class Clone<T> {
	public readonly value: T;

	private copy(data: T): T {
		return structuredClone(data);
	}

	constructor(data: T) {
		this.value = this.copy(data);
	}

	get(): T {
		return this.copy(this.value);
	}
}
