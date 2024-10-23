import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemButtonBarComponent } from './item-button-bar.component';

describe('ItemButtonBarComponent', () => {
  let component: ItemButtonBarComponent;
  let fixture: ComponentFixture<ItemButtonBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemButtonBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemButtonBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
