export type DeepPartial<T> = T extends object ? {
	[P in keyof T]?: DeepPartial<T[P]>
} : T;

export enum UserRole {
	Fan = "fan",
	Brand = "brand",
	Host = "host",
}

export interface User {
	id: string;
	created_at: string;
	name: string;
	email: string;
	bio: string;
	isNewUser: boolean;
	role: UserRole | "";
	categories: Categories[];
	networks: Network[];
	optedForEmailCampaign: boolean;
	profile_picture_url: string;
	twitter_handle?: string;
	twitter_avatar_url?: string;
	group: Group | null;
	campaigns: Campaign[];
	reviews: Review[];
	// displayName?: string;
	// photoURL?: string;
}

export interface Group {
	id: string;
	created_at: string;
	name: string;
	ticker: string;
	description: string;
	contract_address: `0x${string}`;
	profile_picture_url: string;
	user_id: string;
}

export interface Campaign {
	id: string;
	created_at: string;
	profile_picture_url: string;
	title: string;
	space_link: string;
	agenda: string;
	event_date: string;
	event_time: string;
	event_duration: number;
	total_slots: number;
	price_per_slot: number;
	user_id: string;
}

export type Rating = 0 | 1 | 2 | 3 | 4 | 5;

export interface Review {
	id: string;
	created_at: string;
	rating: Rating;
	review: string;
	reviewer_name: string;
	reviewer_role: string;
	reviewer_user_id: string;
	attestation_uid: string;
	user_id: string;
	reviewer: User;
}

export enum Categories {
	GAMING = "gaming",
	DEFI = "defi",
	SOCIALFI = "socialfi",
	NFT_PFP = "nft_pfp",
}

export enum Network {
	SEPOLIA = "sepolia",
	MERLIN = "merlin",
}
