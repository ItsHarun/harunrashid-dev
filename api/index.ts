import { setupApp } from "../server/index";

export default async function handler(req: any, res: any) {
    const app = await setupApp();
    app(req, res);
}
