import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { BodyComponent } from './body/body.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientComponent } from './pages/patient/patient.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SublevelMenuComponent } from './side-nav/sublevel-menu.component';
import { HeaderComponent } from './header/header.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { ListPatientComponent } from './pages/patient/list/list.component';
import { CreatePatientComponent } from './pages/patient/create/create.component';
import { CreateDoctorComponent } from './pages/doctor/create/create.component';
import { ListDoctorComponent } from './pages/doctor/list/list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAppointmentComponent } from './pages/appointment/create/create.component';
import { ListAppointmentComponent } from './pages/appointment/list/list.component';
import { AppointmentModule } from './pages/appointment/appointments.module';
import { ListAppointmentRequestComponent } from './pages/appointment/request-appointment/list.component';
import { JwtInterceptor, LibsUserModule } from '@hospital/user';
import { NotificationComponent } from './side-nav/notification.component';
import { ChartBarComponent } from './chart/chart-bar/bar.component';
import { ChartPieComponent } from './chart/chart-pie/pie.component';
import { ChartVerticalBarComponent } from './chart/vertical-bar/vertical.component';
import { ChartComboComponent } from './chart/chart-combo/combo.component';
import { UpcomingComponent } from './dashboard/upcoming-appointment/upcoming.component';
import { ChartMultiAxisComponent } from './chart/chart-multiaxis/multiaxis.component';
import { ChartRadarComponent } from './chart/chart-radar/radar.component';
import { PredictComponent } from './pages/predict/predict.component';
// Component PRIMENG
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { PatientService } from '@hospital/libs/services';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { ChartModule } from 'primeng/chart';
import { PredictModule } from './pages/predict/predict.module';

const UX_MODULE = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  SplitButtonModule,
  TableModule,
  InputTextModule,
  DropdownModule,
  ToastModule,
  RadioButtonModule,
  CalendarModule,
  ConfirmDialogModule,
  DialogModule,
  SidebarModule,
  ChartModule,
];

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SideNavComponent,
    DashboardComponent,
    PatientComponent,
    AppointmentComponent,
    DoctorComponent,
    SublevelMenuComponent,
    HeaderComponent,
    ListPatientComponent,
    CreatePatientComponent,
    ListDoctorComponent,
    CreateDoctorComponent,
    ListAppointmentComponent,
    CreateAppointmentComponent,
    ListAppointmentRequestComponent,
    NotificationComponent,
    ChartBarComponent,
    ChartPieComponent,
    ChartVerticalBarComponent,
    ChartComboComponent,
    UpcomingComponent,
    ChartMultiAxisComponent,
    ChartRadarComponent,
    PredictComponent,
  ],
  imports: [
    ...UX_MODULE,
    BrowserModule,
    BrowserAnimationsModule,
    OverlayModule,
    CdkMenuModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppointmentModule,
    PredictModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    //Login
    LibsUserModule,
  ],
  providers: [
    PatientService,
    MessageService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [
    BodyComponent,
    SideNavComponent,
    DashboardComponent,
    PatientComponent,
    AppointmentComponent,
    DoctorComponent,
    HeaderComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
