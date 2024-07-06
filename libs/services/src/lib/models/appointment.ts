import { Doctor } from './doctor';
import { Patient } from './patient';

export class Appointment {
    id?: string;
    patient?: Patient;
    doctor?: Doctor;
    type?: string;
    date?: string;
    time?: string;
    timeSlot?: string;
    // appointment description
    app_desc?: string;
    created_date?: string;
}
