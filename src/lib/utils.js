import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge classes with tailwind-merge
 * @param  {...import("clsx").ClassValue} classes
 * @returns {string}
 */
export function cn(...classes) {
    return twMerge(clsx(classes))
} 