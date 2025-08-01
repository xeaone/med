import React, { FormEvent, useEffect, useState } from 'react';
import { Medication, Patient } from '../types';

export default () => {
    const { id } = Object.fromEntries(new URLSearchParams(location.search));

    const [ patient, setPatient ] = useState<Patient>({ id, firstName: '', lastName: '', });
    const [ medications, setMedications ] = useState<Array<Medication>>([]);

    const [ modalState, setModalState ] = useState<boolean>(false);
    const modalOpen = () => setModalState(true);
    const modalClose = () => setModalState(false);

    const remove = () => {
        modalOpen();
    };

    const submit = async (e: FormEvent) => {
        e.preventDefault();

        const result = await fetch(`/api/patient`, {
            method: 'PUT',
            body: JSON.stringify(patient),
        }).then(r => r.json());

        if (!id) location.search += `&id=${result.id}`;
    };

    const change = (e: FormEvent<HTMLFormElement>) => {
        const { type, name, value, checked } = e.target as HTMLInputElement;
        setPatient({ ...patient, [ name ]: type === 'checkbox' ? checked : value });
    };

    const back = () => history.back();

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
            <button onClick={back} className="border">
                <i>arrow_back</i>
            </button>
            <h1 className="max padding">Patient</h1>
            {id && <button className="border error-border error-text" onClick={remove}>
                <i>delete</i>
                <span>Remove Patient</span>
            </button>}
        </div>

        <article className="border">
            <h5 className="padding">Details</h5>
            <form onSubmit={submit} onChange={change} className="grid">
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
                        <i>{id ? 'save' : 'add'}</i>
                        <span>{id ? 'Save' : 'Add'}</span>
                    </button>
                </div>
            </form>
        </article>

        <article className="border">
            <div className="row padding">
                <h5 className="max">Medications</h5>
                <a className="button border" href={`/medication?patient=${patient.id}`}>
                    <i>add</i>
                    <span>Add Medication</span>
                </a>
            </div>
            <ul className="list large-space border">
                {medications.map(medication => <>
                    <li>
                        <i>medication</i>
                        <span className="max">{medication.title}</span>
                        <a className="button border" href={`/medication?id=${medication.id}&patient=${patient.id}`}>View</a>
                    </li>
                </>)}
            </ul>
        </article>

        <dialog className="modal" open={modalState}>
            <div className="grid">
                <h5 className="s10">Remove Patient</h5>
                <button className="s2" onClick={modalClose}>
                    <i>close</i>
                </button>
            </div>
            <p>Removing Patient is not allowed.</p>
        </dialog>

    </>);
};