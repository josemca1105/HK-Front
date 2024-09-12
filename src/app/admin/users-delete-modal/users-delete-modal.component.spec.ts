import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDeleteModalComponent } from './users-delete-modal.component';

describe('UsersDeleteModalComponent', () => {
  let component: UsersDeleteModalComponent;
  let fixture: ComponentFixture<UsersDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersDeleteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
