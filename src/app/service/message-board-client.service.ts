import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MessageBoardClientService {
  public SERVICE_PATH= `${environment.api}/${environment.securepath}`;

  constructor(private http: HttpClient) { }

  registerUser(displayName: string) {
    return this.http.post(`${this.SERVICE_PATH}/user`,{},{
      params: {
        displayName: displayName
      }
    })
    .pipe(map((response:any)=>response.payload));
  }

  getUserProfile() {
    return this.http.get(`${this.SERVICE_PATH}/user`)
    .pipe(map((response:any)=>response.payload));
  }

  updateProfileImage(content:any) {
    let postBody = new FormData();
    postBody.append("image",content)

    return this.http.post(`${this.SERVICE_PATH}/user/profileImage`,postBody)
    .pipe(map((response:any)=>response.payload));
  }

  updateDisplayName(newDisplayName:string) {
    return this.http.patch(`${this.SERVICE_PATH}/user/displayName`, {},{
      params: {
        displayName: newDisplayName
      }
    })
    .pipe(map((response:any)=>response.payload));
  }

  createPostDraft(communityId:number, caption:string, description:string) {
    return this.http.post(`${this.SERVICE_PATH}/community/${communityId}/draft`, {}, {params : {
        caption: caption,
        description: description
      }}).pipe(map((response:any)=>response.payload));
  }

  addContentToDraft(draftId:string, content:any) {
    let postBody = new FormData();
    postBody.append("content",content)

    return this.http.post(`${this.SERVICE_PATH}/draft/${draftId}/add`, postBody)
      .pipe(map((response:any)=>response.payload));
  }

  postDraft(draftId:string) {
    return this.http.post(`${this.SERVICE_PATH}/draft/${draftId}`, {})
      .pipe(map((response:any)=>response.payload));
  }


  getFeedForCommunity(communityId:number) {
    return this.http.get(`${this.SERVICE_PATH}/community/${communityId}/feed`)
    .pipe(map((response:any)=>response.payload));
  }

  getCommunityInfo(communityLocator: string) {
    return this.http.get(`${this.SERVICE_PATH}/community`,{
      params: {
        communityLocator:communityLocator
      }
    })
    .pipe(map((response:any)=>response.payload));
  }

  getMembership(communityId:string) {
    return this.http.get(`${this.SERVICE_PATH}/community/${communityId}/membership`,{})
      .pipe(map((response:any)=>response.payload));
  }

  joinCommunity(communityId:string) {
    return this.http.post(`${this.SERVICE_PATH}/community/${communityId}/membership`,{})
    .pipe(map((response:any)=>response.payload));
  }

  leaveCommunity(communityId:string) {
    return this.http.delete(`${this.SERVICE_PATH}/community/${communityId}/membership`,{})
    .pipe(map((response:any)=>response.payload));
  }

  updateCommunityIcon(communityId: number, newCommunityIcon:any) {
    let postBody = new FormData();
    postBody.append("image",newCommunityIcon)

    return this.http.post(`${this.SERVICE_PATH}/community/${communityId}/icon`,postBody)
    .pipe(map((response:any)=>response.payload));
  }

  updateCommunityBanner(communityId:number, newCommunityBanner:any) {
    let postBody = new FormData();
    postBody.append("image",newCommunityBanner)

    return this.http.post(`${this.SERVICE_PATH}/community/${communityId}/banner`,postBody)
    .pipe(map((response:any)=>response.payload));
  }

  createCommunity(communityRef:string, communityDisplayName:string) {
    return this.http.post(`${this.SERVICE_PATH}/community`,{
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

    return this.http.patch(`${this.SERVICE_PATH}/community`, {}, {
      params: params
    })
    .pipe(map((response:any)=>response.payload));
  }

  getUsersCommunities() {
    return this.http.get(`${this.SERVICE_PATH}/communities`)
    .pipe(map((response:any)=>response.payload));
  }

  getUIProfile() {
    return this.http.get(`${this.SERVICE_PATH}/user/ui`)
      .pipe(map((response:any)=>response.payload));
  }

  updateUIProfile(theme: string) {
    return this.http.patch(`${this.SERVICE_PATH}/user/ui`,{
      "theme":theme
    })
    .pipe();
  }

  voteOnPost(postId: number, vote: 'UPVOTE' | 'DOWNVOTE' | 'DELETE') {
    return this.http.post(`${this.SERVICE_PATH}/post/${postId}/vote`,{}, {
      params: {
        vote: vote
      }
    })
    .pipe(map((res:any)=>res.payload));
  }
}
