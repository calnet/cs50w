// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// third party
import { BrowserRouter } from 'react-router-dom';

// project imports
// import * as serviceWorker from 'serviceWorker';
import App from './App.tsx';

// style + assets
import { Global, css } from '@emotion/react';
import config from './config';

// ==============================|| REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
    <>
        {/* <StrictMode> */}
        <BrowserRouter basename={config.basename}>
            <App />
        </BrowserRouter>

        <Global
            styles={css`
                html {
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    box-sizing: border-box;
                    -webkit-text-size-adjust: 100%;
                }

                *,
                *::before,
                *::after {
                    box-sizing: inherit;
                }

                strong,
                b {
                    font-weight: 700;
                }

                body {
                    margin: 0;
                    color: #111927;
                    font-size: 1rem;
                    font-weight: 400;
                    line-height: 1.5;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
                        'Segoe UI Emoji';
                    background-color: #fff;
                }

                @media print {
                    body {
                        background-color: #fff;
                    }
                }

                body::backdrop {
                    background-color: #fff;
                }

                * {
                    box-sizing: border-box;
                }

                html {
                    -moz-osx-font-smoothing: grayscale;
                    -webkit-font-smoothing: antialiased;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-flex-direction: column;
                    -ms-flex-direction: column;
                    flex-direction: column;
                    min-height: 100%;
                    width: 100%;
                }

                body {
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-flex: 1 1 auto;
                    -ms-flex: 1 1 auto;
                    flex: 1 1 auto;
                    -webkit-flex-direction: column;
                    -ms-flex-direction: column;
                    flex-direction: column;
                    min-height: 100%;
                    width: 100%;
                }

                #root {
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-flex: 1 1 auto;
                    -ms-flex: 1 1 auto;
                    flex: 1 1 auto;
                    -webkit-flex-direction: column;
                    -ms-flex-direction: column;
                    flex-direction: column;
                    height: 100%;
                    width: 100%;
                }
            `}
        />
        {/* </StrictMode> */}
    </>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
