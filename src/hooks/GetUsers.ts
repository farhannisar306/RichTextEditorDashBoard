import { useQuery } from '@tanstack/react-query'
import { QueryService } from '../Services/QueryService'

export const GetUsers = () => {
  const { isLoading, isError, data: rawData, error } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['users'],
    queryFn: () => QueryService({
      QueryURL: "https://devtalks-backend.onrender.com/api/v1/user",
      Method: "GET",
      Body: undefined
    }),
  })

  // password shoho kichu vugichugi data filter korbe ei part
  const data = rawData ?
    {
      // ...rawData,
      data: rawData.data?.map((user: any) => {
        const { password, ...safeUserData } = user;
        return safeUserData;
      })
    } : null;
  // data && console.log(data.data)
  return { isLoading, isError, data, error };
}