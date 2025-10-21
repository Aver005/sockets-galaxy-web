/**
 * @fileoverview Zustand store для управления состоянием текущего клиента
 * @description Хранит информацию о текущем пользователе и его звезде в галактике
 */

import { create } from 'zustand';
import type { Star } from './stars.store';

/**
 * Интерфейс состояния клиента
 * @interface ClientState
 */
interface ClientState
{
    /** Уникальный идентификатор клиента */
    id: string;
    /** Звезда текущего клиента */
    star: Star;
}

/**
 * Zustand store для управления состоянием текущего клиента
 * @description Хранит ID клиента и информацию о его звезде.
 * Используется для отслеживания собственной позиции и отличия от других звёзд.
 */
const useClientStore = create<ClientState>(() =>
({
    id: '',
    star: { id: '', x: 0, y: 0, color: '' },
}));

export default useClientStore;