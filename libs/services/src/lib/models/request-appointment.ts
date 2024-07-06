import { Doctor } from './doctor';
export class RequestAppointment {
    id?: string;
    name?: string;
    doctor?: Doctor;
    email?: string;
    phone?: number;
    dob?: string;
    gender?: string;
    time?: string;
    date?: string;
    timeSlot?: string;
    address?: string;
    createdAt?: string;
}
