import React, { useEffect, useState } from 'react';
import { Medication } from '../types';

export default () => {

    const [ medications, setMedications ] = useState<Array<Medication>>([]);

    useEffect(() => {
        fetch('/api/medications', { method: 'GET' })
            .then(r => r.json())
            .then(setMedications);
    }, []);

    return <>
        <section>
            <h1>Medications</h1>
        </section>

        <section>
            {medications.map(m => <>
                <details>
                    <summary>
                        <span>{m.title}</span>
                    </summary>
                    <p>...</p>
                </details>
                <hr />
            </>)}
        </section>

    </>;
};