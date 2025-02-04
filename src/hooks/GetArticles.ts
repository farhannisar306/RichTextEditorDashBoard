import { useQuery } from '@tanstack/react-query'
import { QueryService } from '../Services/QueryService'
import { base_url } from '../static/data'

export const GetArticles = () => {
  const { isLoading, isError, data: rawData, error } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['articles'],
    queryFn: () => QueryService({ 
      QueryURL: `${base_url}/articles`, 
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