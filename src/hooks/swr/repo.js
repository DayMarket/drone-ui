// src/hooks/repo.js

import useSWRBase from './use-swr-base';

/**
 * Хук получения одного репозитория по namespace и имени.
 * Оставляем как есть — он используется в интерфейсе.
 */
export const useRepo = ({ namespace, name }) =>
  useSWRBase(`/api/repos/${namespace}/${name}`);

/**
 * ПАТЧ: отключаем вызов /api/user/repos?latest=false
 * Этот хук возвращает пустой массив и не делает fetch.
 * Таким образом drone-ui перестанет опрашивать backend.
 */
export const useLatestRepos = () => {
  return { data: [], error: null, isValidating: false };
};

