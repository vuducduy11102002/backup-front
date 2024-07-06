import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { bloodData, diagnosisData, employmentstatusData, genderData, patientData } from './patient-data';
import { Patient, PatientService } from '@hospital/libs/services';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

//Remenber import location from @angular/common then back() will work
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'hospital-create',
    templateUrl: './create.component.html'
})
export class CreatePatientComponent implements OnInit {
    form!: FormGroup;
    isSubmitted = false;
    isLoading = false;
    editmode = false;
    //data
    CareRequired = patientData;
    BloodGroup = bloodData;
    Gender = genderData;
    EmploymentStatus = employmentstatusData;
    Diagnosis = diagnosisData;
    currentID!: string;

    constructor(
        private formBuilder: FormBuilder,
        private patientService: PatientService,
        private messageService: MessageService,
        private location: Location,
        private activateroute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            PatientName: ['', Validators.required],
            CareRequired: new FormControl(),
            BloodGroup: new FormControl(),
            Height: ['', Validators.required],
            Allergies: ['', Validators.required],
            Gender: new FormControl(),
            Weight: ['', Validators.required],
            EmploymentStatus: new FormControl(),
            Admission: ['', Validators.required],
            Employer: ['', Validators.required],
            BodyTemperature: ['', Validators.required],
            BloodPressure: ['', Validators.required],
            Occupation: ['', Validators.required],
            Diagnosis: new FormControl(),
            Religion: ['', Validators.required],
            Dob: ['', Validators.required],
            ChronicCondition: ['', Validators.required],
            Nationality: ['', Validators.required]
        });

        // handle dropdown ,pick, etc...

        this.form.patchValue({
            CareRequired: this.CareRequired[0],
            BloodGroup: this.BloodGroup[0],
            Gender: this.Gender[0],
            EmploymentStatus: this.EmploymentStatus[0],
            Diagnosis: this.Diagnosis[0]
        });

        this._checkEditMode();
    }

    onSubmit() {
        this.isLoading = true;
        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }
        // Dob
        const dobValue = this.patientForm['Dob'].value;
        let formattedDob;

        if (this.editmode) {
            // Extract the date portion of dob for editing
            if (typeof dobValue === 'string') {
                formattedDob = dobValue.split('T')[0];
            } else if (dobValue instanceof Date) {
                formattedDob = dobValue.toISOString().split('T')[0];
            } else {
                formattedDob = dobValue; // No conversion needed
            }
        } else {
            // Convert dob to date format for creating
            if (typeof dobValue === 'string') {
                // Replace the first hyphen
                formattedDob = formattedDob!.replace('-', '/');

                // Check if there are any more hyphens
                while (formattedDob.indexOf('-') > -1) {
                    // Replace the next hyphen
                    formattedDob = formattedDob.replace('-', '/');
                }
            } else if (dobValue instanceof Date) {
                formattedDob = dobValue.toISOString().split('T')[0];

                // Replace the first hyphen
                formattedDob = formattedDob.replace('-', '/');

                // Check if there are any more hyphens
                while (formattedDob.indexOf('-') > -1) {
                    // Replace the next hyphen
                    formattedDob = formattedDob.replace('-', '/');
                }
            } else {
                formattedDob = dobValue; // No conversion needed
            }
        }

        // Admission
        const AdmissionValue = this.patientForm['Admission'].value;
        let formattedAdmission;

        if (this.editmode) {
            // Extract the date portion of dob for editing
            if (typeof AdmissionValue === 'string') {
                formattedAdmission = AdmissionValue.split('T')[0];
            } else if (AdmissionValue instanceof Date) {
                formattedAdmission = AdmissionValue.toISOString().split('T')[0];
            } else {
                formattedAdmission = AdmissionValue; // No conversion needed
            }
        } else {
            // Convert dob to date format for creating
            if (typeof AdmissionValue === 'string') {
                // Replace the first hyphen
                formattedAdmission = formattedAdmission!.replace('-', '/');

                // Check if there are any more hyphens
                while (formattedAdmission.indexOf('-') > -1) {
                    // Replace the next hyphen
                    formattedAdmission = formattedAdmission.replace('-', '/');
                }
            } else if (AdmissionValue instanceof Date) {
                formattedAdmission = AdmissionValue.toISOString().split('T')[0];

                // Replace the first hyphen
                formattedAdmission = formattedAdmission.replace('-', '/');

                // Check if there are any more hyphens
                while (formattedAdmission.indexOf('-') > -1) {
                    // Replace the next hyphen
                    formattedAdmission = formattedAdmission.replace('-', '/');
                }
            } else {
                formattedAdmission = AdmissionValue; // No conversion needed
            }
        }

        const patient: Patient = {
            id: this.currentID,
            PatientName: this.patientForm['PatientName'].value,
            CareRequired: this.patientForm['CareRequired'].value.name,
            BloodGroup: this.patientForm['BloodGroup'].value.name,
            Height: this.patientForm['Height'].value,
            Allergies: this.patientForm['Allergies'].value,
            Gender: this.patientForm['Gender'].value.name,
            Weight: this.patientForm['Weight'].value,
            EmploymentStatus: this.patientForm['EmploymentStatus'].value.name,
            Admission: formattedAdmission,
            Employer: this.patientForm['Employer'].value,
            BodyTemperature: this.patientForm['BodyTemperature'].value,
            BloodPressure: this.patientForm['BloodPressure'].value,
            Occupation: this.patientForm['Occupation'].value,
            Diagnosis: this.patientForm['Diagnosis'].value.name,
            Religion: this.patientForm['Religion'].value,
            Dob: formattedDob, // Use formatted dob
            ChronicCondition: this.patientForm['ChronicCondition'].value,
            Nationality: this.patientForm['Nationality'].value
        };

        // check editmode is create or update
        if (this.editmode) {
            this._updatePatient(patient);
        } else {
            this._addPatient(patient);
        }
    }

    private _checkEditMode() {
        this.activateroute.params.subscribe((params) => {
            if (params['id']) {
                this.editmode = true;
                this.currentID = params['id'];
                this.patientService.getaIdPatient(params['id']).subscribe((patient) => {
                    this.patientForm['PatientName'].setValue(patient.PatientName),
                        this.patientForm['CareRequired'].setValue(patient.CareRequired),
                        this.patientForm['BloodGroup'].setValue(patient.BloodGroup),
                        this.patientForm['Height'].setValue(patient.Height),
                        this.patientForm['Allergies'].setValue(patient.Allergies),
                        this.patientForm['Gender'].setValue(patient.Gender),
                        this.patientForm['Weight'].setValue(patient.Weight),
                        this.patientForm['EmploymentStatus'].setValue(patient.EmploymentStatus),
                        this.patientForm['Admission'].setValue(patient.Admission),
                        this.patientForm['Employer'].setValue(patient.Employer),
                        this.patientForm['BodyTemperature'].setValue(patient.BodyTemperature),
                        this.patientForm['BloodPressure'].setValue(patient.BloodPressure),
                        this.patientForm['Occupation'].setValue(patient.Occupation),
                        this.patientForm['Diagnosis'].setValue(patient.Diagnosis),
                        this.patientForm['Religion'].setValue(patient.Religion),
                        this.patientForm['Dob'].setValue(patient.Dob),
                        this.patientForm['ChronicCondition'].setValue(patient.ChronicCondition),
                        this.patientForm['Nationality'].setValue(patient.Nationality);
                });
            }
        });
    }

    private _addPatient(patient: Patient) {
        this.patientService.createPatient(patient).subscribe(
            (response) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Created Success' });
                timer(2000)
                    .toPromise()
                    .then(() => {
                        this.isLoading = false;
                        this.location.back();
                    });
            },
            (error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Created Failed' });
                // this.isLoading = false;
            }
        );
    }

    private _updatePatient(patient: Patient) {
        this.patientService.updatePatient(patient).subscribe(
            (response) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Created Success' });
                timer(2000)
                    .toPromise()
                    .then(() => {
                        this.isLoading = false;
                        this.location.back();
                    });
            },
            (error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Created Failed' });
                // this.isLoading = false;
            }
        );
    }

    get patientForm() {
        return this.form.controls;
    }
    onCancle() {
        this.location.back();
    }
}
