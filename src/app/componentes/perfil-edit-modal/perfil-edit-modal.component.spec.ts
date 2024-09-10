import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilEditModalComponent } from './perfil-edit-modal.component';

describe('PerfilEditModalComponent', () => {
  let component: PerfilEditModalComponent;
  let fixture: ComponentFixture<PerfilEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilEditModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
