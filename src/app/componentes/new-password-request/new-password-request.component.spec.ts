import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordRequestComponent } from './new-password-request.component';

describe('NewPasswordRequestComponent', () => {
  let component: NewPasswordRequestComponent;
  let fixture: ComponentFixture<NewPasswordRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPasswordRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPasswordRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
