import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {UserProfile, UserUIProfile} from "../interface/user-profile";
import {
  Comment,
  PostCommunityResponse,
  PostCommentResponse,
  PostDraftResponse,
  PostUserResponse
} from "../interface/posts";
import {CommunityMembership, CommunityResponse} from "../interface/community";


@Injectable({
  providedIn: 'root'
})
export class MessageBoardClientService {
  public SERVICE_PATH= `${environment.api.scheme}://${environment.api.path}`;
  public SECURE_SERVICE_PATH= `${this.SERVICE_PATH}/${environment.api.routes.secure}`;

  constructor(private http: HttpClient) { }


  // test endpoints
  bad() {
    return this.http.get(`${this.SECURE_SERVICE_PATH}/bad`)
      .pipe(map((response:any)=>response.payload));
  }


  // public endpoints
  isHealthy() {
    return this.http.get(`${this.SERVICE_PATH}/health`)
      .pipe(map((response:any)=>response.payload));
  }

  getPreferences() {
    return this.http.get(`${this.SERVICE_PATH}/preferences`).pipe(
      map((res:any)=>res.payload));
  }

  getRecentPosts(): Observable<PostCommunityResponse[]> {
    return this.http.get(`${this.SERVICE_PATH}/feed`)
      .pipe(map((response:any)=>response.payload));
  }


  // user endpoints
  registerUser(displayName: string): Observable<string> {
    return this.http.post(`${this.SECURE_SERVICE_PATH}/user`,{},{
      params: {
        displayName: displayName
      }
    })
    .pipe(map((response:any)=>response.payload));
  }

  getUserProfile(): Observable<UserProfile> {
    return this.http.get(`${this.SECURE_SERVICE_PATH}/user`)
    .pipe(map((response:any)=>response.payload));
  }

  updateProfileImage(content:any): Observable<null> {
    let postBody = new FormData();
    postBody.append("image",content)

    return this.http.post(`${this.SECURE_SERVICE_PATH}/user/profileImage`,postBody)
      .pipe(map((response:any)=>response.payload));
  }

  updateDisplayName(newDisplayName:string):Observable<null> {
    return this.http.patch(`${this.SECURE_SERVICE_PATH}/user/displayName`, {},{
      params: {
        displayName: newDisplayName
      }
    })
    .pipe(map((response:any)=>response.payload));
  }

  getUIProfile(): Observable<UserUIProfile> {
    return this.http.get(`${this.SECURE_SERVICE_PATH}/user/ui`)
      .pipe(map((response:any)=>response.payload));
  }

  updateUIProfile(theme: string): Observable<null> {
    return this.http.patch(`${this.SECURE_SERVICE_PATH}/user/ui`,{
      "theme":theme
    })
      .pipe(map((response:any)=>response.payload));
  }


  // post endpoints
  createPostDraft(communityId:number, caption?:string|null, description?:string|null): Observable<string> {

    let params:any = {};

    if (caption != null) params.caption = caption;
    if (description != null) params.description = description;

    return this.http
      .post(`${this.SECURE_SERVICE_PATH}/community/${communityId}/draft`,
      {},
      {params : params})
    .pipe(map((response:any)=>response.payload));
  }

  addContentToDraft(draftId:string, content:any): Observable<null> {
    let postBody = new FormData();
    postBody.append("content",content)

    return this.http.post(`${this.SECURE_SERVICE_PATH}/draft/${draftId}/add`, postBody)
      .pipe(map((response:any)=>response.payload));
  }

  postDraft(draftId:string):Observable<null> {
    return this.http.post(`${this.SECURE_SERVICE_PATH}/draft/${draftId}`, {})
      .pipe(map((response:any)=>response.payload));
  }

  editDraft(draftId: string, caption:string | null, description: string|null): Observable<null> {
    let params:any = {};

    if (caption != null) params.caption = caption;
    if (description != null) params.description = description;

    return this.http.patch(`${this.SECURE_SERVICE_PATH}/draft/${draftId}`, {}, {params : params})
      .pipe(map((response:any)=>response.payload));
  }

  getDraft(draftId: string): Observable<PostDraftResponse> {
    return this.http.get(`${this.SECURE_SERVICE_PATH}/draft/${draftId}`)
      .pipe(map((response:any)=>response.payload));
  }

  getPostDetails(postId: number): Observable<PostCommentResponse> {
    return this.http.get(`${this.SECURE_SERVICE_PATH}/post/${postId}`)
      .pipe(map((response:any)=>response.payload));
  }

  voteOnPost(postId: number, vote: 'UPVOTE' | 'DOWNVOTE' | 'DELETE'): Observable<number> {
    return this.http.post(`${this.SECURE_SERVICE_PATH}/post/${postId}/vote`,{}, {
      params: {
        vote: vote
      }
    })
      .pipe(map((res:any)=>res.payload));
  }


  // community endpoints
  getFeedForCommunity(communityId:number): Observable<PostUserResponse[]> {
    return this.http.get(`${this.SECURE_SERVICE_PATH}/community/${communityId}/feed`)
    .pipe(map((response:any)=>response.payload));
  }

  getCommunityInfo(communityLocator: string): Observable<CommunityResponse> {
    return this.http.get(`${this.SECURE_SERVICE_PATH}/community`,{
      params: {
        communityLocator:communityLocator
      }
    })
    .pipe(map((response:any)=>response.payload));
  }

  getMembership(communityId:number): Observable<CommunityMembership> {
    return this.http.get(`${this.SECURE_SERVICE_PATH}/community/${communityId}/membership`,{})
      .pipe(map((response:any)=>response.payload));
  }

  joinCommunity(communityId:number): Observable<null> {
    return this.http.post(`${this.SECURE_SERVICE_PATH}/community/${communityId}/membership`,{})
    .pipe(map((response:any)=>response.payload));
  }

  leaveCommunity(communityId:number): Observable<null> {
    return this.http.delete(`${this.SECURE_SERVICE_PATH}/community/${communityId}/membership`,{})
    .pipe(map((response:any)=>response.payload));
  }

  updateCommunityIcon(communityId: number, newCommunityIcon:any): Observable<null> {
    let postBody = new FormData();
    postBody.append("image",newCommunityIcon)

    return this.http.post(`${this.SECURE_SERVICE_PATH}/community/${communityId}/icon`,postBody)
    .pipe(map((response:any)=>response.payload));
  }

  updateCommunityBanner(communityId:number, newCommunityBanner:any): Observable<null> {
    let postBody = new FormData();
    postBody.append("image",newCommunityBanner)

    return this.http.post(`${this.SECURE_SERVICE_PATH}/community/${communityId}/banner`,postBody)
    .pipe(map((response:any)=>response.payload));
  }

  createCommunity(communityRef:string, communityDisplayName:string): Observable<null> {
    return this.http.post(`${this.SECURE_SERVICE_PATH}/community`,{
      communityRef:communityRef,
      communityName:communityDisplayName
    })
    .pipe(map((response:any)=>response.payload));
  }

  editCommunityAttributes(communityId: number, communityRef:string, communityDisplayName:string): Observable<null> {

    let params: any = {
      communityId:communityId
    }

    if (communityRef)
      params.communityRef = communityRef

    if (communityDisplayName)
      params.communityDisplayName = communityDisplayName

    return this.http.patch(`${this.SECURE_SERVICE_PATH}/community`, {}, {
      params: params
    })
    .pipe(map((response:any)=>response.payload));
  }

  getUsersCommunities(): Observable<CommunityResponse[]> {
    return this.http.get(`${this.SECURE_SERVICE_PATH}/communities`)
    .pipe(map((response:any)=>response.payload));
  }

  searchCommunities(value: string): Observable<CommunityResponse[]> {
    return this.http.get(`${this.SECURE_SERVICE_PATH}/communities/search`,{
      params : {
        searchText: value
      }
    })
      .pipe(map((response:any)=>response.payload));
  }


  // comment endpoints
  voteOnComment(postId: number, commentId: number, vote: 'UPVOTE' | 'DOWNVOTE' | 'DELETE'): Observable<number> {
    return this.http.post(`${this.SECURE_SERVICE_PATH}/post/${postId}/comment/${commentId}/vote`,{}, {
      params: {
        vote: vote
      }
    })
      .pipe(map((res:any)=>res.payload));
  }

  leaveComment(postId:number, comment: string): Observable<null> {
    return this.http.post(`${this.SECURE_SERVICE_PATH}/post/${postId}/comment`,comment)
      .pipe(map((res:any)=>res.payload));
  }

  getComments(postId: any): Observable<Comment[]> {
    return this.http.get(`${this.SECURE_SERVICE_PATH}/post/${postId}/comment`)
      .pipe(map((res:any)=>res.payload));
  }
}
