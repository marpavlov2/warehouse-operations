import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/orders/services/order.service';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteOrderDialogComponent } from '../../dialogs/delete-order-dialog/delete-order-dialog.component';
import { Order } from '../../interfaces/order.query';
import { Product } from '../../interfaces/product.query';

@Component({
  selector: 'app-view-edit-order',
  templateUrl: './view-edit-order.component.html',
  styleUrls: ['./view-edit-order.component.scss'],
})
export class ViewEditOrderComponent implements OnInit {
  productsList: Product[] = [];
  order: Order;

  deleteOrderDialogRef: MatDialogRef<DeleteOrderDialogComponent> | null;

  private _orderFormGroup: FormGroup;

  get orderFormGroup(): FormGroup {
    return this._orderFormGroup;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _orderService: OrderService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private _matDialog: MatDialog,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._orderFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      client: ['', Validators.required],
      price: ['', Validators.required],
      products: new FormControl([]),
      status: ['', Validators.required],
    });

    this._activatedRoute.data.subscribe(({ productsList, orderData }) => {
      this.order = orderData;

      this.productsList = productsList.map((product: Product) => {
        product.isSelected = this.order.products.some(
          (orderProduct) => orderProduct.id === product.id
        );
        return product;
      });

      this.orderFormGroup.patchValue(this.order);

      if (this.order.status === 'closed') {
        this.orderFormGroup.disable();
      }

      this._cdr.detectChanges();
    });
  }

  async onSubmit(): Promise<void> {
    const order: Order = this.orderFormGroup.value;
    const orderCreated = await this._orderService.updateOrder(
      this.order.orderId,
      order
    );

    if (orderCreated) {
      this._router.navigate(['/orders']);
    }
  }

  openDeleteOrderDialog(): void {
    this.deleteOrderDialogRef = this._matDialog.open(
      DeleteOrderDialogComponent,
      {
        disableClose: false,
        width: '480px',
        data: this.order.orderId,
      }
    );

    this.deleteOrderDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteOrder(this.order.orderId);
      }

      this.deleteOrderDialogRef = null;
    });
  }

  async deleteOrder(orderId: string): Promise<void> {
    const orderRemoved = await this._orderService.deleteOrder(orderId);
    if (orderRemoved) {
      this._router.navigate(['/orders']);
    }
  }

  goBack() {
    this._location.back();
  }
}
