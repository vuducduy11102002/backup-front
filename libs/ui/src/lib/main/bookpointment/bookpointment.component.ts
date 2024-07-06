import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  AppointmentRequestService,
  Doctor,
  DoctorService,
  RequestAppointment,
} from '@hospital/libs/services';
import { MessageService } from 'primeng/api';
import { timeSlotData } from './bookpointment';

@Component({
  selector: 'libs-bookpointment',
  templateUrl: './bookpointment.component.html',
})
export class BookpointmentComponent implements OnInit {
  timeSlot: typeof timeSlotData = timeSlotData;
  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private appointmentRequestService: AppointmentRequestService,
    private doctorService: DoctorService
  ) {}

  form!: FormGroup;
  isSubmitted = false;
  doctors: Doctor[] = [];
  // data

  ngOnInit(): void {
    this._initForm();
    this._getDoctor();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: [
        '',
        Validators.required,
        Validators.pattern('0[0-9]{9}$'),
        Validators.minLength(10),
      ],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      time: ['', Validators.required],
      date: ['', Validators.required],
      timeSlot: new FormControl(),
      address: ['', Validators.required],
      doctor: ['', Validators.required],
    });

    // handle dropdown ,pick, etc...

    this.form.patchValue({
      timeSlot: this.timeSlot[0],
    });
  }

  private _getDoctor() {
    this.doctorService.getDoctor().subscribe((doctors) => {
      this.doctors = doctors;
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      // Display a general validation error message
      return this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'You must fill all required fields to submit',
      });
    }

    // Assuming dob and date are strings in the format 'YYYY/MM/DD'
    let dob = this.form.value.dob.replace(/-/g, '/'); // Replace hyphens with slashes
    let date = this.form.value.date.replace(/-/g, '/'); // Replace hyphens with slashes

    // Rearrange date format to 'MM/DD/YYYY'
    const dobParts = dob.split('/');
    dob = `${dobParts[1]}/${dobParts[2]}/${dobParts[0]}`;

    // Rearrange date format to 'MM/DD/YYYY'
    const dateParts = date.split('/');
    date = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;

    const requestpointment: RequestAppointment = {
      name: this.form.value.name,
      email: this.form.value.email,
      phone: this.form.value.phone,
      dob: dob,
      gender: this.form.value.gender,
      time: this.form.value.time,
      date: date,
      timeSlot: this.form.value.timeSlot.name,
      address: this.form.value.address,
      doctor: this.form.value.doctor,
    };

    // Trong hàm onSubmit của frontend
    this.appointmentRequestService
      .createRequestAppointment(requestpointment)
      .subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Appointment request submitted successfully',
          });
        },
        // ... (mã khác ở đây)

        (error) => {
          if (error.status === 400 && error.error && error.error.errorType) {
            const errorType = error.error.errorType;

            if (errorType === 'appointmentConflict') {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Time slot is already booked',
              });
            } else if (errorType === 'emailConflict') {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail:
                  'You have already submitted an appointment , please wait for approval',
              });
            }
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail:
                'An error occurred while submitting the appointment request.',
            });
          }
        }
      );
  }

  get formControls() {
    return this.form.controls;
  }
}
