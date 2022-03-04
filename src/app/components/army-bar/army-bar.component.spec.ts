import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ArmyBarComponent} from './army-bar.component';

describe('ArmyBarComponent', () => {
    let component: ArmyBarComponent;
    let fixture: ComponentFixture<ArmyBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ArmyBarComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ArmyBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
