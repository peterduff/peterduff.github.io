import {Component} from '@angular/core';
import {Subscription} from "rxjs";
import {ArmyService} from "./services/army.service";
import {Unit} from "./models/unit";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    activeUnit: Unit | undefined;
    activeUnitSubscription: Subscription;

    constructor(private armyService: ArmyService) {
        this.activeUnitSubscription = this.armyService.getActiveUnit().subscribe( (data: Unit | undefined) => this.activeUnit = data);
    }
}
