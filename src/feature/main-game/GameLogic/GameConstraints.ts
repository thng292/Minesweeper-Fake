const enum Difficulties {
    Easy = "Easy",
    Normal = "Normal",
    Hard = "Hard",
    Crazy = "Crazy",
    Custom = "Custom"
}

export default Difficulties

export const MenuText = [
    "Change Difficulty",
    "New Game",
    "Restart",
]

export interface BoardDetail {
    name: string,
    w: number,
    h: number,
    bombs: number
}

export const DifficultiesDetail = {
    Easy: {
        name: "Easy",
        w: 9,
        h: 9,
        bombs: 10
    },
    Normal: {
        name: "Normal",
        w: 16,
        h: 16,
        bombs: 40
    },
    Hard: {
        name: "Hard",
        w: 30,
        h: 16,
        bombs: 99
    },
    Crazy: {
        name: "Crazy",
        w: 50,
        h: 50,
        bombs: 625
    },
}