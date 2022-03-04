import {Injectable} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {Detachment} from "../models/army";
import {CalculationService} from "./calculation.service";

@Injectable({
    providedIn: 'root'
})
export class ArmyService {

    private army = new Subject();
    private activeUnit = new Subject();
    private detachmentIndex = new Subject();

    localArmy: any;
    armySubscription: Subscription;

    constructor(private calculationService: CalculationService) {
        this.armySubscription = this.getArmy().subscribe( data => this.localArmy = data);
    }

    setArmy(army: any) {
        this.army.next(army);
        this.calculateArmyPoints();
        this.calculateArmyCP();
    }

    getArmy() {
        return this.army.asObservable();
    }

    setActiveUnit(unit: any) {
        this.activeUnit.next(unit);
    }

    getActiveUnit() {
        return this.activeUnit.asObservable();
    }

    setDetachmentIndex(index: any) {
        this.detachmentIndex.next(index);
    }

    getDetachmentIndex() {
        return this.detachmentIndex.asObservable();
    }

    calculateArmyPoints() {
        if (this.localArmy) {
            this.localArmy.totalPoints = 0;
            this.localArmy.detachments.forEach((detachment: any) => {
                detachment.units.forEach((unit: any) => {
                    this.localArmy.totalPoints += this.calculationService.calculateUnitPointsCost(unit);
                });
            });
        }
    }

    calculateArmyCP() {
        if (this.localArmy) {
            let totalCost = 0;
            this.localArmy.detachments.forEach((detachment: Detachment) => totalCost += detachment.detachmentType.cost);
            this.localArmy.totalCP = this.localArmy.battleSize.commandPoints - totalCost;
        }
    }
}
