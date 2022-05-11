import {Unit} from "./unit";
import {BattleSize, DetachmentType} from "./core";
import {Rule} from "./codex";

export class Army {
    constructor(
        public name: string,
        public totalPoints: number,
        public totalCP: number,
        public battleSize: BattleSize,
        public detachments: Detachment[]
    ){}
}

export class Detachment {
    constructor(
        public uuid: string,
        public config: Config,
        public detachmentType: DetachmentType,
        public units: Unit[]
    ){}
}

export class Config {
    constructor(
        public name: string,
        public superFaction: string,
        public subFaction: SubFaction,
        public fileName: string
    ){}
}

export class SubFaction {
    constructor(
        public name: string,
        public psychicPower?: Rule,
        public trait?: Rule,
        public relic?: Rule
    ){}
}
