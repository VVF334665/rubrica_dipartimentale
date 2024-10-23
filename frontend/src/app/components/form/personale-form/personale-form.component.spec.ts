import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaleFormComponent } from './personale-form.component';

describe('PersonaleFormComponent', () => {
  let component: PersonaleFormComponent;
  let fixture: ComponentFixture<PersonaleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonaleFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonaleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
