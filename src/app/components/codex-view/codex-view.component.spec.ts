import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CodexViewComponent} from './codex-view.component';

describe('UnitViewComponent', () => {
    let component: CodexViewComponent;
    let fixture: ComponentFixture<CodexViewComponent>;
    let unit = {
        "id": 2,
        "name": "Thousand Sons Daemon Prince",
        "role": "HQ",
        "power": 8,
        "statistics": [
            {
                "numberMin": 1,
                "numberMax": 1,
                "name": "Thousand Sons Daemon Prince",
                "movement": 8,
                "weaponSkill": 2,
                "ballisticSkill": 2,
                "strength": 7,
                "toughness": 6,
                "wounds": 8,
                "attacks": 5,
                "leadership": 10,
                "save": 3
            }
        ],
        "description": "A Thousand Sons Daemon Prince is equipped with: hellforged sword, malefic talons",
        "weapons": [
            44,
            56,
            59
        ],
        "otherWargear": [
            {
                "name": "Wings",
                "rule": "The bearer has a Move characteristic of 12\" and the FLY keyword"
            }
        ],
        "wargearOptions": [
            "This models hellforged sword can be replaced with one of the following: 1 daemonic axe, 1 malefic talons",
            "This model can be equipped with wings (Power Rating +2)"
        ],
        "abilities": [
            {
                "name": "Cabalistic Rituals",
                "rule": "(pg 71)"
            },
            {
                "name": "Chosen of Tzeentch",
                "rule": "This model has a 4+ invulnerable save"
            }
        ],
        "psyker": "This model can attempt to manifest two psychic powers...",
        "factionKeywords": [
            "CHAOS",
            "TZEENTCH",
            "HERETIC ASTARTES",
            "ARCANA ASTARTES",
            "THOUSAND SONS",
            "<GREAT CULT>"
        ],
        "keywords": [
            "CHARACTER",
            "MONSTER",
            "DAEMON",
            "PSYKER",
            "DAEMON PRINCE"
        ],
        "models": [
            {
                "name": "Thousand Sons Daemon Prince",
                "points": 140,
                "weaponOptions": [
                    {
                        "options": [
                            {
                                "name": "Hellforged Sword",
                                "cost": 10
                            },
                            {
                                "name": "Daemonic Axe",
                                "cost": 10
                            },
                            {
                                "name": "Malefic Talon",
                                "cost": 0
                            }
                        ]
                    },
                    {
                        "options": [
                            {
                                "name": "No Wings",
                                "cost": 0
                            },
                            {
                                "name": "Wings",
                                "cost": 35,
                                "power": 2
                            }
                        ]
                    }
                ]
            }
        ]
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CodexViewComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CodexViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should calculate correct points', () => {
        expect(component.calculatePoints(unit)).toBe(150)
    });
});
