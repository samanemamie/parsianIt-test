import { AxiosHeaders, type AxiosInstance, type AxiosResponse } from 'axios'

export async function request<T, B>(
  axiosInstance: AxiosInstance,
  method: 'post' | 'put' | 'patch',
  url: string,
  body: B,
  headers?: AxiosHeaders
): Promise<AxiosResponse<T>> {
  return axiosInstance({
    method,
    url,
    data: body,
    headers: {
      ...headers,
    },
  })
}

export async function fetchData<T>(
  axiosInstance: AxiosInstance,
  url: string,
  headers?: AxiosHeaders
): Promise<AxiosResponse<T>> {
  return axiosInstance.get(url, {
    headers: headers,
  })
}
