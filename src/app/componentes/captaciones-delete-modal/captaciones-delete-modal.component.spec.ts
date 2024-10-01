import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptacionesDeleteModalComponent } from './captaciones-delete-modal.component';

describe('CaptacionesDeleteModalComponent', () => {
  let component: CaptacionesDeleteModalComponent;
  let fixture: ComponentFixture<CaptacionesDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptacionesDeleteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaptacionesDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
