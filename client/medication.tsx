import React, { FormEvent, useEffect, useState } from 'react';
import { Medication, Log } from '../types';

export default () => {
    const { id, patient } = Object.fromEntries(new URLSearchParams(location.search));

    const [ medication, setMedication ] = useState<Medication>({
        id,
        patient,
        title: '',
        time: '',
        dosage: '',
        active: false,
        recurrence: '',
        description: '',
    });

    const [ logs, setLogs ] = useState<Array<Log>>([]);

    const [ modalState, setModalState ] = useState<boolean>(false);
    const modalOpen = () => setModalState(true);
    const modalClose = () => setModalState(false);

    const remove = () => modalOpen();

    const taken  = async () => {
        const result = await fetch(`/api/log`, {
            method: 'PUT',
            body: JSON.stringify({
                stamp: Date.now(),
                medication: medication.id,
            }),
        }).then(r => r.json());

        await fetch(`/api/logs?medication=${id}`, { method: 'GET' })
            .then(r => r.json())
            .then(setLogs);

    };

    const submit = async (e: FormEvent) => {
        e.preventDefault();

        const result = await fetch(`/api/medication`, {
            method: 'PUT',
            body: JSON.stringify(medication),
        }).then(r => r.json());

        if (!id) location.search += `&id=${result.id}`;
    };

    const change = (e: FormEvent<HTMLFormElement>) => {
        const { type, name, value, checked } = e.target as HTMLInputElement;
        setMedication({ ...medication, [ name ]: type === 'checkbox' ? checked : value });
    };

    useEffect(() => {

        if (!id) return;

        fetch(`/api/medication?id=${id}`, { method: 'GET' })
            .then(r => r.json())
            .then(setMedication);

        fetch(`/api/logs?medication=${id}`, { method: 'GET' })
            .then(r => r.json())
            .then(setLogs);

    }, []);

    const back = () => {
        if (patient) {
            location.pathname = `/patient?id=${patient}`;
        } else {
            history.back();
        }
    };

    return (<>

        <div className="row">
            <button onClick={back} className="border">
                <i>arrow_back</i>
            </button>
            <h1 className="max padding">Medication</h1>
            {id && <button type="button" className="border error-border error-text" onClick={remove}>
                <i>delete</i>
                <span>Remove Medication</span>
            </button>}
        </div>

        <article className="border">
            <h5 className="padding">Details</h5>
            <form className="grid" onSubmit={submit} onChange={change}>
                <div className="field s12 grid right-align">
                    <div className="s11 right-align">
                        <h6>Active</h6>
                        <div>Medications cannot be removed.</div>
                    </div>
                    <label className="switch s1 right-align">
                        <input name="active" type="checkbox" checked={medication?.active} />
                        <span></span>
                    </label>
                </div>
                <div className="field label border s12 m6">
                    <input name="title" value={medication?.title} required/>
                    <label>Title</label>
                </div>
                <div className="field label border s12 m6">
                    <input name="dosage" value={medication?.dosage} required/>
                    <label>Dosage</label>
                </div>
                <div className="field label border s12 m6">
                    <input type="time" name="time" value={medication?.time} required/>
                    <label>Time</label>
                </div>
                <div className="field border label suffix s12 m6">
                    <select name="recurrence" value={medication?.recurrence} required>
                        <option value="" selected disabled></option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                    </select>
                    <label>Recurrence</label>
                    <i>arrow_drop_down</i>
                </div>
                <div className="field textarea label border s12">
                    <textarea name="description" value={medication?.description} required></textarea>
                    <label>Description</label>
                </div>
                <div className="s12 right-align">
                    <button className="border" type="submit">
                        <i>{id ? 'save' : 'add'}</i>
                        <span>{id ? 'Save' : 'Add'}</span>
                    </button>
                </div>
            </form>
        </article>

        {id &&
            <article className="border">
                <div className="row">
                    <h5 className="max padding">Logs</h5>
                    <button type="button" className="border" onClick={taken}>
                        <i>add</i>
                        <span>Mark Taken</span>
                    </button>
                </div>
                <ul className="list large-space border">
                    {logs.map(log => <>
                        <li>
                            <i>schedule</i>
                            <div className="max grid">
                                <div className="s12">{new Date(log.stamp).toLocaleString()}</div>
                            </div>
                        </li>
                    </>)}
                </ul>
            </article>
        }

        <dialog className="modal" open={modalState}>
            <div className="grid">
                <h5 className="s10">Remove Medication</h5>
                <button className="s2" onClick={modalClose}>
                    <i>close</i>
                </button>
            </div>
            <p>Removing medication is not allowed.</p>
        </dialog>

    </>);
};