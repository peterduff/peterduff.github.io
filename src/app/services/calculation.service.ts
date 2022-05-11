import {Injectable} from '@angular/core';
import {Model, Unit, Wargear, WeaponOption} from "../models/unit";
import {Detachment} from "../models/army";

@Injectable({
    providedIn: 'root'
})
export class CalculationService {

    constructor() {
    }

    calculateUnitPointsCost(unit: Unit): number {
        let cost = 0;

        if (unit.wargear) {
            unit.wargear.forEach((wargear: Wargear) => {
                cost += wargear.selectedOption.cost;
            });
        }

        unit.models.forEach((model: Model) => {
            cost += model.points;
            if (model.weaponOptions) {
                model.weaponOptions.forEach((weaponOption: WeaponOption) => {
                    cost += weaponOption.selectedOption.cost;
                });
            }
        });

        return cost;
    }

    calculateWeaponsAggregation(unit: Unit, name: string): number {
        let amount = 0;

        unit.models.forEach((model: Model) => {
            model.weaponOptions.forEach((weaponOption: WeaponOption) => {
                if (weaponOption.selectedOption.name === name) {
                    amount++;
                }
            });
        });

        return amount;
    }

    calculateMultipleUnitsPointsCost(units: Unit[] | undefined): number {
        let cost = 0;

        if (units) {
            units.forEach((unit: Unit) => {
                cost += this.calculateUnitPointsCost(unit);
            });
        }

        return cost;
    }

    calculateArmyPointsCost(detachments: Detachment[]): number {
        let cost = 0;

        detachments.forEach((detachment: Detachment) => {
            cost += this.calculateMultipleUnitsPointsCost(detachment.units);
        });

        return cost;
    }
}
