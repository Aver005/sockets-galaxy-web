/**
 * @fileoverview Zustand store для управления WebSocket соединением
 * @description Централизованное хранилище состояния WebSocket подключения и обработчиков сообщений
 */

import { create } from 'zustand';

/**
 * Тип функции-обработчика WebSocket сообщений
 * @description Функция, которая вызывается при получении сообщения определенного типа
 * @param {unknown} data - Данные полученного сообщения
 */
export type MessageHandler = (data: unknown) => void;

/**
 * Интерфейс состояния WebSocket соединения
 * @interface ConnectState
 */
interface ConnectState
{
    /** WebSocket соединение или null если не подключено */
    socket: WebSocket | null;
    /** Флаг состояния подключения */
    connected: boolean;
    /** Карта обработчиков сообщений по типам */
    handlers: Record<string, Set<MessageHandler>>;
}

/**
 * Zustand store для управления WebSocket соединением
 * @description Хранит состояние подключения, сокет и обработчики сообщений.
 * Используется для централизованного управления WebSocket коммуникацией в приложении.
 */
const useConnectStore = create<ConnectState>(() =>
({
    socket: null,
    connected: false,
    handlers: {},
}));

export default useConnectStore;