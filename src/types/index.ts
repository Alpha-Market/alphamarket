export enum UserRole {
    Fan = "fan",
    Brand = "brand",
    Host = "host"
}

export type User = {
    id: string;
    email: string;
    isNewUser: boolean;
    role: UserRole | "";
    pfp_url: string;
    categories: Catergories[],
    network: Networks,
    bio: string;
    group: Group;
};

export type Group = {
    id: string,
    pfp_url: string,
    name: string,
    ticker: string,
    description: string;
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