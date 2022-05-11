import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {UtilityBarComponent} from './components/utility-bar/utility-bar.component';
import {UnitViewComponent} from './components/unit-view/unit-view.component';
import {LeftBarComponent} from './components/left-bar/left-bar.component';
import {RightBarComponent} from './components/right-bar/right-bar.component';
import {TextFilterPipe} from './pipes/text-filter.pipe';
import {ModalComponent} from './components/modal/modal.component';
import {ArmyService} from "./services/army.service";
import {CodexService} from "./services/codex.service";
import {ModalService} from "./services/modal.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { AlphabeticalPipe } from './pipes/alphabetical.pipe';
import { UnitTypePipe } from './pipes/unit-type.pipe';
import {CalculationService} from "./services/calculation.service";
import {CodexViewComponent} from "./components/codex-view/codex-view.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        UtilityBarComponent,
        UnitViewComponent,
        CodexViewComponent,
        LeftBarComponent,
        RightBarComponent,
        ModalComponent,
        TextFilterPipe,
        AlphabeticalPipe,
        UnitTypePipe
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        NgbModule
    ],
    providers: [
        ArmyService,
        CodexService,
        ModalService,
        CalculationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
