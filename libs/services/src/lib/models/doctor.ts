import { Appointment } from './appointment';

export class Doctor {
    id?: string;
    name?: string;
    image?: string;
    specialist?: string;
    appointments?: Appointment[];
}
