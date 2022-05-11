export class Core {
    constructor(
        public battleSize: BattleSize[],
        public detachments: DetachmentType[],
        public armies: CoreArmy[]
    ) {
    }
}

export class BattleSize {
    constructor(
        public name: string,
        public commandPoints: number,
        public points: number
    ) {
    }
}

export class DetachmentType {
    constructor(
        public name: string,
        public cost: number,
        public hq: RestrictionCount,
        public troops: RestrictionCount,
        public elites: RestrictionCount,
        public fastAttack: RestrictionCount,
        public heavySupport: RestrictionCount,
        public dedicatedTransport: RestrictionCount,
        public flyer: RestrictionCount
    ) {
    }
}

export class RestrictionCount {
    constructor(
        public min: number,
        public max: number
    ) {
    }
}

export class CoreArmy {
    constructor(
        public name: string,
        public superFaction: string,
        public fileName: string
    ) {
    }
}
