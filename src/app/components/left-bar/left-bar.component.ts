import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CodexService} from "../../services/codex.service";
import {ArmyService} from "../../services/army.service";
import {Army, Config, Detachment, SubFaction} from "../../models/army";
import {Guid} from "guid-typescript";
import {ModalService} from "../../services/modal.service";
import {CalculationService} from "../../services/calculation.service";
import {Core} from "../../models/core";
import {Codex} from "../../models/codex";
import {Unit} from "../../models/unit";

@Component({
    selector: 'app-left-bar',
    templateUrl: './left-bar.component.html',
    styleUrls: ['./left-bar.component.scss']
})
export class LeftBarComponent implements OnInit {

    textFilter: string = '';

    core!: Core;
    coreSubscription: Subscription;
    codexes!: Codex[];
    codexesSubscription: Subscription;
    army!: Army;
    armySubscription: Subscription;
    activeUnit: Unit | undefined;
    activeUnitSubscription: Subscription;

    constructor(private codexService: CodexService,
                private armyService: ArmyService,
                private modalService: ModalService,
                private calculationService: CalculationService) {
        this.coreSubscription = this.codexService.getCore().subscribe( data => this.core = data);
        this.codexesSubscription = this.codexService.getCodexes().subscribe(data => this.codexes = data);
        this.armySubscription = this.armyService.getArmy().subscribe(data => this.army = data);
        this.activeUnitSubscription = this.armyService.getActiveUnit().subscribe(data => this.activeUnit = data);
    }

    ngOnInit(): void {
    }

    openModal(id: string): void {
        this.modalService.open(id);
    }

    closeModal(id: string): void {
        this.modalService.close(id);
    }

    calculateCP(): void {
        this.armyService.calculateArmyCP();
    }

    addDetachment(): void {
        this.army.detachments.push(
            new Detachment(
                Guid.raw(),
                new Config(this.core.armies[0].name, this.core.armies[0].superFaction, new SubFaction(''), this.core.armies[0].fileName),
                this.core.detachments[0],
                []));
        this.armyService.calculateArmyCP();
    }

    removeDetachment(index: number): void {
        this.army.detachments.splice(index,  1);
        this.armyService.calculateArmyCP();
    }

    updateArmy(): void {

    }

    addUnit(detachment: Detachment, unit: Unit) {
        let newUnit = this.cloneObject(unit);
        newUnit.uuid = Guid.raw();
        detachment.units.push(newUnit);
        this.armyService.setArmy(this.army);
    }

    updateGameSize(points: number): void {
        if (points > 500 && points <= 1000) {
            this.army.battleSize = this.core.battleSize[0];
        } else if (points > 1000 && points <= 2000) {
            this.army.battleSize = this.core.battleSize[1];
        }
        this.armyService.setArmy(this.army);
    }

    findCodex(name: string): Codex {
        return this.codexes.find((item: Codex) => item.config.name === name)!;
    }

    setActiveUnit(unit: Unit): void {
        this.armyService.setActiveUnit(unit);
    }

    calculatePoints(unit: Unit): number {
        return this.calculationService.calculateUnitPointsCost(unit);
    }

    compare(item1: any, item2: any) {
        return item1 && item2 ? item1.name === item2.name : item1 === item2;
    }

    cloneObject(object: any): any {
        return JSON.parse(JSON.stringify(object));
    }
}
