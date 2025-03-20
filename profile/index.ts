import type { HTTPMethod } from "elysia";
import { greencomb } from "./greencomb";

export interface ProfileArgs {
    startTime: bigint
    method: HTTPMethod
    path: string
}

export const avaProfile = {
    greencomb: greencomb
}