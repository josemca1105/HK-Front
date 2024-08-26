import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptacionesPersonalEditComponent } from './captaciones-personal-edit.component';

describe('CaptacionesPersonalEditComponent', () => {
  let component: CaptacionesPersonalEditComponent;
  let fixture: ComponentFixture<CaptacionesPersonalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptacionesPersonalEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaptacionesPersonalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
