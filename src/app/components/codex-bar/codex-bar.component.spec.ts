import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodexBarComponent } from './codex-bar.component';

describe('CodexBarComponent', () => {
  let component: CodexBarComponent;
  let fixture: ComponentFixture<CodexBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodexBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodexBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
