import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient, PatientService } from '@hospital/libs/services';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'hospital-list',
    templateUrl: './list.component.html'
})
export class ListPatientComponent implements OnInit, OnDestroy {
    endsubs$: Subject<any> = new Subject();

    patient: Patient[] = [];
    selectedPatients: string[] = [];
    softDeletedPatients: Patient[] = [];
    Visible = false;

    constructor(
        private patientService: PatientService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._GetPatient();
        this.GetSoftDeletedPatients();
    }

    ngOnDestroy(): void {
        console.log('Destroyed');
        this.endsubs$.next(true);
        this.endsubs$.complete();
    }

    DeletePatient(patientID: string): void {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.patientService.deletePatient(patientID).subscribe(
                    (response) => {
                        this._GetPatient();
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Success' });
                    },
                    (error) => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Deleted Failed' });
                    }
                );
            },
            reject: (type: ConfirmEventType) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                        break;
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                        break;
                }
            }
        });
    }

    updatePatient(patientid: string) {
        this.router.navigateByUrl(`/patient/edit/${patientid}`);
    }

    private _GetPatient() {
        this.patientService
            .getPatient()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((cats) => {
                this.patient = cats;
            });
    }
    showDialog() {
        this.Visible = true;
    }

    // Soft Deleted
    selectedPatient(patientId: string) {
        if (this.isSelected(patientId)) {
            this.selectedPatients = this.selectedPatients.filter((id) => id !== patientId);
        } else {
            this.selectedPatients.push(patientId);
        }
    }
    isSelected(patientId: string): boolean {
        return this.selectedPatients.includes(patientId);
    }

    SoftDeletePatients() {
        if (this.selectedPatients.length === 0) {
            return;
        }

        this.patientService.softDeletePatients(this.selectedPatients).subscribe(
            (response) => {
                this.GetSoftDeletedPatients();
                this._GetPatient();
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Success' });
                this.selectedPatients = [];
            },
            (error) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Deleted Failed' });
            }
        );
    }

    GetSoftDeletedPatients() {
        this.patientService
            .getSoftDeletedPatients()
            .pipe(takeUntil(this.endsubs$))
            .subscribe(
                (softDeletedPatients) => {
                    this.softDeletedPatients = softDeletedPatients;
                },
                (error) => {
                    console.error('Lỗi khi lấy danh sách bệnh nhân đã bị soft delete', error);
                }
            );
    }

    RestorePatients() {
        if (this.selectedPatients.length === 0) {
            return;
        }

        const patientIds = this.selectedPatients; // Chúng ta không cần map ở đây

        this.patientService.restorePatients(patientIds).subscribe(
            (response) => {
                this.GetSoftDeletedPatients();
                this._GetPatient();
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Restored Success' });
                this.selectedPatients = [];
            },
            (error) => {
                // Xảy ra lỗi trong quá trình khôi phục
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Restoration Failed' });
            }
        );
    }
}
