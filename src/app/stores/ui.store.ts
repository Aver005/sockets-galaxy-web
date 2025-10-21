/**
 * @fileoverview Zustand store для управления состоянием UI
 * @description Управляет видимостью элементов пользовательского интерфейса
 */

import { create } from 'zustand';

/**
 * Интерфейс состояния UI
 * @interface UIState
 */
interface UIState
{
    /** Флаг скрытия UI элементов */
    hiddenUI: boolean;
    /** Функция переключения видимости UI */
    switchUI: (hiddenUI: boolean) => void;
}

/**
 * Zustand store для управления состоянием пользовательского интерфейса
 * @description Контролирует видимость UI элементов приложения.
 * Позволяет скрывать/показывать интерфейс для полноэкранного просмотра галактики.
 */
const useUIStore = create<UIState>((set) =>
({
    hiddenUI: true,
    switchUI: (hiddenUI: boolean) => set({ hiddenUI }),
}));

export default useUIStore;