import Elysia from "elysia";
import { avaProfile, type ProfileArgs, type ProfileReturn } from "./profile";

interface Config {
    profile?: 'greencomb'
    filePath?: string
    isDebug?: boolean
}

interface InternalConfig extends Config {
    profile: 'greencomb'
    isDebug: boolean
}

export class UrnLogger {

    cfg: InternalConfig
    profile: (c: ProfileArgs) => ProfileReturn

    constructor(cfg: Config) {
        this.cfg = {
            ...cfg,
            isDebug: cfg.isDebug === undefined ? false : cfg.isDebug,
            profile: cfg.profile ? cfg.profile : 'greencomb'
        };

        this.profile = avaProfile[this.cfg.profile]
    }

    log(msg: string) {
        if (this.cfg.filePath) {
            Bun.write(this.cfg.filePath, msg)
        } else {
            console.log(msg)
        }
    }

    instance() {
        return new Elysia({
            name: 'urn-logger'
        })
            .state('req_timeStart', 0n)
            .onRequest(({ store, request }) => {
                store.req_timeStart = process.hrtime.bigint();
            })
            .onAfterResponse({ as: 'global' }, ctx => {
                const profile = this.profile({
                    startTime: ctx.store.req_timeStart,
                    method: ctx.request.method,
                    path: ctx.path
                })[0]()
                this.log(profile)
            })
            .onError({ as: 'global' }, ctx => {
                const profile = this.profile({
                    startTime: ctx.store.req_timeStart,
                    method: ctx.request.method,
                    path: ctx.path
                })[1]()
                this.log(profile)
            })
    }
}