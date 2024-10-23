import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptacionViewComponent } from './captacion-view.component';

describe('CaptacionViewComponent', () => {
  let component: CaptacionViewComponent;
  let fixture: ComponentFixture<CaptacionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptacionViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaptacionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
