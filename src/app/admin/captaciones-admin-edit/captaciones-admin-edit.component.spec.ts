import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptacionesAdminEditComponent } from './captaciones-admin-edit.component';

describe('CaptacionesAdminEditComponent', () => {
  let component: CaptacionesAdminEditComponent;
  let fixture: ComponentFixture<CaptacionesAdminEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptacionesAdminEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaptacionesAdminEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
