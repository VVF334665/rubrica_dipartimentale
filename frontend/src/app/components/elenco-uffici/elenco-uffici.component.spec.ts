import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElencoUfficiComponent } from './elenco-uffici.component';

describe('ElencoUfficiComponent', () => {
  let component: ElencoUfficiComponent;
  let fixture: ComponentFixture<ElencoUfficiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElencoUfficiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElencoUfficiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
