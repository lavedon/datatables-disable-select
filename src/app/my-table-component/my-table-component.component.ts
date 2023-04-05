
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
    }
    $(function () {
    let isDragging = false;
    let mouseDown = false;

    $('#myTable').on('mousedown', 'tbody tr', function (this: HTMLElement) {
      mouseDown = true;
      if ($(this).hasClass('selectable') && !$(this).attr('data-processed')) {
        toggleRowSelect($(this));
        $(this).attr('data-processed', 'true');
      }
    });

    $('#myTable').on('mousemove', 'tbody tr', function (this: HTMLElement) {
      if (mouseDown && !isDragging) {
        isDragging = true;
      }
      if (isDragging && $(this).hasClass('selectable') && !$(this).attr('data-processed')) {
        toggleRowSelect($(this));
        $(this).attr('data-processed', 'true');
      }
    });

    $('body').on('mouseup', function (this: HTMLElement) {
      isDragging = false;
      mouseDown = false;
      $('tr[data-processed="true"]').removeAttr('data-processed');
    });

    function toggleRowSelect(row: any) {
      if (row.hasClass('row-select')) {
        row.removeClass('row-select');
      } else {
        row.addClass('row-select');
      }
    }
  });

  }
}