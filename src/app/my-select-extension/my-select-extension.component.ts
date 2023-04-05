import { ViewChild, Component, OnInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { mockData } from '../mock-data';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'my-select-extension',
  templateUrl: './my-select-extension.component.html',
  styleUrls: ['./my-select-extension.component.css']
})
export class MySelectExtensionComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective = {} as DataTableDirective;

  mockData = mockData;
  dt2ndOptions: any = {};

  ngOnInit(): void {
    this.dt2ndOptions = {
      select: 'os'
    }
  }

  ngAfterViewInit(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.on('user-select', (e, dt, type, cell, originalEvent) => {
          let rowData = (dtInstance.row(cell.node()).data() as any[])[3];
          if (rowData === 'false') {
            e.preventDefault();
          }
        });
      });
    }
}