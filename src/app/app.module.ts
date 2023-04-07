import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import { MyTableComponentComponent } from './my-table-component/my-table-component.component';
import { MySelectExtensionComponent } from './my-select-extension/my-select-extension.component';
import { AngularSelectComponent } from './angular-select/angular-select.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    MyTableComponentComponent,
    MySelectExtensionComponent,
    AngularSelectComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
