import {Rule} from "./codex";

export class Unit {
    constructor(
        public id: number,
        public name: string,
        public codex: string,
        public role: string,
        public power: string,
        public statistics: Statistics[],
        public description: string,
        public models: Model[],
        public factionKeywords: string[],
        public keywords: string[],
        public defaultModels?: Model[],
        public weapons?: number[],
        public otherWargear?: Rule[],
        public wargearOptions?: string[],
        public abilities?: Rule[],
        public psyker?: Psyker,
        public wargear?: Wargear[],
        public uuid?: number
    ) {
    }
}

export class Statistics {
    constructor(
        public numberMin: number,
        public numberMax: number,
        public name: string,
        public movement: number,
        public weaponSkill: number,
        public ballisticSkill: number,
        public strength: number,
        public toughness: number,
        public wounds: number,
        public attacks: number,
        public leadership: number,
        public save: number
    ) {
    }
}

export class Psyker {
    constructor(
        public description: string,
        public powers: Rule[]
    ) {
    }
}

export class Wargear {
    constructor(
        public selectedOption: SelectedOption,
        public options: WargearOption[]
    ) {
    }
}

export class SelectedOption {
    constructor(
        public name: string,
        public cost: number
    ) {
    }
}

export class WargearOption {
    constructor(
        public name: string,
        public cost?: number,
        public power?: number
    ) {
    }
}

export class Model {
    constructor(
        public name: string,
        public points: number,
        public weaponOptions: WeaponOption[]
    ) {
    }
}

export class WeaponOption {
    constructor(
        public selectedOption: SelectedOption,
        public options: WargearOption[]
    ) {
    }
}
