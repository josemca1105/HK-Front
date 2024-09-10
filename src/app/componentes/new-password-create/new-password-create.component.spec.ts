import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordCreateComponent } from './new-password-create.component';

describe('NewPasswordCreateComponent', () => {
  let component: NewPasswordCreateComponent;
  let fixture: ComponentFixture<NewPasswordCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPasswordCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPasswordCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
