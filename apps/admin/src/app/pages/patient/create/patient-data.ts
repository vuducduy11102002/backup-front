interface CareRequired {
    name: string;
}
interface BloodGroup {
    name: string;
}
interface Gender {
    name: string;
}
interface EmploymentStatus {
    name: string;
}
interface Diagnosis {
    name: string;
}

export const patientData: CareRequired[] = [
    { name: 'Take samples' },
    { name: 'Give medications' },
    { name: 'Prep for surgery' },
    { name: 'Post-operation care' }
];
export const bloodData: BloodGroup[] = [
    { name: 'A+' },
    { name: 'B+' },
    { name: 'AB+' },
    { name: 'O+' },
    { name: 'A-' },
    { name: 'B-' },
    { name: 'AB-' },
    { name: 'O-' }
];

export const genderData: Gender[] = [{ name: 'Male' }, { name: 'Female' }, { name: 'Other' }];

export const employmentstatusData: EmploymentStatus[] = [
    { name: 'Employed' },
    { name: 'Director' },
    { name: 'Office holder' },
    { name: 'Contracter' },
    { name: 'Self' },
    { name: 'Worker' },
    { name: 'Permanent' },
    { name: 'Student' },
    { name: 'Self-employed' },
    { name: 'Unemployed' },
    { name: 'Retired' },
    { name: 'Other' }
];

export const diagnosisData: Diagnosis[] = [{ name: 'Diabetes' }, { name: 'Unspecified Diabetes' }, { name: 'prediabetes' }];
