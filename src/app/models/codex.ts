import {SubFaction} from "./army";
import {Unit} from "./unit";

export class Codex {
    constructor(
        public config: Config,
        public armyWideRules: Rule[],
        public subFactions: SubFaction[],
        public traits: Rule[],
        public relics: Rule[],
        public units: Unit[],
        public armoury: WeaponProfile[],
        public psychicPowers?: PsychicDiscipline[],
        public armyOfRenown?: any[],
        public infernalPacts?: Rule[]
    ) {
    }
}

export class Config {
    constructor(
        public name: string,
        public superFaction: string,
        public fileName: string
    ){}
}

export class Rule {
    constructor(
        public name: string,
        public rule: string,
        public profile?: WeaponProfile
    ) {
    }
}

export class WeaponProfile {
    constructor(
        public id: number,
        public name: string,
        public range?: number,
        public type?: string,
        public strength?: string,
        public armorPenetration?: string,
        public damage?: string,
        public abilities?: string,
        public description?: string,
        public profile?: WeaponSubProfile[]
    ) {
    }
}

export class WeaponSubProfile {
    constructor(
        public name: string,
        public range: number,
        public type: string,
        public strength: string,
        public armorPenetration: string,
        public damage: string,
        public abilities: string,
    ) {
    }
}

export class PsychicDiscipline {
    constructor(
        public discipline: string,
        public powers: Rule[]
    ) {
    }
}
