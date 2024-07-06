// import { Component, OnInit } from '@angular/core';
// import { Appointment, AppointmentService } from '@hospital/libs/services';

// @Component({
//     selector: 'hospital-list',
//     templateUrl: './calendar.component.html'
// })
// export class CalendarComponent implements OnInit {
//     daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     currentDate: Date = new Date();
//     appointments: Appointment[] = [];

//     constructor(private appointmentService: AppointmentService) {}

//     ngOnInit(): void {
//         this.loadAppointments();
//     }

//     loadAppointments(): void {
//         this.appointmentService.getAppointment().subscribe((appointments) => {
//             this.appointments = appointments;
//         });
//     }

//     getWeekDays(): Date[] {
//         const today = new Date(this.currentDate);
//         const firstDayOfWeek = today.getDate() - today.getDay(); // Lấy ngày đầu tiên của tuần
//         const startOfWeek = new Date(today.setDate(firstDayOfWeek));

//         const weekDays = [];

//         for (let i = 0; i < 7; i++) {
//             const day = new Date(startOfWeek);
//             day.setDate(startOfWeek.getDate() + i);
//             weekDays.push(day);
//         }

//         return weekDays;
//     }

//     previousWeek(): void {
//         this.currentDate.setDate(this.currentDate.getDate() - 7);
//     }

//     nextWeek(): void {
//         this.currentDate.setDate(this.currentDate.getDate() + 7);
//     }

//     goToToday(): void {
//         this.currentDate = new Date();
//     }

//     getAppointmentsForDayAndTimeSlot(day: Date, timeSlot: string): Appointment[] {
//         const filteredAppointments = this.appointments.filter(
//             (appointment) => appointment.date && new Date(appointment.date).toDateString() === day.toDateString() && appointment.timeSlot === timeSlot
//         );

//         return filteredAppointments;
//     }
// }
// calendar.component.ts
import { Component, OnInit } from '@angular/core';
import { Appointment, AppointmentService } from '@hospital/libs/services';

@Component({
    selector: 'hospital-list',
    templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit {
    daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
        console.log('Selected date:', event);
        this.selectedDate = event;
        this.currentWeek = event;
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

    previousWeek(): void {
        this.currentWeek = new Date((this.currentWeek || this.selectedDate || this.currentDate).getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    nextWeek(): void {
        this.currentWeek = new Date((this.currentWeek || this.selectedDate || this.currentDate).getTime() + 7 * 24 * 60 * 60 * 1000);
    }

    goToToday(): void {
        this.currentDate = new Date();
        this.currentWeek = new Date();
    }

    getAppointmentsForDayAndTimeSlot(day: Date, timeSlot: string): Appointment[] {
        const filteredAppointments = this.appointments.filter(
            (appointment) => appointment.date && new Date(appointment.date).toDateString() === day.toDateString() && appointment.timeSlot === timeSlot
        );

        return filteredAppointments;
    }
}
