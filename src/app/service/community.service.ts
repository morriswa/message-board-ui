import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  public COMMUNITY_SERVICE_ENDPOINT = environment.communityService;

  constructor(private http: HttpClient) { }

  getCommunityInfo(displayName: string) {
    return this.http.get(this.COMMUNITY_SERVICE_ENDPOINT + 'community',{
      params: {
        displayName:displayName
      }
    }).pipe(map((response:any)=>{
      console.log(response.message);
      return response.payload;
    }))
  }

  joinCommunity(communityId:string) {
    const PATH_PARAMS = 'community/' + communityId + '/membership';

    return this.http.post(this.COMMUNITY_SERVICE_ENDPOINT + PATH_PARAMS,{}).pipe();
  }

  leaveCommunity(communityId:string) {
    const PATH_PARAMS = 'community/' + communityId + '/membership';

    return this.http.delete(this.COMMUNITY_SERVICE_ENDPOINT + PATH_PARAMS,{}).pipe();
  }

  updateCommunityIcon(communityId: number, newProfileObject:{baseEncodedImage:string, imageFormat:string}) {
    const PATH_PARAMS = 'community/'+communityId+'/icon';

    return this.http.post(this.COMMUNITY_SERVICE_ENDPOINT+PATH_PARAMS,newProfileObject)
      .pipe(map((response:any)=>response.payload));
  }

  updateCommunityBanner(communityId:number, newProfileObject:{baseEncodedImage:string, imageFormat:string}) {
    const PATH_PARAMS = 'community/'+communityId+'/banner';

    return this.http.post(this.COMMUNITY_SERVICE_ENDPOINT+PATH_PARAMS,newProfileObject)
      .pipe(map((response:any)=>response.payload));
  }
}
