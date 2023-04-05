import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySelectExtensionComponent } from './my-select-extension.component';

describe('MySelectExtensionComponent', () => {
  let component: MySelectExtensionComponent;
  let fixture: ComponentFixture<MySelectExtensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySelectExtensionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySelectExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
