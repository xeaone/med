import React, { useEffect, useState } from 'react';

export default () => {

    useEffect(() => {
    }, []);

    return <>
        <h1>Home</h1>
        <div className="grid">
            <div className="s12 m6">
                <article className="border">
                    <h5>Medications</h5>
                    <nav>
                        <a href="/medications" className="button">
                            <i>medication</i>
                            <span>View</span>
                        </a>
                    </nav>
                </article>
            </div>
            <div className="s12 m6">
                <article className="border">
                    <h5>Patients</h5>
                    <nav>
                        <a href="/patients" className="button">
                            <i>groups</i>
                            <span>View</span>
                        </a>
                    </nav>
                </article>
            </div>
        </div>
    </>;
};