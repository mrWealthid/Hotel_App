import { useQuery } from "@tanstack/react-query";

export function useAutoComplete(
  search: string,
  service: any,
  queryKey: string = ""
) {
  const { isLoading, data, error, isRefetching } = useQuery({
    queryKey: ["search" + queryKey + search],
    queryFn: () => service(search),
    keepPreviousData: true,
  });

  return {
    isRefetching,
    autoCompleteLoading: isLoading,
    autoCompleteError: error,
    autoCompleteResult: data?.data,
  };
}
