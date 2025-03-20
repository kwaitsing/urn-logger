import type { HTTPMethod } from "elysia";
import { greencomb } from "./greencomb";

export interface ProfileReturn {
    0: () => string;
    1: () => string;
}

export interface ProfileArgs {
    startTime: bigint
    method: HTTPMethod
    path: string
}

export const avaProfile = {
    greencomb: greencomb
}