import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

const Root = lazy(() => import('./root'));
const Patient = lazy(() => import('./patient'));
const Patients = lazy(() => import('./patients'));
const Medications = lazy(() => import('./medications'));

import './client.css';

const NotFound = () => <h1>Not Found</h1>;

const path = window.location.pathname.replace(/\/(Stage|Pro)\/?/, '/');
// const root = document.querySelector('main') as HTMLElement;
const root = document.querySelector('.container') as HTMLElement;

const page = (<>
    <header>
        <nav>
            <ul>
                <li>
                    <a href="/" className="secondary">
                        <span className="material-symbols-outlined">home</span>
                    </a>
                </li>
            </ul>
            <ul>
                <li><strong>Medication Manager</strong></li>
            </ul>
            <ul>
                <li>
                    <a href="#" className="secondary">
                        <span className="material-symbols-outlined">help</span>
                    </a>
                </li>
            </ul>
        </nav>
    </header>
    <main>
        <Suspense>
        {
            path === '/' ? <Root /> :
            path === '/patient' ? <Patient /> :
            path === '/patients' ? <Patients /> :
            path === '/medications' ? <Medications /> :
            <NotFound />
        }
        </Suspense>
    </main>
    <footer></footer>
</>);

createRoot(root).render(page);