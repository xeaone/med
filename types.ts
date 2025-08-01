
export interface Patient {
    id: string,
    firstName: string,
    lastName: string,
}

export interface Log {
    id: string,
    stamp: number;
    medication: string,
}

export interface Medication {
    id: string,
    title: string,
    patient: string,
    active: boolean,

    dosage: string,
    time: string,
    recurrence: string,

    description: string,
}

export type Payload = Record<any, any> | Array<any> | null;