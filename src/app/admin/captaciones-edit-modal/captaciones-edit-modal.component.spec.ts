import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptacionesEditModalComponent } from './captaciones-edit-modal.component';

describe('CaptacionesEditModalComponent', () => {
  let component: CaptacionesEditModalComponent;
  let fixture: ComponentFixture<CaptacionesEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptacionesEditModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaptacionesEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
