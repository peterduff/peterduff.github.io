import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CodexService} from "../../services/codex.service";
import {ArmyService} from "../../services/army.service";
import {Detachment} from "../../models/army";
import {Guid} from "guid-typescript";
import {ModalService} from "../../services/modal.service";
import {CalculationService} from "../../services/calculation.service";

@Component({
    selector: 'app-codex-bar',
    templateUrl: './codex-bar.component.html',
    styleUrls: ['./codex-bar.component.scss']
})
export class CodexBarComponent implements OnInit {

    textFilter: string = '';

    core: any;
    coreSubscription: Subscription;
    codexes: any;
    codexesSubscription: Subscription;
    army: any;
    armySubscription: Subscription;
    activeUnit: any;
    activeUnitSubscription: Subscription;
    detachmentIndex: any;
    detachmentIndexSubscription: Subscription;

    constructor(private codexService: CodexService,
                private armyService: ArmyService,
                private modalService: ModalService,
                private calculationService: CalculationService) {
        this.coreSubscription = this.codexService.getCore().subscribe( data => this.core = data);
        this.codexesSubscription = this.codexService.getCodexes().subscribe(data => this.codexes = data);
        this.armySubscription = this.armyService.getArmy().subscribe(data => this.army = data);
        this.activeUnitSubscription = this.armyService.getActiveUnit().subscribe(data => {
            this.activeUnit = data;
        });
        this.detachmentIndexSubscription = this.armyService.getDetachmentIndex().subscribe(data => this.detachmentIndex = data);
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
        this.army.detachments.push(new Detachment(this.core.armies[0], this.core.detachments[0], []));
        this.armyService.calculateArmyCP();
    }

    removeDetachment(index: number): void {
        this.army.detachments.splice(index,  1);
        this.armyService.calculateArmyCP();
    }

    updateArmy(): void {

    }

    addUnit(detachment: any, unit: any) {
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

    setDetachmentIndex(index: any) {
        this.armyService.setDetachmentIndex(index);
    }

    findCodex(name: string): any {
        return this.codexes.find((item: any) => item.name === name)
    }

    setActiveUnit(unit: any): void {
        this.armyService.setActiveUnit(unit);
    }

    calculatePoints(unit: any): number {
        return this.calculationService.calculateUnitPointsCost(unit);
    }

    cloneObject(object: any): any {
        return JSON.parse(JSON.stringify(object));
    }
}
