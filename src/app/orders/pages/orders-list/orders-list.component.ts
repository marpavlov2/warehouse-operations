import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/orders/interfaces/order.model';
import { OrderService } from 'src/app/orders/services/order.service';
import { DeleteOrderDialogComponent } from '../../dialogs/delete-order-dialog/delete-order-dialog.component';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  deleteOrderDialogRef: MatDialogRef<DeleteOrderDialogComponent> | null;

  searchInput = new FormControl('');

  dataSource = new MatTableDataSource<Order>();
  displayedColumns = ['orderId', 'name', 'client', 'status', 'date', 'buttons'];

  constructor(
    private _orderService: OrderService,
    private _activatedRoute: ActivatedRoute,
    private _matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._activatedRoute.data.subscribe(({ ordersList }) => {
      this.dataSource.data = ordersList;
    });

    this.searchInput.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(async (searchTerm) => {
        this.applyFilter(searchTerm || '');
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    if (filterValue !== 'none') {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
      return;
    }
    this.dataSource.filter = '';
  }

  async deleteOrder(orderId: string) {
    const orderRemoved = await this._orderService.deleteOrder(orderId);
    if (orderRemoved) {
      this.dataSource.data = this.dataSource.data.filter((order) => {
        return order.orderId !== orderId;
      });
    }
  }

  openDeleteOrderDialog(orderId: string) {
    this.deleteOrderDialogRef = this._matDialog.open(
      DeleteOrderDialogComponent,
      {
        disableClose: false,
        width: '480px',
        data: orderId,
      }
    );

    this.deleteOrderDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteOrder(orderId);
      }

      this.deleteOrderDialogRef = null;
    });
  }
}
