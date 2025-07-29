import React, { useEffect, useState } from 'react';

export default () => {

    useEffect(() => {
    }, []);

    return <>
        <section>
            <h1>Dashboard</h1>
        </section>

        <section className="grid">

            <article>
                <a href="/medications" className="contrast">
                    <span className="material-symbols-outlined">medication</span>
                    <span>Medications</span>
                </a>
            </article>

            <article>
                <a href="/patients" className="contrast">
                    <span className="material-symbols-outlined">groups</span>
                    <span>Patients</span>
                </a>
            </article>

        </section>

    </>;
};