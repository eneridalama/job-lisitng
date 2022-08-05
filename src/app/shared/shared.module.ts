import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { SortPipe } from './pipes/sort.pipe';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { EditorModule } from 'primeng/editor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DividerModule } from 'primeng/divider';
import { WageCurrencyPipe } from './pipes/wage-currency.pipe';
import { GetNoApplicationsPipe } from './pipes/get-no-applications.pipe';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { FilterPipe } from './pipes/filter.pipe';

const primeng = [
  CardModule,
  ButtonModule,
  InputTextModule,
  DialogModule,
  ToastModule,
  SplitButtonModule,
  InputSwitchModule,
  ConfirmDialogModule,
  RadioButtonModule,
  AccordionModule,
  InputNumberModule,
  TooltipModule,
  EditorModule,
  MenubarModule,
  ToggleButtonModule,
  DividerModule,
  AutoCompleteModule,
  DropdownModule,
];

const comp = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  ReactiveFormsModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule,
  TableModule,
];

const pipes = [SortPipe, WageCurrencyPipe, GetNoApplicationsPipe, FilterPipe];

@NgModule({
  declarations: [LoadingSpinnerComponent, pipes],
  imports: [CommonModule, comp, primeng],
  exports: [CommonModule, LoadingSpinnerComponent, comp, primeng, pipes],
  providers: [SortPipe, ConfirmationService, MessageService],
})
export class SharedModule {}
