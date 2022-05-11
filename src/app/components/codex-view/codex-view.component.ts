import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ArmyService} from "../../services/army.service";
import {CodexService} from "../../services/codex.service";
import {CalculationService} from "../../services/calculation.service";
import {Army} from "../../models/army";
import {Unit} from "../../models/unit";
import {Codex, WeaponProfile} from "../../models/codex";

@Component({
    selector: 'app-codex-view',
    templateUrl: './codex-view.component.html',
    styleUrls: ['./codex-view.component.scss']
})
export class CodexViewComponent implements OnInit {

    army!: Army;
    armySubscription: Subscription;
    activeUnit: Unit | undefined;
    activeUnitSubscription: Subscription;
    codexes!: Codex[];
    codexesSubscription: Subscription;

    constructor(private armyService: ArmyService,
                private codexService: CodexService,
                private calculationService: CalculationService) {
        this.armySubscription = this.armyService.getArmy().subscribe( data => this.army = data);
        this.activeUnitSubscription = this.armyService.getActiveUnit().subscribe( data => this.activeUnit = data);
        this.codexesSubscription = this.codexService.getCodexes().subscribe( data => this.codexes = data);
    }

    ngOnInit(): void {
    }

    calculatePoints(unit: Unit): number {
        return this.calculationService.calculateUnitPointsCost(unit);
    }

    findCodex(name: string): Codex {
        return this.codexes.find((item: Codex) => item.config.name === name)!;
    }

    getWeaponProfile(name: string, id: number): WeaponProfile {
        return this.findCodex(name).armoury.find((weapon: WeaponProfile) => weapon.id === id)!;
    }
}
