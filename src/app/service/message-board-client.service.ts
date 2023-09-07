import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MessageBoardClientService {
  MESSAGE_BOARD_SERVICE_ENDPOINT= environment.api+'v0/';

  constructor(private http: HttpClient) { }

  registerUser(email: string, displayName: string) {
    return this.http.post(this.MESSAGE_BOARD_SERVICE_ENDPOINT+'user',{},{
      params: {
        email: email,
        displayName: displayName
      }
    });
  }

  getUserProfile() {
    return this.http.get(this.MESSAGE_BOARD_SERVICE_ENDPOINT+'user')
      .pipe(map((response:any)=>response.payload));
  }

  updateProfileImage(newProfileObject:{baseEncodedImage:string, imageFormat:string}) {
    return this.http.post(this.MESSAGE_BOARD_SERVICE_ENDPOINT+'user/profileImage',newProfileObject)
      .pipe(map((response:any)=>response.payload));
  }

  updateDisplayName(newDisplayName:string) {
    return this.http.patch(this.MESSAGE_BOARD_SERVICE_ENDPOINT+'user/displayName', {},{
      params: {
        requestedDisplayName: newDisplayName
      }
    });
  }

  createImagePostToCommunity(communityId:number, caption:string, description:string, content:any) {

    const PATH_PARAMS = 'community/' + communityId + '/post';

    return this.http.post(this.MESSAGE_BOARD_SERVICE_ENDPOINT + PATH_PARAMS, {
      caption:caption,
      description:description,
      contentType:"PHOTO",
      content:content
    }).pipe();
  }

  getFeedForCommunity(communityId:number) {

    const PATH_PARAMS = 'community/' + communityId + '/feed';

    return this.http.get(this.MESSAGE_BOARD_SERVICE_ENDPOINT + PATH_PARAMS)
      .pipe();
  }

  getCommunityInfo(displayName: string) {
    return this.http.get(this.MESSAGE_BOARD_SERVICE_ENDPOINT + 'community',{
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

    return this.http.post(this.MESSAGE_BOARD_SERVICE_ENDPOINT + PATH_PARAMS,{});
  }

  leaveCommunity(communityId:string) {
    const PATH_PARAMS = 'community/' + communityId + '/membership';

    return this.http.delete(this.MESSAGE_BOARD_SERVICE_ENDPOINT + PATH_PARAMS,{}).pipe();
  }

  updateCommunityIcon(communityId: number, newProfileObject:{baseEncodedImage:string, imageFormat:string}) {
    const PATH_PARAMS = 'community/'+communityId+'/icon';

    return this.http.post(this.MESSAGE_BOARD_SERVICE_ENDPOINT+PATH_PARAMS,newProfileObject)
      .pipe(map((response:any)=>response.payload));
  }

  updateCommunityBanner(communityId:number, newProfileObject:{baseEncodedImage:string, imageFormat:string}) {
    const PATH_PARAMS = 'community/'+communityId+'/banner';

    return this.http.post(this.MESSAGE_BOARD_SERVICE_ENDPOINT+PATH_PARAMS,newProfileObject)
      .pipe(map((response:any)=>response.payload));
  }

  createCommunity(communityRef:string, communityDisplayName:string) {
    return this.http.post(this.MESSAGE_BOARD_SERVICE_ENDPOINT+'community',{
      communityRef:communityRef,
      communityName:communityDisplayName
    })
      .pipe(map((response:any)=>response.payload));
  }
}
