import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/interfaces/order.model';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  searchInput = new FormControl('');

  dataSource = new MatTableDataSource<Order>();
  displayedColumns = ['orderId', 'name', 'client', 'status', 'date', 'buttons'];

  constructor(
    private _orderService: OrderService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.data.subscribe(({ ordersList }) => {
      this.dataSource.data = ordersList;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  async deleteOrder(orderId: string) {
    const orderRemoved = await this._orderService.deleteOrder(orderId);
    if (orderRemoved) {
      this.dataSource.data = this.dataSource.data.filter((order) => {
        return order.orderId !== orderId;
      });
    }
  }
}
