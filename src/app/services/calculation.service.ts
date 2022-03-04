import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CalculationService {

    constructor() {
    }

    calculateUnitPointsCost(unit: any): number {
        let cost = 0;

        if (unit.wargear) {
            unit.wargear.forEach((wargear: any) => {
                cost += wargear.selectedOption.cost;
            });
        }

        unit.models.forEach((model: any) => {
            cost += model.points;
            if (model.weaponOptions) {
                model.weaponOptions.forEach((item: any) => {
                    cost += item.selectedOption.cost;
                });
            }
        });

        return cost;
    }

    calculateWeaponsAggregation(unit: any, name: string): number {
        let amount = 0;

        unit.models.forEach((model: any) => {
            model.weaponOptions.forEach((weapon: any) => {
                if (weapon.selectedOption.name === name) {
                    amount++;
                }
            });
        });

        return amount;
    }

    calculateMultipleUnitsPointsCost(units: any): number {
        let cost = 0;

        units.forEach((unit: any) => {
            cost += this.calculateUnitPointsCost(unit);
        });

        return cost;
    }

    calculateArmyPointsCost(detachments: any): number {
        let cost = 0;

        detachments.forEach((detachment: any) => {
            cost += this.calculateMultipleUnitsPointsCost(detachment.units);
        });

        return cost;
    }
}
