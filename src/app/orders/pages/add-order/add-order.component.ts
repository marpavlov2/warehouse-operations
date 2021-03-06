import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/orders/services/order.service';
import { Location } from '@angular/common';
import { OrderStatus } from '../../enums/order-status.enum';
import { Order } from '../../interfaces/order.query';
import { Product } from '../../interfaces/product.query';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
})
export class AddOrderComponent implements OnInit {
  productsList: Product[];

  private _orderFormGroup: FormGroup;

  get orderFormGroup(): FormGroup {
    return this._orderFormGroup;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _orderService: OrderService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this._activatedRoute.data.subscribe(({ productsList }) => {
      this.productsList = productsList;
    });

    this._orderFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      client: ['', Validators.required],
      price: ['', Validators.required],
      products: new FormControl([]),
    });
  }

  async onCreateNewOrder(): Promise<void> {
    let order: Order = this.orderFormGroup.value;
    order.status = OrderStatus.OPENED;
    order.date = new Date().toISOString();

    const createdOrder = await this._orderService.createOrder(order);
    if (createdOrder) {
      this._router.navigate([`orders/${createdOrder.orderId}`]);
    }
  }

  goBack(): void {
    this._location.back();
  }
}
