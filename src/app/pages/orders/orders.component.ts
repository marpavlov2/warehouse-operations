import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/interfaces/order.model';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  searchInput = new FormControl('');

  dataSource: MatTableDataSource<any>;
  displayedColumns = ['name', 'client', 'status', 'buttons'];
  order = {
    name: 'Jabuke',
    client: 'Mario Pavlovic',
    status: 'opened',
    date: new Date(),
    price: 65,
  };

  constructor(
    private _orderService: OrderService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._orderService.createOrder(this.order);
    this.dataSource = this._route.snapshot.data['isFetched'];
    console.log(this.order);
  }
}
