import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreServiceService } from './core/core-service.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dob', 'gender', 'education', 'company', 'experience', 'package','action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(private dialog: MatDialog,
    private _empSevice: EmployeeService,
    private _coreService: CoreServiceService
    ) { }
  ngOnInit() {
    this.getEmployeeList();
  }
  openAddEditForm() {
   const dialogRef =  this.dialog.open(EmpAddEditComponent)
  dialogRef.afterClosed().subscribe({
    next: (val) => {
      if(val) {
        this.getEmployeeList();
      }
    }
  })
  }

  getEmployeeList() {
    this._empSevice.getEmployee().subscribe({
      next: (res: any) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error(err);
      }
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this._empSevice.deleteEmployee(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee deleted !','done');
        this.getEmployeeList();
      },
      error: console.log
    })
  }

  openEditForm(object: any) {
   const dialogRef = this.dialog.open(EmpAddEditComponent,{
      data: object
    });
     dialogRef.afterClosed().subscribe({
    next: (val) => {
      if(val) {
        this.getEmployeeList();
      }
    }
  })
  }

}

