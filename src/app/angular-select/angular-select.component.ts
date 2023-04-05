import 'datatables.net'
import { ViewChild, Component, OnInit, AfterViewInit } from '@angular/core';
import { mockData } from '../mock-data';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'angular-select',
  templateUrl: './angular-select.component.html',
  styleUrls: ['./angular-select.component.css']
})
export class AngularSelectComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective = {} as DataTableDirective;
  selectedRows: Set<number> = new Set();
  isMouseDown = false;
  lastSelectedIndex = -1;

  mockData = mockData;
  dt3rdOptions: any = {};

  ngOnInit(): void {
    this.dt3rdOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [6, 3],
      processing: true
    }
  }

    onMouseDown(index: number): void {
      console.log('onMouseDown');
      console.assert(index >= 0 && index < this.mockData.length, 'index out of range');
      this.isMouseDown = true;
      this.toggleRowSelection(index);
    }

    onMouseMove(index: number): void {
      if (this.isMouseDown && this.lastSelectedIndex !== index) {
        this.toggleRowSelection(index);
      }
    }

    onMouseUp(index: number): void {
      this.isMouseDown = false;
    }

    toggleRowSelection(index: number): void {
      if (!this.mockData[index].isSelectable) {
        return;
      }
      if (this.selectedRows.has(index)) {
        this.selectedRows.delete(index);
      } else {
        this.selectedRows.add(index);
        console.log('added a selected row');
        console.table(this.selectedRows);
      }
      this.lastSelectedIndex = index;
    }

    isSelected(index: number): boolean {
      return this.selectedRows.has(index);
    }
}