/**
 * @fileoverview Zustand store для управления звёздами в галактике
 * @description Централизованное хранилище всех звёзд других клиентов в галактике
 */

import { create } from 'zustand';

/**
 * Интерфейс звезды в галактике
 * @interface Star
 */
export interface Star
{
    /** Уникальный идентификатор звезды (ID клиента) */
    id: string;
    /** Координата X звезды */
    x: number;
    /** Координата Y звезды */
    y: number;
    /** Цвет звезды в формате OKLCH */
    color: string;
}

/**
 * Интерфейс состояния хранилища звёзд
 * @interface StarsState
 */
interface StarsState
{
    /** Массив всех звёзд в галактике */
    stars: Star[];
    /** Функция добавления новой звезды */
    add: (star: Star) => void;
    /** Функция удаления звезды */
    remove: (star: Star) => void;
}

/**
 * Zustand store для управления звёздами других клиентов
 * @description Хранит список всех видимых звёзд в галактике и предоставляет
 * методы для их добавления и удаления при подключении/отключении клиентов
 */
const useStarsStore = create<StarsState>((set) =>
({
    stars: [],
    add: (star) => set((state) => ({ stars: [...state.stars, star] })),
    remove: (star) => set((state) => ({ stars: state.stars.filter((s) => s !== star) })),
}));

export default useStarsStore;