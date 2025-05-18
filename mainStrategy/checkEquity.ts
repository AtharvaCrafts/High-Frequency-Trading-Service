import a from "../assert/Assert";
import { kc } from "../sessionGen";

export async function checkEquity(symbol : string){
    const equity = await kc.getProfile();
    a.assertDefined(equity, 'no holdings');
    return equity;
}