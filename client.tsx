import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const NotFound = () => <h1>Not Found</h1>;

const Root = () => {

    useEffect(() => {
    }, []);

    return <>
        <h1>Hello World</h1>
    </>;
};

const path = window.location.pathname.replace(/\/(Stage|Pro)\/?/, '/');
const root = document.querySelector('main') as HTMLElement;
const page = path === '/' ? <Root /> : <NotFound />;

createRoot(root).render(page);