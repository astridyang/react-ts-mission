import { useProjectIdInUrl } from "../kanban/util";

export const useEpicSearchParam = () => ({ projectId: useProjectIdInUrl() });
export const useEpicQueryKey = () => ["epics", useEpicSearchParam()];
