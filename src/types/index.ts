export enum UserRole {
    Fan = "fan",
    Brand = "brand",
    Host = "host",
}

export type User = {
    id: string;
    email: string;
    isNewUser: boolean;
    role: UserRole | "";
    pfp_url: string;
    categories: Catergories[];
    network: Networks;
    bio: string;
    group: Group | null;
    campaigns: Campaign[];
};

export type Group = {
    id: string;
    pfp_url: string;
    name: string;
    ticker: string;
    description: string;
    contractAddress: `0x${string}`;
};

export type Campaign = {
    id: string;
    pfp_url: string;
    title: string;
    space_link: string;
    agenda: string;
    event_date: string;
    event_time: string;
    event_duration: number;
    total_slots: number;
    price_per_slot: number;
};

export enum Catergories {
    GAMING = "gaming",
    DEFI = "defi",
    SOCIALFI = "socialfi",
    NFT_PFP = "nft_pfp",
}

export enum Networks {
    MERLIN = "merlin",
}
