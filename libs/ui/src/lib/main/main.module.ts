import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { MainComponent } from './main.component';
import { OurServiceComponent } from './our-service/our-service.component';
import { OurBlogComponent } from './our-blog/our-blog.component';
import { ArticleComponent } from './article/article.component';
import { BookpointmentComponent } from './bookpointment/bookpointment.component';
import { CalendarComponent } from './bookpointment/calendar/calendar.component';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { AboutUsComponent } from './about-us/about-us.component';
import { RouterModule } from '@angular/router';
import { Routes } from '../ui.routes';

const UX_MODULE = [
  CalendarModule,
  ToastModule,
  InputTextModule,
  DropdownModule,
];
@NgModule({
  imports: [
    CommonModule,
    ...UX_MODULE,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(Routes),
  ],
  declarations: [
    BannerComponent,
    MainComponent,
    OurServiceComponent,
    OurBlogComponent,
    ArticleComponent,
    BookpointmentComponent,
    CalendarComponent,
    AboutUsComponent,
  ],
  exports: [
    BannerComponent,
    MainComponent,
    OurServiceComponent,
    OurBlogComponent,
    ArticleComponent,
  ],
})
export class MainModule {}
