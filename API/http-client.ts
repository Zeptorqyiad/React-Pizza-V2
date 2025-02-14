/* eslint-disable */
/* tslint:disable */

/** Overrided Promise type. Needs for additional typings of `.catch` callback */
type TPromise<ResolveType, RejectType = any> = Omit<
   Promise<ResolveType>,
   'then' | 'catch'
> & {
   then<TResult1 = ResolveType, TResult2 = never>(
      onfulfilled?:
         | ((value: ResolveType) => TResult1 | PromiseLike<TResult1>)
         | undefined
         | null,
      onrejected?:
         | ((reason: RejectType) => TResult2 | PromiseLike<TResult2>)
         | undefined
         | null
   ): TPromise<TResult1 | TResult2, RejectType>
   catch<TResult = never>(
      onrejected?:
         | ((reason: RejectType) => TResult | PromiseLike<TResult>)
         | undefined
         | null
   ): TPromise<ResolveType | TResult, RejectType>
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
   extends Response {
   data: D
   error: E
}

export class HttpClient<SecurityDataType = unknown> {
   public request = <T = any, E = any>(): TPromise<HttpResponse<T, E>> => {
      return '' as any
   }
}
