import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { mockData } from '../mock-data';

@Component({
  selector: 'my-select-extension',
  templateUrl: './my-select-extension.component.html',
  styleUrls: ['./my-select-extension.component.css']
})
export class MySelectExtensionComponent implements OnInit {

  mockData = mockData;
  dt2ndOptions: any = {};

  ngOnInit(): void {
    this.dt2ndOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [5, 3],
      processing: true,
      select: true
    };
  }
}