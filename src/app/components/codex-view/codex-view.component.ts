import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ArmyService} from "../../services/army.service";
import {CodexService} from "../../services/codex.service";
import {Guid} from "guid-typescript";
import {CalculationService} from "../../services/calculation.service";

@Component({
    selector: 'app-codex-view',
    templateUrl: './codex-view.component.html',
    styleUrls: ['./codex-view.component.scss']
})
export class CodexViewComponent implements OnInit {

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

    addUnit(detachment: any, unit: any) {
        let newUnit = this.cloneObject(unit);
        newUnit.uuid = Guid.raw();
        detachment.units.push(newUnit);
        this.armyService.setArmy(this.army);
    }

    calculatePoints(unit: any): number {
        return this.calculationService.calculateUnitPointsCost(unit);
    }

    weapon(codexName: string, id: number): any {
        return this.codexes.find((codex: any) => {
            return codex.name === codexName;
        }).armoury.find((weapon: any) => weapon.id === id);
    }

    cloneObject(object: any): any {
        return JSON.parse(JSON.stringify(object));
    }
}
