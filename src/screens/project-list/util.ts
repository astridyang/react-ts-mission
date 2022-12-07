import { useSetUrlSearchParam, useUrlQueryParam } from "../../utils/url";
import { useMemo } from "react";
import { useProject } from "../../utils/project";

export const useProjectsSearchParam = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParam();
  return ["projects", params];
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const open = () => setProjectCreate({ projectCreate: true });
  const setUrlParams = useSetUrlSearchParam();
  const close = () => {
    setUrlParams({ projectCreate: "", editingProjectId: "" });
  };

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    projectCreate,
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};