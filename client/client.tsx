import React from 'react';
import { createRoot } from 'react-dom/client';

import Root from './root';
import Patients from './patients';

import './client.css';

const NotFound = () => <h1>Not Found</h1>;

const path = window.location.pathname.replace(/\/(Stage|Pro)\/?/, '/');
// const root = document.querySelector('main') as HTMLElement;
const root = document.querySelector('.container') as HTMLElement;

const page = (<>
    <header>
        <nav>
            <ul>
                <li><strong>Medication Manager</strong></li>
            </ul>
            <ul>
                <li>
                    <a href="/" className="contrast">
                        <span className="material-symbols-outlined">medication</span>
                        <span>Medications</span>
                    </a>
                </li>
                <li>
                    <a href="/patients" className="contrast">
                        <span className="material-symbols-outlined">groups</span>
                        <span>Patients</span>
                    </a>
                </li>
            </ul>
        </nav>
    </header>
    <main>
        {
            path === '/' ? <Root /> :
            path === '/patients' ? <Patients /> :
            <NotFound />
        }
    </main>
    <footer></footer>
</>);

createRoot(root).render(page);