import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTableComponentComponent } from './my-table-component.component';

describe('MyTableComponentComponent', () => {
  let component: MyTableComponentComponent;
  let fixture: ComponentFixture<MyTableComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTableComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
