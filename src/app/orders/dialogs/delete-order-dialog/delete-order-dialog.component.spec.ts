import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOrderDialogComponent } from './delete-order-dialog.component';

xdescribe('DeleteOrderDialogComponent', () => {
  let component: DeleteOrderDialogComponent;
  let fixture: ComponentFixture<DeleteOrderDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteOrderDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
