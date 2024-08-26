import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptacionesComponent } from './captaciones.component';

describe('CaptacionesComponent', () => {
  let component: CaptacionesComponent;
  let fixture: ComponentFixture<CaptacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaptacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
