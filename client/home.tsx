import React, { useEffect, useState } from 'react';

export default () => {

    useEffect(() => {
    }, []);

    return <>

        <div className="grid">
            <div className="s12">
                <h1 className="max padding">Home</h1>
            </div>
            <article className="border s12 m6">
                <h5>Medications</h5>
                <p>View upcoming medications.</p>
                <nav>
                    <a href="/medications" className="button border">
                        <i>medication</i>
                        <span>View</span>
                    </a>
                </nav>
            </article>
            <article className="border s12 m6">
                <h5>Patients</h5>
                <p>Manage patients and medications.</p>
                <nav>
                    <a href="/patients" className="button border">
                        <i>groups</i>
                        <span>View</span>
                    </a>
                </nav>
            </article>
        </div>

    </>;
};