import { Component, OnInit } from '@angular/core';
import { Appointment, AppointmentService } from '@hospital/libs/services';

@Component({
    selector: 'hospital-tabletime',
    templateUrl: './tabletime.component.html'
})
export class TabletimeComponent implements OnInit {
    currentDate: Date = new Date();
    currentWeek?: Date | null;
    selectedDate: Date | null = null; // Add selectedDate property
    appointments: Appointment[] = [];

    constructor(private appointmentService: AppointmentService) {}

    ngOnInit(): void {
        this.loadAppointments();
    }

    loadAppointments(): void {
        this.appointmentService.getAppointment().subscribe((appointments) => {
            this.appointments = appointments;
        });
    }
    onDateSelect(event: any): void {
        this.selectedDate = event;
        this.currentWeek = event;
    }

    goToToday(): void {
        this.currentDate = new Date();
        this.currentWeek = new Date();
    }

    previousWeek(): void {
        this.currentWeek = new Date((this.currentWeek || this.selectedDate || this.currentDate).getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    nextWeek(): void {
        this.currentWeek = new Date((this.currentWeek || this.selectedDate || this.currentDate).getTime() + 7 * 24 * 60 * 60 * 1000);
    }
    getWeekDays(): Date[] {
        const today = new Date(this.currentWeek || this.selectedDate || this.currentDate);
        const firstDayOfWeek = today.getDate() - today.getDay();
        const startOfWeek = new Date(today.setDate(firstDayOfWeek));

        const weekDays = [];

        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            weekDays.push(day);
        }

        return weekDays;
    }

    getAppointmentsForDayAndTimeSlot(day: Date, timeSlot: string): Appointment[] {
        const filteredAppointments = this.appointments.filter(
            (appointment) => appointment.date && new Date(appointment.date).toDateString() === day.toDateString() && appointment.timeSlot === timeSlot
        );

        return filteredAppointments;
    }
    generateRandomColor(): string {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 8; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}
