/* eslint-disable */
/* tslint:disable */
import { HttpClient } from './http-client'

export class Api<SecurityDataType = unknown> {
   constructor(private http: HttpClient<SecurityDataType>) {}

   abc1 = () => this.http.request()
   abc2 = () => this.http.request()
   abc3 = () => this.http.request()
}
