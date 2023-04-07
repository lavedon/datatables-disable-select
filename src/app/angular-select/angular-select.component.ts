import 'datatables.net'
import { ElementRef, ViewChild, Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { mockData } from '../mock-data';
import { DataTableDirective } from 'angular-datatables';
import { IMockData } from '../models/i-mock-data';

@Component({
  selector: 'angular-select',
  templateUrl: './angular-select.component.html',
  styleUrls: ['./angular-select.component.css']
})
export class AngularSelectComponent implements OnInit {
  @ViewChild('myDataTable', { static: false })
  datatableElement: ElementRef = {} as ElementRef;
  selectedRows: Set<IMockData> = new Set();
  toggledRows: Set<number> = new Set();
  tableOffset = { x: 0, y: 0};
  mousedownTimeout!: ReturnType<typeof setTimeout>;
  selectDeselect: 'select' | 'deselect' = 'select';

  get selectedRowsText(): string {
    return Array.from(this.selectedRows)
      .map(row => `${row.name}, ${row.age}, ${row.job}, ${row.employed}`)
      .join('\n');
  }
  isMouseDown = false;
  lastSelectedIndex = -1;

  mockData = mockData;
  dt3rdOptions: any = {};

  /* Needed for RTS style select box */
  selectBoxStyle: any = {};
  startX!: number;
  startY!: number;

  @HostListener('mousedown', ['$event'])
  onGlobalMouseDown(event: MouseEvent): void {
    clearTimeout(this.mousedownTimeout);
    if ((event.target as HTMLElement).classList.contains('mat-icon')) {
      return;
    }

    // Make sure the user did not try to start a drag on a nonSelectable row
    // Step 1: Find the row element
    let rowElement: HTMLElement | null = event.target as HTMLElement;
    while (rowElement && !rowElement.hasAttribute('data-row-index')) {
      rowElement = rowElement.parentElement;
    }

    // Check if the row has canSelect set to false
    // If not, we can start drawing the select box.
    if (rowElement) {
      const rowIndex = parseInt(rowElement.getAttribute('data-row-index') || '', 10);
      if (rowIndex >= 0 && rowIndex < this.mockData.length && !this.mockData[rowIndex].isSelectable) {
        return;
      }
    }

    this.startX = event.clientX - this.tableOffset.x;
    this.startY = event.clientY - this.tableOffset.y;
    this.mousedownTimeout = setTimeout(() => {
      this.isMouseDown = true;

      this.selectBoxStyle = {
        left: `${this.startX}px`,
        top: `${this.startY}px`,
        width: '0px',
        height: '0px',
        display: 'block'
      };
    },200);
  }

  @HostListener('mousemove', ['$event'])
  onGlobalMouseMove(event: MouseEvent): void {
    if (!this.isMouseDown) return;

    const currentX = event.clientX - this.tableOffset.x;
    const currentY = event.clientY - this.tableOffset.y;

    this.selectBoxStyle = {
      left: `${Math.min(currentX, this.startX)}px`,
      top: `${Math.min(currentY, this.startY)}px`,
      width: `${Math.abs(currentX - this.startX)}px`,
      height: `${Math.abs(currentY - this.startY)}px`,
      display: 'block'
    };
  }

  @HostListener('mouseup')
  onGlobalMouseUp(): void {
    clearTimeout(this.mousedownTimeout);
    this.isMouseDown = false;
    this.selectBoxStyle.display = 'none';
    this.calculateTableOffset();
  }

  ngOnInit(): void {
    this.dt3rdOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [6, 3],
      processing: true
    }
  }

    onMouseDown(index: number, event: MouseEvent): void {
      if ((event.target as HTMLElement).classList.contains('mat-icon')) {
        return;
      }

      console.log('onMouseDown');
      console.assert(index >= 0 && index < this.mockData.length, 'index out of range');

      if (!this.mockData[index].isSelectable) {
        return;
      }

      this.isMouseDown = true;
      this.toggledRows.clear();
      this.setSelectDeselectMode(index);
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
      if (this.selectDeselect === 'deselect' && this.selectedRows.has(selectedRow)) {
      this.selectedRows.delete(selectedRow);
      } else if (this.selectDeselect === 'select' && !this.selectedRows.has(selectedRow)) {
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

      this.calculateTableOffset();
    }

    ngAfterViewInit(): void {
      this.calculateTableOffset();
    }

    calculateTableOffset(): void {
      const tableElement = this.datatableElement.nativeElement.querySelector('table');
      const tableRect = tableElement.getBoundingClientRect();
      this.tableOffset = { x: tableRect.left, y: tableRect.top };
    }

    setSelectDeselectMode(index: number): void {
    if (this.mockData[index].isSelectable) {
      this.selectDeselect = this.selectedRows.has(this.mockData[index]) ? 'deselect' : 'select';
    }
  }
}