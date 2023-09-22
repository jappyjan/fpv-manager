// Import React and ReactDOM
import * as React from 'react';
import { createRoot } from 'react-dom/client';

// Import Framework7
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Framework7 from 'framework7/lite-bundle';

// Import Framework7-React Plugin
import Framework7React from 'framework7-react';

// Import Framework7 Styles
import 'framework7/css/bundle';

// Import Icons and App Custom Styles
import './css/icons.css';
import './css/app.css';

// Import App Component
import App from './components/app.tsx';

// Init F7 React Plugin
Framework7.use(Framework7React)

// Mount React App
const root = createRoot(document.getElementById('app')!);
root.render(React.createElement(App));
