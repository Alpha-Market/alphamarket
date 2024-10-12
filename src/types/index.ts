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
    categories: string,
    network: string,
    bio: string;
    groups?: Array<Group>;
};

export type Group = {
    id: string,
    pfp_url: string,
    name: string,
    ticker: string,
    description: string;
};