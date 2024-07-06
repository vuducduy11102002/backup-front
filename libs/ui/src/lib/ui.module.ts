import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { MainModule } from './main/main.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Routes } from './ui.routes';
import { MessageService } from 'primeng/api';

@NgModule({
  imports: [
    CommonModule,
    MainModule,
    BrowserModule,
    RouterModule.forRoot(Routes),
  ],
  declarations: [HomePageComponent],
  exports: [HomePageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService],
})
export class UiModule {}
