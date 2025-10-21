/**
 * @fileoverview Точка входа для Sockets Galaxy веб-приложения
 * @description Инициализирует Preact приложение и монтирует его в DOM
 */

import { render } from 'preact';
import App from '@/app/App.tsx';
import '#/styles/global.css';

/**
 * Рендерит корневой компонент приложения в DOM
 * @description Монтирует React/Preact приложение в элемент с id="app"
 */
render(<App />, document.getElementById('app')!)
