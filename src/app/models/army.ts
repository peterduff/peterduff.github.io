export class Army {
    constructor(
        public name: string,
        public totalPoints: number,
        public totalCP: number,
        public battleSize: BattleSize,
        public detachments: Detachment[]
    ){}
}

export class BattleSize {
    constructor(
        public name: string,
        public commandPoints: number,
        public points: number
    ){}
}

export class Detachment {
    constructor(
        public armyType: ArmyType,
        public detachmentType: DetachmentType,
        public units: Unit[]
    ){}
}

export class ArmyType {
    constructor(
        public name: string,
        public faction: string,
        public fileName: string
    ){}
}

export class DetachmentType {
    constructor(
        public name: string,
        public subFaction: string,
        public cost: number
    ){}
}

export class Unit {
    constructor(
        public id: number,
        public uuid: number,
        public name: string,
        public role: string,
        public listPoints: number
    ){}
}
