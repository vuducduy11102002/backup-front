import { INavbarData } from './helper';

export const navbarData: INavbarData[] = [
  {
    routeLink: 'dashboard',
    icon: 'fi fi-rs-house-chimney',
    label: 'Dashboard',
    role: ['admin', 'user'],
  },
  {
    routeLink: 'patient',
    icon: 'fi fi-rr-procedures',
    label: 'Patient',
    role: 'user',
    items: [
      {
        routeLink: 'patient/list',
        label: 'List patient',
      },
      {
        routeLink: 'patient/create',
        label: 'Create patient',
      },
    ],
  },
  {
    routeLink: 'doctor',
    icon: 'fi fi-rr-user-md',
    label: 'Doctor',
    role: 'admin',
    items: [
      {
        routeLink: 'doctor/list',
        label: 'List doctor',
      },
      {
        routeLink: 'doctor/create',
        label: 'Create doctor',
      },
    ],
  },
  {
    routeLink: 'appointment',
    icon: 'fi fi-rr-calendar-clock',
    label: 'Appointment',
    role: ['admin', 'user'],
    items: [
      {
        routeLink: 'appointment/list',
        label: 'List appointment',
      },
      {
        routeLink: 'appointment/create',
        label: 'Create appointment',
      },
      {
        routeLink: 'appointment/calendar',
        label: 'Scheduler',
      },
      {
        routeLink: 'appointment/tabletime',
        label: 'Table Time',
      },
      {
        routeLink: 'appointment/requestappointment',
        label: 'Request Appointment',
      },
    ],
  },
  {
    routeLink: 'predict',
    icon: 'fi fi-rr-book-open-cover',
    label: 'Predict Disease',
    items: [
      {
        routeLink: 'predict/list-predict',
        label: 'List Predict',
      },
      {
        routeLink: 'predict/predict-file-csv',
        label: 'Predict File CSV',
      },
    ],
  },
];
