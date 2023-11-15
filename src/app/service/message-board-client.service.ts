import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {environment} from "../../environments/environment";
import {UploadImageRequest} from "../interface/upload-image-request";

@Injectable({
  providedIn: 'root'
})
export class MessageBoardClientService {
  MESSAGE_BOARD_SERVICE_ENDPOINT= environment.api+environment.securepath;

  constructor(private http: HttpClient) { }

  registerUser(displayName: string) {
    return this.http.post(this.MESSAGE_BOARD_SERVICE_ENDPOINT+'user',{},{
      params: {
        displayName: displayName
      }
    })
    .pipe(map((response:any)=>response.payload));
  }

  getUserProfile() {
    return this.http.get(this.MESSAGE_BOARD_SERVICE_ENDPOINT+'user')
    .pipe(map((response:any)=>response.payload));
  }

  updateProfileImage(content:any) {
    let postBody = new FormData();
    postBody.append("image",content)

    return this.http.post(this.MESSAGE_BOARD_SERVICE_ENDPOINT+'user/profileImage',postBody)
    .pipe(map((response:any)=>response.payload));
  }

  updateDisplayName(newDisplayName:string) {
    return this.http.patch(this.MESSAGE_BOARD_SERVICE_ENDPOINT+'user/displayName', {},{
      params: {
        displayName: newDisplayName
      }
    })
    .pipe(map((response:any)=>response.payload));
  }

  createImagePostToCommunity(communityId:number, caption:string, description:string, content:any) {

    const PATH_PARAMS = 'community/' + communityId + '/post';

    let postBody = new FormData();
    postBody.append("image",content)

    return this.http.post(this.MESSAGE_BOARD_SERVICE_ENDPOINT + PATH_PARAMS, postBody, {
      params : {
        caption: caption,
        description: description,
        contentType: "PHOTO"
      }
    })
    .pipe(map((response:any)=>response.payload));
  }

  getFeedForCommunity(communityId:number) {

    const PATH_PARAMS = 'community/' + communityId + '/feed';

    return this.http.get(this.MESSAGE_BOARD_SERVICE_ENDPOINT + PATH_PARAMS)
    .pipe(map((response:any)=>response.payload));
  }

  getCommunityInfo(communityLocator: string) {
    return this.http.get(this.MESSAGE_BOARD_SERVICE_ENDPOINT + 'community',{
      params: {
        communityLocator:communityLocator
      }
    })
    .pipe(map((response:any)=>response.payload));
  }

  getMembership(communityId:string) {
    const PATH_PARAMS = 'community/' + communityId + '/membership';

    return this.http.get(this.MESSAGE_BOARD_SERVICE_ENDPOINT + PATH_PARAMS,{})
      .pipe(map((response:any)=>response.payload));
  }

  joinCommunity(communityId:string) {
    const PATH_PARAMS = 'community/' + communityId + '/membership';

    return this.http.post(this.MESSAGE_BOARD_SERVICE_ENDPOINT + PATH_PARAMS,{})
    .pipe(map((response:any)=>response.payload));
  }

  leaveCommunity(communityId:string) {
    const PATH_PARAMS = 'community/' + communityId + '/membership';

    return this.http.delete(this.MESSAGE_BOARD_SERVICE_ENDPOINT + PATH_PARAMS,{})
    .pipe(map((response:any)=>response.payload));
  }

  updateCommunityIcon(communityId: number, newCommunityIcon:any) {
    const PATH_PARAMS = 'community/'+communityId+'/icon';

    let postBody = new FormData();
    postBody.append("image",newCommunityIcon)

    return this.http.post(this.MESSAGE_BOARD_SERVICE_ENDPOINT+PATH_PARAMS,postBody)
    .pipe(map((response:any)=>response.payload));
  }

  updateCommunityBanner(communityId:number, newCommunityBanner:any) {
    const PATH_PARAMS = 'community/'+communityId+'/banner';

    let postBody = new FormData();
    postBody.append("image",newCommunityBanner)

    return this.http.post(this.MESSAGE_BOARD_SERVICE_ENDPOINT+PATH_PARAMS,postBody)
    .pipe(map((response:any)=>response.payload));
  }

  createCommunity(communityRef:string, communityDisplayName:string) {
    return this.http.post(this.MESSAGE_BOARD_SERVICE_ENDPOINT+'community',{
      communityRef:communityRef,
      communityName:communityDisplayName
    })
    .pipe(map((response:any)=>response.payload));
  }

  editCommunityAttributes(communityId: number, communityRef:string, communityDisplayName:string) {

    let params: any = {
      communityId:communityId
    }

    if (communityRef)
      params.communityRef = communityRef

    if (communityDisplayName)
      params.communityDisplayName = communityDisplayName

    return this.http.patch(this.MESSAGE_BOARD_SERVICE_ENDPOINT+ 'community', {}, {
      params: params
    })
    .pipe(map((response:any)=>response.payload));
  }

  getUsersCommunities() {
    return this.http.get(this.MESSAGE_BOARD_SERVICE_ENDPOINT+ 'communities')
    .pipe(map((response:any)=>response.payload));
  }

  getUIProfile() {
    return this.http.get(this.MESSAGE_BOARD_SERVICE_ENDPOINT+ 'user/ui')
      .pipe(map((response:any)=>response.payload));
  }

  updateUIProfile(theme: string) {

    return this.http.patch(this.MESSAGE_BOARD_SERVICE_ENDPOINT+ 'user/ui',{
      "theme":theme
    })
      .pipe();
  }
}
