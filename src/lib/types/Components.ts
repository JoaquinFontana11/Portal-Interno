interface IOption {
	name: string;
	value: string | boolean | number;
}
export interface IComponent {
	type: string;
	label: string;
	name: string;
	value: any;
	required?: boolean;
	files?: FileList | Array<File>;
	options?: IOption[];
	images?: Array<Object>;
}
