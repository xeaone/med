import React, { useEffect, useState } from 'react';
import { Patient } from '../types';

export default () => {
    const [ patient, setPatient ] = useState<Patient>({} as any);

    useEffect(() => {
        const { id } = Object.fromEntries(new URLSearchParams(location.search));

        fetch(`/api/patient?id=${id}`, { method: 'GET' })
            .then(r => r.json())
            .then(d => setPatient(d));

    }, []);

    return (<>

        <section>
            <h1>Patient</h1>
        </section>

        <section>
            <article>
                <header>{patient?.firstName} {patient?.lastName}</header>
            </article>
        </section>

        <section>
            <article>
            </article>
        </section>

    </>);
};