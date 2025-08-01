import React, { FormEvent, useEffect, useState } from 'react';
import { Medication, Patient } from '../types';

export default () => {
    const { id } = Object.fromEntries(new URLSearchParams(location.search));

    const [ patient, setPatient ] = useState<Patient>({} as any);
    const [ medications, setMedications ] = useState<Array<Medication>>([]);

    const save = async (e: FormEvent) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const data = Object.fromEntries(new FormData(target));
        console.log(data);
    };

    const add = async (e: FormEvent) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const data = Object.fromEntries(new FormData(target));
        console.log(data);
        // location.search += `&id=${result.id}`;
    };

    const remove = () => {

    };

    useEffect(() => {
        const { id } = Object.fromEntries(new URLSearchParams(location.search));

        fetch(`/api/patient?id=${id}`, { method: 'GET' })
            .then(r => r.json())
            .then(setPatient);

        fetch(`/api/medications?patient=${id}`, { method: 'GET' })
            .then(r => r.json())
            .then(setMedications);

    }, []);

    return (<>

        <div className="row">
            <a href="/patients" className="button transparent">
                <i>arrow_back</i>
            </a>
            <h1 className="max">Patient</h1>
            <button className="border error-border error-text" onClick={remove}>
                <i>delete</i>
                <span>Remove Patient</span>
            </button>
        </div>

        <article className="border">
            <h5 className="padding">Details</h5>
            <form onSubmit={id ? save : add} className="grid">
                <div className="field label border s12 m6">
                    <input name="firstName" value={patient.firstName} required/>
                    <label>First Name</label>
                </div>
                <div className="field label border s12 m6">
                    <input name="lastName" value={patient.lastName} required/>
                    <label>Last Name</label>
                </div>
                <div className="s12 right-align">
                    <button className="border" type="submit">
                        <i>save</i>
                        <span>Save</span>
                    </button>
                </div>
            </form>
        </article>

        <article className="border">
            <div className="row">
                <h5 className="max">Medications</h5>
                <a className="button border" href={`/medication?patient=${patient.id}`}>
                    <i>add</i>
                    <span>Add Medication</span>
                </a>
            </div>
            <ul className="list">
                {medications.map(medication => <>
                    <li>
                        <i>medication</i>
                        <span className="max">{medication.title}</span>
                        <a className="button border" href={`/medication?id=${medication.id}&patient=${patient.id}`}>View</a>
                    </li>
                </>)}
            </ul>
        </article>

    </>);
};