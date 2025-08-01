import React, { FormEvent, useEffect, useState } from 'react';
import { Medication } from '../types';

export default () => {
    const { id, patient } = Object.fromEntries(new URLSearchParams(location.search));

    const [ medication, setMedication ] = useState<Medication>({ id, patient, title: '', description: '', active: false });

    const [ modalState, setModalState ] = useState<boolean>(false);
    const modalOpen = () => setModalState(true);
    const modalClose = () => setModalState(false);

    const remove = () => modalOpen();

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

        if (id) {
            fetch(`/api/medication?id=${id}`, { method: 'GET' })
                .then(r => r.json())
                .then(setMedication)
        }

    }, []);

    return (<>

        <div className="row">
            <a href={`/patient?id=${patient}`} className="button transparent">
                <i>arrow_back</i>
            </a>
            <h1 className="max">Medication</h1>
            {id && <button type="button" className="border error-border error-text" onClick={remove}>
                <i>delete</i>
                <span>Remove Medication</span>
            </button>}
        </div>

        <article className="border">
            <h5 className="padding">Details</h5>
            <form className="grid" onSubmit={submit} onChange={change}>
                <div className="field label border s12 m6">
                    <input name="title" value={medication?.title} required/>
                    <label>Title</label>
                </div>
                <div className="field s12 m6 grid">
                    <div className="s10">
                        <h6>Active</h6>
                        <div>Medications cannot be removed.</div>
                    </div>
                    <label className="switch s2">
                        <input name="active" type="checkbox" checked={medication?.active} />
                        <span></span>
                    </label>
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