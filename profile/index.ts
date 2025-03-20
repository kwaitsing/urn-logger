import type { HTTPMethod } from "elysia";
import { greencomb } from "./greencomb";

export interface ProfileArgs {
    startTime: bigint
    method: HTTPMethod
    path: string
    isDebug: boolean
    errMsg?: string
}

export const avaProfile = {
    greencomb: greencomb
}