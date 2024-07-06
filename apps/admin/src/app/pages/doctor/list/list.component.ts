import { Component, OnInit } from '@angular/core';
import { DoctorService, Doctor } from '@hospital/libs/services';

@Component({
    selector: 'hospital-list',
    templateUrl: './list.component.html'
})
export class ListDoctorComponent implements OnInit {
    doctors: Doctor[] = [];
    constructor(private doctorService: DoctorService) {}

    ngOnInit(): void {
        this._getDoctor();
    }

    // deleteDoctor() {}

    // updateDoctor() {}

    private _getDoctor() {
        this.doctorService.getDoctor().subscribe((doctors) => {
            console.log(doctors);
            this.doctors = doctors;
        });
    }
}
