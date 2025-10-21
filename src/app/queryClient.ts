/**
 * @fileoverview Конфигурация React Query клиента
 * @description Создает и экспортирует настроенный экземпляр QueryClient для управления серверным состоянием
 */

import { QueryClient } from "react-query";

/**
 * Экземпляр React Query клиента
 * @description Используется для кэширования, синхронизации и обновления серверного состояния
 * в приложении. Предоставляет возможности для выполнения запросов, мутаций и управления кэшем.
 */
const queryClient = new QueryClient();

export default queryClient;