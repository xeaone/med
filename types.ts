
export interface Patient {
    id: string,
    firstName: string,
    lastName: string,
}

export interface Medication {
    id: string,
    title: string,
    patient: string,
    active: boolean,
    description: string,
}

export type Payload = Record<any, any> | Array<any> | null;