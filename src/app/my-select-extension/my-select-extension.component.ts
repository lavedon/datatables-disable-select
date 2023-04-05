
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
  dtOptions: any = {};
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [6, 3],
      processing: true,
      select: true
    };
  }
}