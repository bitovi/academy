import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemsComponent } from './menu-items.component';

describe('MenuItemsComponent', () => {
  let component: MenuItemsComponent;
  let fixture: ComponentFixture<MenuItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of inputs', () => {
    const fixture = TestBed.createComponent(MenuItemsComponent);
    fixture.componentInstance.items = [
      {"name":"Charred Octopus","price":25.99},
      {"name":"Steamed Mussels","price":21.99},
      {"name":"Ricotta Gnocchi","price":15.99}
    ];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let itemLabels = compiled.getElementsByTagName('label');
    expect(itemLabels.length).toEqual(3)
  });
});
