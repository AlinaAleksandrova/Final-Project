import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Імпорт компонента Provider з react-redux
import { store } from './redux/store'; // Імпорт Redux Store
import App from './App';

// Отримуємо кореневий елемент
const container = document.getElementById('root');
const root = createRoot(container);

// Обгортаємо додаток в <Provider>, передаючи store
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
);



