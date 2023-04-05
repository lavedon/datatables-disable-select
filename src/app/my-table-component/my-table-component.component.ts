
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { mockData } from '../mock-data';

@Component({
  selector: 'app-my-table-component',
  templateUrl: './my-table-component.component.html',
  styleUrls: ['./my-table-component.component.css']
})
export class MyTableComponentComponent implements OnInit {

  mockData = mockData;
  dtOptions: any = {};
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [6, 3],
      processing: true
    };
    $('#myTable').on('click', 'tbody tr', function() {
      if ($(this).hasClass('selectable')) {
       if ($(this).hasClass('row-select')) {
          $(this).closest('tr').removeClass("row-select");
      } else {
        $(this).closest('tr').addClass('row-select');
      }
    }
  });
  }
}