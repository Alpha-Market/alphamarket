import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const swipeConfidenceThreshold = 10000;

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};
