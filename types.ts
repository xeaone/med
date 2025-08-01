
export interface Patient {
    id: string,
    firstName: string,
    lastName: string,
    medication: string,
}

export interface Medication {
    id: string,
    title: string,
    description: string,
}

export type Payload = Record<any, any> | Array<any> | null;