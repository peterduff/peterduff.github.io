import {Injectable} from '@angular/core';
import {Observable, Subject, Subscription} from "rxjs";
import {Army, Detachment} from "../models/army";
import {CalculationService} from "./calculation.service";
import {Unit} from "../models/unit";

@Injectable({
    providedIn: 'root'
})
export class ArmyService {

    private army = new Subject<Army>();
    private activeUnit = new Subject<Unit | undefined>();

    localArmy: Army | undefined;
    armySubscription: Subscription;

    constructor(private calculationService: CalculationService) {
        this.armySubscription = this.getArmy().subscribe( (data: Army) => this.localArmy = data);
    }

    setArmy(army: Army): void {
        this.army.next(army);
        this.calculateArmyPoints();
        this.calculateArmyCP();
    }

    getArmy(): Observable<Army> {
        return this.army.asObservable();
    }

    setActiveUnit(unit: Unit | undefined): void {
        this.activeUnit.next(unit);
    }

    getActiveUnit(): Observable<Unit | undefined> {
        return this.activeUnit.asObservable();
    }

    // TODO: This needs to be moved to a CalculationService
    // TODO: Not setting total points to armyService, should be
    calculateArmyPoints() {
        if (this.localArmy) {
            this.localArmy.totalPoints = 0;
            this.localArmy.detachments.forEach((detachment: Detachment) => {
                detachment.units.forEach((unit: Unit) => {
                    if (this.localArmy) {
                        this.localArmy.totalPoints += this.calculationService.calculateUnitPointsCost(unit);
                    }
                });
            });
        }
    }

    // TODO: This needs to be moved to a CalculationService
    // TODO: Not setting total points to armyService, should be
    calculateArmyCP() {
        if (this.localArmy) {
            let totalCost = 0;
            this.localArmy.detachments.forEach((detachment: Detachment) => totalCost += detachment.detachmentType.cost);
            this.localArmy.totalCP = this.localArmy.battleSize.commandPoints - totalCost;
        }
    }
}
