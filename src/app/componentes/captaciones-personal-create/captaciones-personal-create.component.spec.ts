import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptacionesPersonalCreateComponent } from './captaciones-personal-create.component';

describe('CaptacionesPersonalCreateComponent', () => {
  let component: CaptacionesPersonalCreateComponent;
  let fixture: ComponentFixture<CaptacionesPersonalCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptacionesPersonalCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaptacionesPersonalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
