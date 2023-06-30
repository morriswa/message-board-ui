import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  public USER_PROFILE_SERVICE_ENDPOINT = environment.userProfileService;

  constructor(private http: HttpClient) { }

  registerUser(email: string, displayName: string) {
    return this.http.post(this.USER_PROFILE_SERVICE_ENDPOINT+'user',{},{
      params: {
        email: email,
        displayName: displayName
      }
    });
  }

  getUserProfile() {
    return this.http.get(this.USER_PROFILE_SERVICE_ENDPOINT+'user')
      .pipe(map((response:any)=>response.payload));
  }

  updateProfileImage(newProfileObject:{baseEncodedImage:string, imageFormat:string}) {
    return this.http.post(this.USER_PROFILE_SERVICE_ENDPOINT+'user/profileImage',newProfileObject)
      .pipe(map((response:any)=>response.payload));
  }
}
