import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ArmyService} from "../../services/army.service";
import {CodexService} from "../../services/codex.service";
import {CalculationService} from "../../services/calculation.service";
import {Guid} from "guid-typescript";
import {ModalService} from "../../services/modal.service";

@Component({
    selector: 'app-army-bar',
    templateUrl: './army-bar.component.html',
    styleUrls: ['./army-bar.component.scss']
})
export class ArmyBarComponent implements OnInit {

    army: any;
    armySubscription: Subscription;
    activeUnit: any;
    activeUnitSubscription: Subscription;

    constructor(private armyService: ArmyService,
                private codexService: CodexService,
                private calculationService: CalculationService,
                private modalService: ModalService) {
        this.armySubscription = this.armyService.getArmy().subscribe( data => this.army = data);
        this.activeUnitSubscription = this.armyService.getActiveUnit().subscribe( data => this.activeUnit = data);
    }

    ngOnInit(): void {
    }

    openModal(id: string): void {
        this.modalService.open(id);
    }

    closeModal(id: string): void {
        this.modalService.close(id);
    }

    setActiveUnit(unit: any): void {
        this.armyService.setActiveUnit(unit);
    }

    addUnit(detachment: any, unit: any, index: number): void {
        let newUnit = this.cloneObject(unit);
        newUnit.uuid = Guid.raw();
        detachment.units.splice(index, 0, newUnit);
        this.armyService.setArmy(this.army);
    }

    removeUnit(detachment: any, unit: any): void {
        detachment.units = detachment.units.filter((item: any) => item.uuid !== unit.uuid);
        this.armyService.setActiveUnit(undefined);
        this.armyService.setArmy(this.army);
    }

    calculateArmyPointsCost(detachments: any): number {
        return this.calculationService.calculateArmyPointsCost(detachments);
    }

    calculateMultipleUnitsPointsCost(units: any): number {
        return this.calculationService.calculateMultipleUnitsPointsCost(units);
    }

    calculateUnitPoints(unit: any): number {
        return this.calculationService.calculateUnitPointsCost(unit);
    }

    weaponsCount(unit: any, name: string): number {
        return this.calculationService.calculateWeaponsAggregation(unit, name);
    }

    filterWeaponDuplicates(models: any): any[] {
        let weapons: any[] = [];

        if (models) {
            models.forEach((model: any) => {
                model.weaponOptions.forEach((option: any) => {
                    if(!weapons.includes(option.selectedOption.name)) {
                        weapons.push(option.selectedOption.name);
                    }
                });
            });
        }

        return weapons;
    }

    cloneObject(object: any): any {
        return JSON.parse(JSON.stringify(object));
    }
}
