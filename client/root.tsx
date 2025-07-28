import React, { useEffect, useState } from 'react';

export default () => {

    const [ medications, setMedications ] = useState([
        { title: 'med title' }
    ]);

    useEffect(() => {
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