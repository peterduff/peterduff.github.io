import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ArmyService} from "../../services/army.service";
import {CodexService} from "../../services/codex.service";
import {Guid} from "guid-typescript";
import {CalculationService} from "../../services/calculation.service";

@Component({
    selector: 'app-unit-view',
    templateUrl: './unit-view.component.html',
    styleUrls: ['./unit-view.component.scss']
})
export class UnitViewComponent implements OnInit {

    army: any;
    armySubscription: Subscription;
    activeUnit: any;
    activeUnitSubscription: Subscription;
    detachmentIndex: any;
    detachmentIndexSubscription: Subscription;
    codexes: any;
    codexesSubscription: Subscription;

    constructor(private armyService: ArmyService,
                private codexService: CodexService,
                private calculationService: CalculationService) {
        this.armySubscription = this.armyService.getArmy().subscribe( data => this.army = data);
        this.activeUnitSubscription = this.armyService.getActiveUnit().subscribe( data => this.activeUnit = data);
        this.detachmentIndexSubscription = this.armyService.getDetachmentIndex().subscribe(data => this.detachmentIndex = data);
        this.codexesSubscription = this.codexService.getCodexes().subscribe( data => this.codexes = data);
    }

    ngOnInit(): void {
    }

    compare(item1: any, item2: any) {
        return item1 && item2 ? item1.name === item2.name : item1 === item2;
    }

    calculatePoints(unit: any): number {
        return this.calculationService.calculateUnitPointsCost(unit);
    }

    weapon(codexName: string, id: number): any {
        return this.codexes.find((codex: any) => {
            return codex.name === codexName;
        }).armoury.find((weapon: any) => weapon.id === id);
    }

    findCodex(name: string): any {
        return this.codexes.find((item: any) => item.name === name)
    }

    findModelMinimum(name: string): number {
        return this.activeUnit.statistics.find((statistic: any) => statistic.name === name).numberMin;
    }

    findModelMaximum(name: string): number {
        return this.activeUnit.statistics.find((statistic: any) => statistic.name === name).numberMax;
    }

    findModelCount(name: string): number {
        return this.activeUnit.models.filter((model: any) => model.name === name).length;
    }

    cloneObject(object: any): any {
        return JSON.parse(JSON.stringify(object));
    }

    removeUnit(detachment: any, unit: any) {
        detachment.units = detachment.units.filter((item: any) => item.uuid !== unit.uuid);
        this.armyService.setArmy(this.army);
        this.armyService.setActiveUnit(undefined);
    }

    addModel(model: any, index?: number): void {
        if (index) {
            this.activeUnit.models.splice(index, 0, model);
        } else {
            this.activeUnit.models.push(model);
        }
    }

    removeModel(model: any) {
        this.activeUnit.models.splice(this.activeUnit.models.indexOf(model), 1);
    }
}
