import { useHttp } from "./http";
import { User } from "../types/user";
import { useQuery } from "react-query";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  // 数组的元素变化时会重新发起请求
  return useQuery<User[]>(["users", param], () =>
    client("users", { data: param })
  );
};
