import Elysia from "elysia";
import { avaProfile } from "./profile";
import type { FileSink } from "bun";

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

    let logWritter: FileSink

    if (config.filePath) {
        const file = Bun.file(config.filePath);
        logWritter = file.writer();
    }

    const log = (msg: string) => {
        if (config.filePath) {
            if (!logWritter) throw new Error("Unable to find FileSink when trying to logging");
            logWritter.write(`${msg}\n`)
            logWritter.flush()
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
            .onRequest(({ store }) => {
                store.req_timeStart = process.hrtime.bigint();
            })
            .onAfterHandle({ as: 'global' }, ctx => {
                const profile = printer({
                    startTime: ctx.store.req_timeStart,
                    method: ctx.request.method,
                    path: ctx.path,
                    isDebug: config.isDebug
                })[0]()
                log(profile)
            })
            .onError({ as: 'global' }, ctx => {
                const profile = printer({
                    startTime: ctx.store.req_timeStart,
                    method: ctx.request.method,
                    isDebug: config.isDebug,
                    path: ctx.path,
                    //@ts-ignore
                    errMsg: ctx.error.msg
                })[1]()
                log(profile)
            })
    }
}