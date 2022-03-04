import {Component} from '@angular/core';
import {ArmyService} from "./services/army.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'army-reactor';

    activeUnit: any;
    activeUnitSubscription: Subscription;

    constructor(private armyService: ArmyService) {
        this.activeUnitSubscription = this.armyService.getActiveUnit().subscribe(data => this.activeUnit = data);
    }
}
