import 'datatables.net'
import { ViewChild, Component, OnInit, AfterViewInit } from '@angular/core';
import { mockData } from '../mock-data';
import { DataTableDirective } from 'angular-datatables';
import { IMockData } from '../models/i-mock-data';

@Component({
  selector: 'angular-select',
  templateUrl: './angular-select.component.html',
  styleUrls: ['./angular-select.component.css']
})
export class AngularSelectComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective = {} as DataTableDirective;
  selectedRows: Set<IMockData> = new Set();
  toggledRows: Set<number> = new Set();

  get selectedRowsText(): string {
    return Array.from(this.selectedRows)
      .map(row => `${row.name}, ${row.age}, ${row.job}, ${row.employed}`)
      .join('\n');
  }
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
      this.toggledRows.clear();
      this.toggleRowSelection(index);
    }

    onMouseMove(index: number): void {
      if (this.isMouseDown && !this.toggledRows.has(index)) {
        this.toggleRowSelection(index);
      }
    }

    onMouseUp(index: number): void {
      this.isMouseDown = false;
      this.toggledRows.clear();
    }

    toggleRowSelection(index: number): void {
      if (!this.mockData[index].isSelectable) {
        return;
      }
      const selectedRow = this.mockData[index];
      if (this.selectedRows.has(selectedRow)) {
        this.selectedRows.delete(selectedRow);
      } else {
        this.selectedRows.add(selectedRow);
        console.log('added a selected row');
        console.table(this.selectedRows);
      }
      this.toggledRows.add(index);
      this.lastSelectedIndex = index;
    }

    isSelected(index: number): boolean {
      return this.selectedRows.has(this.mockData[index]);
    }

    deleteQuestion(questionIndex: number, event: MouseEvent): void {
      event.stopPropagation();
      this.mockData[questionIndex].softDelete = true;
      let selectedRow: IMockData = this.mockData[questionIndex];
      if (this.selectedRows.has(selectedRow)) {
        this.selectedRows.delete(selectedRow);
      }
      this.mockData.splice(questionIndex, 1);
    }
}