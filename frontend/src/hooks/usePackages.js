import { useQuery } from "@tanstack/react-query";
import { getRecommendedPackages } from "../api/packagesApi";

export const useRecommendedPackages = () => {
  return useQuery({
    queryKey: ["recommended-packages"],
    queryFn: getRecommendedPackages,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

