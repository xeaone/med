import React, { useEffect, useState } from 'react';
import { Medication } from '../types';

export default () => {

    const [ daily, setDaily ] = useState<Array<Medication>>([]);
    const [ weekly, setWeekly ] = useState<Array<Medication>>([]);

    const back = () => history.back();

    const setup = async () => {
        const medications: Array<Medication> = await fetch('/api/medications', { method: 'GET' })
            .then(r => r.json());

        medications.sort((a, b) => a.time.localeCompare(b.time));

        setDaily(medications.filter(m => m.recurrence === 'daily'));
        setWeekly(medications.filter(m => m.recurrence === 'weekly'));
    };

    useEffect(() => {
        setup();
    }, []);

    return <>

        <div className="row">
            <button onClick={back} className="border">
                <i>arrow_back</i>
            </button>
            <h1 className="max padding">Medications</h1>
        </div>

        <article className="border">
            <h5 className="max padding">Daily</h5>
            <ul className="list large-space border">
            {daily.map(m => <>
                <li>
                    <i>medication</i>
                    <div className="max grid">
                        <div className="s3">{m.title}</div>
                        <div className="s3">{m.dosage}</div>
                        <div className="s3">{m.time}</div>
                        <div className="s3">{m.recurrence}</div>
                    </div>
                    <a className="button border" href={`/patient?id=${m.patient}`}>
                        <i>visibility</i>
                        <span>View Patient</span>
                    </a>
                    <a className="button border" href={`/medication?id=${m.id}`}>
                        <i>visibility</i>
                        <span>View Medication</span>
                    </a>
                </li>
            </>)}
            </ul>
        </article>

        <article className="border">
            <h5 className="max padding">Weekly</h5>
            <ul className="list large-space border">
            {weekly.map(m => <>
                <li>
                    <i>medication</i>
                    <div className="max grid">
                        <div className="s3">{m.title}</div>
                        <div className="s3">{m.dosage}</div>
                        <div className="s3">{m.time}</div>
                        <div className="s3">{m.recurrence}</div>
                    </div>
                    <a className="button border" href={`/patient?id=${m.patient}`}>
                        <i>visibility</i>
                        <span>View Patient</span>
                    </a>
                    <a className="button border" href={`/medication?id=${m.id}`}>
                        <i>visibility</i>
                        <span>View Medication</span>
                    </a>
                </li>
            </>)}
            </ul>
        </article>

    </>;
};