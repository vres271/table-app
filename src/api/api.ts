import { IItem } from "../components/TableEditor/model";

export const API_URL = 'https://jsonplaceholder.typicode.com';
export enum EntityRout {
  Posts = 'posts',
  Users = 'users',
  ToDos = 'todos',
}
export enum ApiMethod {
  get = 'GET',
  post = 'POST',
  patch = 'PATCH',
  delete = 'DELETE',
}

function request<T>(fullPath: string, method: ApiMethod = ApiMethod.get, payload?:any):Promise<T> {

  let options: RequestInit = {};
  switch (method) {
    case ApiMethod.post:
    case ApiMethod.patch:
      options = {
        method,
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json; charset=UTF-8"	
        }
      }  
      break;
    case ApiMethod.delete:
      options = {
        method,
        headers: {
          "Content-type": "application/json; charset=UTF-8"	
        }
      }  
      break;
    default:
      break;
  }

  return fetch(`${API_URL}/${fullPath}`, options).then(response => response.json());
}

export const getApi = (path: EntityRout) => ({
  get: () => request<IItem[]>(path),
  getById: (id: number) => request<IItem>(`${path}/${id}`),
  update: ( item: IItem) => request<IItem>(`${path}/${item.id}`, ApiMethod.patch, item),
  delete: ( id: number) => request<{}>(`${path}/${id}`, ApiMethod.delete),
})