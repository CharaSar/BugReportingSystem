import { Component, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { BugService } from '../bug.service';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Bug } from '../../models/bug-model';
import { Router } from '@angular/router';
import { PageParameters } from '../../models/pageParameters';
import { HttpResponse } from '@angular/common/http';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog.component';
import { filter } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { FilterParameters } from 'src/app/models/filterParams';


@Component({
  selector: 'brs-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.scss']
})

export class BugListComponent implements OnInit {

  displayedColumns: string[] = ['position','title', 'priority', 'reporter', 'createdAt', 'status','actions'];
  dataSource = new MatTableDataSource<Bug>();
  pageIndex:number;
  pageSize:number;
  length:number;
  filterForm :FormGroup;
  
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private bugService:BugService,private router: Router,public dialog: MatDialog) {
    this.filterForm = new FormGroup({
      title: new FormControl(),
      priority: new FormControl(),
      reporter: new FormControl(),
      status: new FormControl(),
    });
   }
  
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data:Bug, filter:string)=>{
      return data.title === filter;
    }
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(()=>{
      this.paginator.pageIndex=0;
    })
    // this.getPageableBugs();
    this.filteredSubmit();
  }

  addNew(){
    this.router.navigate(['/create']);
  }

  edit(id){
    this.router.navigate(['/edit',id]);
  }

  getPageableBugs(){
    const pageParameters: PageParameters={
      page:this.paginator.pageIndex,
      size:this.paginator.pageSize,
      sort: this.sort.active+","+this.sort.direction
    }
    
    this.bugService.getPageableBugs(pageParameters).subscribe((data: HttpResponse<Bug[]>)=>{
      this.dataSource = new MatTableDataSource(data.body);
      this.length = parseInt(data.headers.get('Totalrecords'));
      this.pageSize = this.paginator.pageSize;
      this.pageIndex = this.paginator.pageIndex;
    })
  }

  deleteBug(id){
    this.bugService.deleteBug(id).subscribe(data=>{
      this.dialog.open(DeleteDialogComponent).afterClosed().subscribe(()=>{this.getPageableBugs()});
    });
  }

  setUpFilter(tableColumn:string){
    this.dataSource.filterPredicate = ( bug:Bug, filter:string) =>{
      const searchingText = bug[tableColumn] &&  bug[tableColumn].toLowerCase() || '' ;
      return searchingText.indexOf(filter) !== -1;
    }
  }

  applyFilter(value:string){
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  filteredSubmit(){
    const filters: FilterParameters={
      title: this.filterForm.get('title').value || '',
      priority: this.filterForm.get('priority').value || '',
      reporter: this.filterForm.get('reporter').value || '',
      status: this.filterForm.get('status').value || ''
    }
    
    this.bugService.filteredBugs(filters).subscribe((data: HttpResponse<Bug[]>)=>{
      this.dataSource = new MatTableDataSource(data.body);
      this.length = parseInt(data.headers.get('Totalrecords'));
      this.pageSize = this.paginator.pageSize;
      this.pageIndex = this.paginator.pageIndex;
    })
  }

}
