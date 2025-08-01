import React, { FormEvent, useEffect, useState } from 'react';
import { Patient } from '../types';

export default () => {
    const [ patients, setPatients ] = useState<Array<Patient>>([]);
    const [ isAddPatient, setIsAddPatient ] = useState<boolean>(false);

    const openAddPatient = () => setIsAddPatient(true);
    const closeAddPatient = () => setIsAddPatient(false);

    const load = async () => {
        await fetch('/api/patients', { method: 'GET' })
            .then(r => r.json())
            .then(d => setPatients(d));

    };

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setIsAddPatient(false);
        const target = e.target as HTMLFormElement;
        const data = Object.fromEntries(new FormData(target));

        const result = await fetch('/api/patient', { method: 'PUT', body: JSON.stringify(data) });

        console.log(result);
        await load();
    };

    useEffect(() => {
        load();
    }, []);

    return <>

        <div className="row">
            <h1 className="max">Patients</h1>
            <button onClick={openAddPatient}>
                <i>add</i>
                <span>Add Patient</span>
            </button>
        </div>

        <article className="border">
            <ul className="list large-space border">
                {patients.map(patient => <>
                    <li>
                        <i>account_circle</i>
                        <div className="max">{patient.firstName} {patient.lastName}</div>
                        <a className="button" href={`/patient?id=${patient.id}`}>View</a>
                    </li>
                </>)}
            </ul>
        </article>

        <dialog className="modal" open={isAddPatient}>
            <div className="grid">
                <h5 className="s10">Add Patient</h5>
                <button className="s2" onClick={closeAddPatient}>
                    <i>close</i>
                </button>
            </div>
            <form onSubmit={submit} className="grid">
                <div className="field label border s12 m6">
                    <input name="firstName" required />
                    <label>First Name</label>
                </div>
                <div className="field label border s12 m6">
                    <input name="lastName" required />
                    <label>Last Name</label>
                </div>
                <div className="s12 right-align">
                    <button type="submit">
                        <i>save</i>
                        <span>Add</span>
                    </button>
                </div>
            </form>
        </dialog>

    </>;
};