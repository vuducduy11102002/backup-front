import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor, DoctorService } from '@hospital/libs/services';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

//Remenber import location from @angular/common then back() will work
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'hospital-create',
    templateUrl: './create.component.html'
})
export class CreateDoctorComponent implements OnInit {
    editmode = false;
    form!: FormGroup;
    isSubmitted = false;
    isLoading = false;
    imageDisplay!: string | ArrayBuffer;

    constructor(
        private formBuilder: FormBuilder,
        private doctorService: DoctorService,
        private messageService: MessageService,
        private location: Location,
        private activateroute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._initForm();
    }

    private _initForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            specialist: ['', Validators.required],
            image: ['']
        });
    }

    get doctorForm() {
        return this.form.controls;
    }

    onCancle() {}
    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }

        const doctorFormData = new FormData();

        Object.keys(this.doctorForm).map((key) => {
            doctorFormData.append(key, this.doctorForm[key].value);
        });
        this._addDoctor(doctorFormData);
    }

    onImageUpload(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        const file = (fileInput.files && fileInput.files[0]) || null;

        if (file) {
            this.form.patchValue({
                image: file
            });
            this.form.get('image')?.updateValueAndValidity();
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const imageData = fileReader.result as string | ArrayBuffer;
                this.imageDisplay = imageData;
            };
            fileReader.readAsDataURL(file);
        }
    }

    private _addDoctor(doctorData: FormData) {
        this.doctorService.createDoctor(doctorData).subscribe(
            (doctor: Doctor) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `${doctor.name} is created!`
                });
                timer(2000)
                    .toPromise()
                    .then(() => {
                        this.location.back();
                    });
            },
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Doctor is not created!'
                });
            }
        );
    }
}
