import Pair, { mkpair } from '../CommonTypes/Pair.js'

function ok(a: Pair<number, number>[], b: Pair<number, number>): boolean {
    for (let i of a) {
        if (i.fi == b.fi && i.se == b.se) return true
    }
    return false
}

export default function RandBombs(width: number, height: number, noBombs: number): Pair<number, number>[] {
    let ans: Pair<number,number>[] = []
    while (ans.length < noBombs) {
        let tmp = mkpair(Math.floor(Math.random() * height), Math.floor(Math.random() * width))
        while (ok(ans, tmp)) {
            tmp = mkpair(Math.floor(Math.random() * height), Math.floor(Math.random() * width))
        }
        ans.push(tmp)
    }
    // HEIGHT, WIDTH
    return ans
}