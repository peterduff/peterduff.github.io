import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {CodexService} from "../../services/codex.service";
import {Subscription} from "rxjs";
import {ArmyService} from "../../services/army.service";
import {Army, Config, Detachment, SubFaction} from "../../models/army";
import {DomSanitizer} from "@angular/platform-browser";
import {Guid} from "guid-typescript";
import {Core} from "../../models/core";
import {Codex} from "../../models/codex";

@Component({
    selector: 'app-utility-bar',
    templateUrl: './utility-bar.component.html',
    styleUrls: ['./utility-bar.component.scss']
})
export class UtilityBarComponent implements OnInit {

    core!: Core;
    coreSubscription: Subscription;
    codexes!: Codex[];
    codexesSubscription: Subscription;
    army!: Army;
    armySubscription: Subscription;

    newArmy!: Army;
    downloadJsonHref!: any;

    defaultNameList = [
        'The Aggressive Aardvarks',
        'The Brutish Belligerents',
        'The Crazy Cadavers',
        'The Dangerous Divas',
        'The Esoteric Evangelists',
        'The Ferocious Flames',
        'The Great Goons',
        'The Haunted Heroes',
        'The Idolent Iscariots',
        'The Jeering Jokers',
        'The Kleptomaniac Kings',
        'The Lecherous Lemurs',
        'The Mindful Mindflayers',
        'The Nautious Nurses',
        'The Obsolete Obelisks',
        'The Pestilent Plague',
        'The Querky Quarks',
        'The Radiant Redeemers',
        'The Silent Slayers',
        'The Titanic Tossers',
        'The Ubiquitous Undertakers',
        'The Vexatious Violators',
        'The Wandering Warriors',
        'The Xenogenic Xenocrysts',
        'The Yeetful Yoloers',
        'The Zionistic Zebras'];


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
        // Change this to default load specific army for testing
        this.newArmy.detachments.push(
            new Detachment(
                Guid.raw(),
                new Config(this.core.armies[1].name, this.core.armies[1].superFaction, new SubFaction(''), this.core.armies[1].fileName),
                this.core.detachments[0],
                []));
        this.armyService.calculateArmyCP();
    }

    removeDetachment(index: number): void {
        this.newArmy.detachments.splice(index,  1);
        this.armyService.calculateArmyCP();
    }

    createArmy(): void {

        if (this.newArmy.name === '') {
            this.newArmy.name = this.defaultNameList[Math.floor(Math.random() * this.defaultNameList.length)];
        }
        this.armyService.setArmy(this.newArmy);
        this.findCodexes();
        this.resetNewArmy();
    }

    findCodexes(): void {
        this.army.detachments.forEach((detachment: Detachment) => {
            this.codexService.httpGetCodex(detachment.config.fileName).subscribe(data => {
                this.codexes.push(data);
                this.codexService.setCodexes(this.codexes);
            });
        });
    }

    resetNewArmy(): void {
        this.newArmy = new Army('',0, this.core.battleSize[1].commandPoints, this.core.battleSize[1], []);
        this.addDetachment();
    }

    compare(item1: any, item2: any) {
        return item1 && item2 ? item1.name === item2.name : item1 === item2;
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
