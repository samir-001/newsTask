import {AfterViewInit, Component, ViewChild,Input, OnChanges, SimpleChanges, OnInit, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { News } from 'src/app/core/modals/news';
import { LangugeService } from '../../services/languge.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,CommonModule,MatButtonModule,TranslateModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit,OnChanges,AfterViewInit  {
  dataSource!: MatTableDataSource<any>;
  displayedColumns!: string[]
  @Input() data!:any
  @Input() tableColumes!:string[]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Output() edit = new EventEmitter()
  @Output() delete = new EventEmitter()
  constructor(public language:LangugeService,private translate:TranslateService) {

  }
  ngOnInit(): void {
    
    // setting data
    this.dataSource = new MatTableDataSource(this.data); 

    //addign action to row 
    this.displayedColumns =[...this.tableColumes,'action']

    // setting paginator and soring
    this.dataSource.sort = this.sort;
  }
  
  ngAfterViewInit(): void {
    //adding paginator and sprting to data source
      this.dataSource.paginator =  this.paginator
      this.dataSource.sort = this.sort;

  }
  ngOnChanges(changes: SimpleChanges): void 
  {
    //updata dataset on change
    if(!changes?.['data'].firstChange)
    {
      this.dataSource.data = changes?.['data'].currentValue   
    }
  }

  editItem(news:News){
    this.edit.emit(news)
  }

  deleteItem(id:number){
    this.delete.emit(id)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}




