import React, { useEffect, useState } from 'react';
import { Patient } from '../types';

export default () => {
    const [ patients, setPatients ] = useState<Array<Patient>>([]);

    const back = () => history.back();

    useEffect(() => {

        fetch('/api/patients', { method: 'GET' })
            .then(r => r.json())
            .then(d => setPatients(d));

    }, []);

    return <>

        <div className="row">
            <button onClick={back} className="border">
                <i>arrow_back</i>
            </button>
            <h1 className="max padding">Patients</h1>
            <a href="/patient" className="button border">
                <i>add</i>
                <span>Add Patient</span>
            </a>
        </div>

        <article className="border">
            <ul className="list large-space border">
                {patients.map(patient => <>
                    <li>
                        <i>account_circle</i>
                        <div className="max">{patient.firstName} {patient.lastName}</div>
                        <a className="button border" href={`/patient?id=${patient.id}`}>View</a>
                    </li>
                </>)}
            </ul>
        </article>

    </>;
};