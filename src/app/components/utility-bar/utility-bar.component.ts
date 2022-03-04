import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {CodexService} from "../../services/codex.service";
import {Subscription} from "rxjs";
import {ArmyService} from "../../services/army.service";
import {Army, Detachment} from "../../models/army";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-utility-bar',
    templateUrl: './utility-bar.component.html',
    styleUrls: ['./utility-bar.component.scss']
})
export class UtilityBarComponent implements OnInit {
    core: any;
    coreSubscription: Subscription;
    codexes: any;
    codexesSubscription: Subscription;
    army: any;
    armySubscription: Subscription;

    newArmy: any;
    downloadJsonHref: any;

    constructor(private modalService: ModalService, private codexService: CodexService, public armyService: ArmyService, private sanitizer: DomSanitizer) {
        this.coreSubscription = this.codexService.getCore().subscribe( data => this.core = data);
        this.codexesSubscription = this.codexService.getCodexes().subscribe( data => this.codexes = data);
        this.armySubscription = this.armyService.getArmy().subscribe( data => this.army = data);
    }

    ngOnInit(): void {
        this.codexService.httpGetCore().subscribe(data => {
            this.codexService.setCore(data);
            this.resetNewArmy();

            // TEMPORARY FOR QUICK TESTING
            this.createArmy();
        });
    }

    openModal(id: string): void {
        this.modalService.open(id);
    }

    closeModal(id: string): void {
        this.modalService.close(id);
    }


    // NEW ARMY FUNCTIONS
    addDetachment(): void {
        this.newArmy.detachments.push(new Detachment(this.core.armies[0], this.core.detachments[0], []));
        this.armyService.calculateArmyCP();
    }

    removeDetachment(index: number): void {
        this.newArmy.detachments.splice(index,  1);
        this.armyService.calculateArmyCP();
    }

    createArmy(): void {
        this.armyService.setArmy(this.newArmy);
        this.findCodexes();
        this.resetNewArmy();
    }

    findCodexes(): void {
        this.army.detachments.forEach((detachment: Detachment) => {
            this.codexService.httpGetCodex(detachment.armyType.fileName).subscribe(data => {
                this.codexes.push(data);
                this.codexService.setCodexes(this.codexes);
            });
        });
    }

    resetNewArmy(): void {
        this.newArmy = new Army('The Brazen Badgers',0, this.core.battleSize[1].commandPoints, this.core.battleSize[1], []);
        this.addDetachment();
    }

    updateGameSize(points: number): void {
        if (points > 500 && points <= 1000) {
            this.newArmy.battleSize = this.core.battleSize[0];
        } else if (points > 1000 && points <= 2000) {
            this.newArmy.battleSize = this.core.battleSize[1];
        }
    }

    // OPEN ARMY FUNCTIONS
    openArmy(event: any): void {
        const file = event.target.files[0];
        const reader = new FileReader();
        let self = this;
        reader.onload = function(e) {
            self.armyService.setArmy(JSON.parse(<string>e.target?.result));
            self.findCodexes();
        };
        reader.readAsText(file);
    }

    // SAVE ARMY FUNCTIONS
    saveArmy(): void {
        var theJSON = JSON.stringify(this.army);
        var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
        this.downloadJsonHref = uri;
    }
}
