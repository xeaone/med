import React, { FormEvent, useEffect, useState } from 'react';
import { Medication, Patient } from '../types';

export default () => {
    const { id, patient } = Object.fromEntries(new URLSearchParams(location.search));

    const [ medication, setMedication ] = useState<Medication>({} as any);

    // const [ modalState, setModalState ] = useState<boolean>(false);
    // const modalOpen = () => setModalState(true);
    // const modalClose = () => setModalState(false);

    const save = async (e: FormEvent) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const data = Object.fromEntries(new FormData(target));
        console.log(data);

        // const result = await fetch(`/api/medication`, {
        //     method: 'PUT',
        //     body: JSON.stringify({
        //         ...data,
        //         patient,
        //     }),
        // });

        // console.log(result);
    };

    const add = async (e: FormEvent) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const data = Object.fromEntries(new FormData(target));

        const result = await fetch(`/api/medication`, {
            method: 'PUT',
            body: JSON.stringify({
                ...data,
                patient,
            }),
        }).then(r => r.json());
        console.log(result);

        location.search += `&id=${result.id}`;
    };

    const remove = () => {

    };

    useEffect(() => {

        if (id) {
            fetch(`/api/medication?id=${id}`, { method: 'GET' })
                .then(r => r.json())
                .then(setMedication);
        } else {

        }

    }, []);

    return (<>

        <div className="row">
            <a href={`/patient?id=${patient}`} className="button transparent">
                <i>arrow_back</i>
            </a>
            <h1 className="max">Medication</h1>
            <button type="button" className="border error-border error-text" onClick={remove}>
                <i>delete</i>
                <span>Remove Medication</span>
            </button>
        </div>

        <article className="border">
            <h5 className="padding">Details</h5>

            <form className="grid" onSubmit={id ? save : add}>
                <div className="field label border s12 m6">
                    <input name="title" value={medication?.title} required/>
                    <label>Title</label>
                </div>
                <div className="field label border s12 m6">
                    <input name="description" value={medication?.description} required/>
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


    </>);
};