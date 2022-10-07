type Pair<T1,T2> = {
    fi: T1,
    se: T2,
}

export function mkpair<T1,T2>(first: T1, second: T2): Pair <T1,T2> {
    return {
        fi: first,
        se: second,
    }
}

export default Pair