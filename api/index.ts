import { setupApp } from "../server/index";

// Cache the app instance across serverless invocations
let app: any = null;

export default async function handler(req: any, res: any) {
    if (!app) {
        app = await setupApp();
    }
    return app(req, res);
}
