import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

const Home = lazy(() => import('./home'));
const Patient = lazy(() => import('./patient'));
const Patients = lazy(() => import('./patients'));
const Medication = lazy(() => import('./medication'));
const Medications = lazy(() => import('./medications'));

import 'beercss';

const NotFound = () => <h1>Not Found</h1>;

const path = location.pathname;
const root = document.body;

const page = <>
    <header className="fill">
        <nav>
            <a href="/" className="button circle transparent">
                <i>home</i>
            </a>
            <h6 className="max center-align">Medication Manager</h6>
            <button className="circle transparent">
                <i>help</i>
            </button>
        </nav>
    </header>
    <main className="responsive">
        <Suspense>
        {
            path === '/' ? <Home /> :
            path === '/patient' ? <Patient /> :
            path === '/patients' ? <Patients /> :
            path === '/medication' ? <Medication /> :
            path === '/medications' ? <Medications /> :
            <NotFound />
        }
        </Suspense>
    </main>
    <footer></footer>
</>;

createRoot(root).render(page);