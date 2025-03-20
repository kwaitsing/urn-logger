import Elysia from "elysia";
import { avaProfile } from "./profile";

interface Config {
    profile?: 'greencomb'
    filePath?: string
    isDebug?: boolean
}

export const urnLogger = (cfg: Config) => {
    const config = {
        ...cfg,
        isDebug: cfg.isDebug === undefined ? false : cfg.isDebug,
        profile: cfg.profile ? cfg.profile : 'greencomb'
    };

    const log = (msg: string) => {
        if (config.filePath) {
            Bun.write(config.filePath, msg)
        } else {
            console.log(msg)
        }
    }

    const printer = avaProfile[config.profile]

    return () => {
        return new Elysia({
            name: 'urn-logger'
        })
            .state('req_timeStart', 0n)
            .onRequest(({ store, request }) => {
                store.req_timeStart = process.hrtime.bigint();
            })
            .onAfterResponse({ as: 'global' }, ctx => {
                const profile = printer({
                    startTime: ctx.store.req_timeStart,
                    method: ctx.request.method,
                    path: ctx.path
                })[0]()
                log(profile)
            })
            .onError({ as: 'global' }, ctx => {
                const profile = printer({
                    startTime: ctx.store.req_timeStart,
                    method: ctx.request.method,
                    path: ctx.path
                })[1]()
                log(profile)
            })
    }
}