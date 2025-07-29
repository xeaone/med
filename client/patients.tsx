import React, { useEffect, useState } from 'react';
import { Patient } from '../types';

export default () => {
    const [ patients, setPatients ] = useState<Array<Patient>>([]);

    useEffect(() => {
        fetch('/api/patients', { method: 'GET' })
            .then(r => r.json())
            .then(d => setPatients(d));
    }, []);

    return <>

        <section>
            <h1>Patients</h1>
        </section>

        <section>
            <ul>
                {patients.map(patient => <>
                    <li className="grid">
                        <span className="material-symbols-outlined">account_circle</span>
                        <a role="button" className="outline" href={`/patient?id=${patient.id}`}>
                            {patient.firstName} {patient.lastName}
                        </a>
                    </li>
                </>)}
            </ul>
        </section>

    </>;
};