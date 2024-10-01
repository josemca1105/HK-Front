import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptacionesPageComponent } from './captaciones-page.component';

describe('CaptacionesPageComponent', () => {
  let component: CaptacionesPageComponent;
  let fixture: ComponentFixture<CaptacionesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptacionesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaptacionesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
