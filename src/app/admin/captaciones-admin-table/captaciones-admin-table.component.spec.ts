import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptacionesAdminTableComponent } from './captaciones-admin-table.component';

describe('CaptacionesAdminTableComponent', () => {
  let component: CaptacionesAdminTableComponent;
  let fixture: ComponentFixture<CaptacionesAdminTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptacionesAdminTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaptacionesAdminTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
