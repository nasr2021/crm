import { getClients } from "@/services/clientService";
import { useQuery } from "@tanstack/react-query";

export function useClients({
  search,
  page,
  limit,
  sort,
  order,
}: {
  search?: string;
  page?: string;
  limit?: string;
  sort?: string;
  order?: string;
}) {
  return useQuery({
    queryKey: ["clients", search, page, limit, sort, order],
    queryFn: () => getClients({
      search,
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      sort: sort || "name",
      order: order || "asc",
    }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}