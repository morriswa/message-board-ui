import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  public CONTENT_SERVICE_ENDPOINT = environment.contentService;

  constructor(private http: HttpClient) { }

  createImagePostToCommunity(communityId:number, caption:string, description:string, content:any) {

    const PATH_PARAMS = 'community/' + communityId + '/post';

    return this.http.post(this.CONTENT_SERVICE_ENDPOINT + PATH_PARAMS, {
      caption:caption,
      description:description,
      contentType:"PHOTO",
      content:content
    }).pipe();
  }

  getFeedForCommunity(communityId:number) {

    const PATH_PARAMS = 'community/' + communityId + '/feed';

    return this.http.get(this.CONTENT_SERVICE_ENDPOINT + PATH_PARAMS)
      .pipe();
  }



}
