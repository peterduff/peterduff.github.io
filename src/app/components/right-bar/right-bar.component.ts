import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ArmyService} from "../../services/army.service";
import {CodexService} from "../../services/codex.service";
import {CalculationService} from "../../services/calculation.service";
import {Guid} from "guid-typescript";
import {ModalService} from "../../services/modal.service";
import {Model, Unit, WeaponOption} from "../../models/unit";
import {Army, Detachment} from "../../models/army";
import {Codex, WeaponProfile} from "../../models/codex";

@Component({
    selector: 'app-right-bar',
    templateUrl: './right-bar.component.html',
    styleUrls: ['./right-bar.component.scss']
})
export class RightBarComponent implements OnInit {

    army!: Army;
    armySubscription: Subscription;
    activeUnit: Unit | undefined;
    activeUnitSubscription: Subscription;
    codexes!: Codex[];
    codexesSubscription: Subscription;

    constructor(private armyService: ArmyService,
                private codexService: CodexService,
                private calculationService: CalculationService,
                private modalService: ModalService) {
        this.armySubscription = this.armyService.getArmy().subscribe( data => this.army = data);
        this.activeUnitSubscription = this.armyService.getActiveUnit().subscribe( data => this.activeUnit = data);
        this.codexesSubscription = this.codexService.getCodexes().subscribe(data => this.codexes = data);
    }

    ngOnInit(): void {
    }

    openModal(id: string): void {
        this.modalService.open(id);
    }

    closeModal(id: string): void {
        this.modalService.close(id);
    }

    setActiveUnit(unit: Unit): void {
        this.armyService.setActiveUnit(unit);
    }

    addUnit(detachment: Detachment, unit: Unit, index: number): void {
        let newUnit = this.cloneObject(unit);
        newUnit.uuid = Guid.raw();
        detachment.units.splice(index, 0, newUnit);
        this.armyService.setArmy(this.army);
    }

    removeUnit(detachment: Detachment, unit: Unit): void {
        detachment.units = detachment.units.filter((item: Unit) => item.uuid !== unit.uuid);
        this.armyService.setActiveUnit(undefined);
        this.armyService.setArmy(this.army);
    }

    calculateArmyPointsCost(detachments: Detachment[]): number {
        return this.calculationService.calculateArmyPointsCost(detachments);
    }

    calculateMultipleUnitsPointsCost(units: Unit[] | undefined): number {
        return this.calculationService.calculateMultipleUnitsPointsCost(units);
    }

    calculateUnitPoints(unit: Unit): number {
        return this.calculationService.calculateUnitPointsCost(unit);
    }

    weaponsCount(unit: Unit, name: string): number {
        return this.calculationService.calculateWeaponsAggregation(unit, name);
    }

    findCodex(name: string): Codex {
        return this.codexes.find((item: Codex) => item.config.name === name)!;
    }

    compare(item1: any, item2: any) {
        return item1 && item2 ? item1.name === item2.name : item1 === item2;
    }

    // TODO: This should be a pipe
    filterWeaponDuplicates(models: Model[]): string[] {
        let weapons: string[] = [];

        if (models) {
            models.forEach((model: Model) => {
                if (model.weaponOptions) {
                    model.weaponOptions.forEach((option: WeaponOption) => {
                        if(!weapons.includes(option.selectedOption.name)) {
                            weapons.push(option.selectedOption.name);
                        }
                    });
                }
            });
        }

        return weapons;
    }

    cloneObject(object: any): any {
        return JSON.parse(JSON.stringify(object));
    }
}
