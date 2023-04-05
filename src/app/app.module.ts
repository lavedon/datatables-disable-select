import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import { MyTableComponentComponent } from './my-table-component/my-table-component.component';
import { MySelectExtensionComponent } from './my-select-extension/my-select-extension.component';
import { AngularSelectComponent } from './angular-select/angular-select.component';

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
