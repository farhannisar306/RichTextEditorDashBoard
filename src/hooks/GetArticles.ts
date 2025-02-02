import { useQuery } from '@tanstack/react-query'
import { QueryService } from '../Services/QueryService'

export const GetArticles = () => {
  const { isLoading, isError, data: rawData, error } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['articles'],
    queryFn: () => QueryService({ 
      QueryURL: "https://devtalks-backend.onrender.com/api/v1/articles", 
      Method: "GET", 
      Body: undefined 
    }),
  })

  const data = rawData ? {
    data: rawData.data.articles,
    pagination: rawData.data.pagination
  } : null;

  data && console.log(data.data)
  return { isLoading, isError, data, error };
}