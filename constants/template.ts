export interface TemplateItem {
	id: number;
	title: string;
	updated_at: string;
	moreIsClicked: boolean;
	image: string;
}

export interface VersionTemplateItem {
	id: number;
	version: number;
	title: string;
	updated_at: string;
	is_publishing: boolean;
	image: string
}
