import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ArmyService} from "../../services/army.service";
import {CodexService} from "../../services/codex.service";
import {CalculationService} from "../../services/calculation.service";
import {Army} from "../../models/army";
import {Model, Statistics, Unit} from "../../models/unit";
import {Codex, WeaponProfile} from "../../models/codex";

@Component({
    selector: 'app-unit-view',
    templateUrl: './unit-view.component.html',
    styleUrls: ['./unit-view.component.scss']
})
export class UnitViewComponent implements OnInit {

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

    compare(item1: any, item2: any) {
        return item1 && item2 ? item1.name === item2.name : item1 === item2;
    }

    calculatePoints(unit: Unit): number {
        return this.calculationService.calculateUnitPointsCost(unit);
    }

    getWeaponProfile(name: string, id: number): WeaponProfile {
        return this.findCodex(name).armoury.find((weapon: WeaponProfile) => weapon.id === id)!;
    }

    findCodex(name: string): Codex {
        return this.codexes.find((item: Codex) => item.config.name === name)!;
    }

    findModelMinimum(name: string): number {
        return this.activeUnit!.statistics.find((statistic: Statistics) => statistic.name === name)!.numberMin;
    }

    findModelMaximum(name: string): number {
        return this.activeUnit!.statistics.find((statistic: Statistics) => statistic.name === name)!.numberMax;
    }

    findModelCount(name: string): number {
        return this.activeUnit!.models.filter((model: Model) => model.name === name).length;
    }

    addModel(model: Model, index?: number): void {
        if (index) {
            this.activeUnit!.models.splice(index, 0, model);
        } else {
            this.activeUnit!.models.push(model);
        }
    }

    removeModel(model: Model) {
        this.activeUnit!.models.splice(this.activeUnit!.models.indexOf(model), 1);
    }
}
