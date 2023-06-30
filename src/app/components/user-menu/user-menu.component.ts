import {Component, OnInit} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {UserProfileService} from "../../service/user-profile.service";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  loading = true

  userProfile$:Observable<any>=of();
  public fileUpload?: File;

  public fileInput = new FormControl();

  constructor(private auth: AuthService,
              private users: UserProfileService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userProfile$ = this.users.getUserProfile();
    this.userProfile$
      .subscribe({
        next: user=>{
          console.log(user);
          this.loading = false;
        },
        error: err=>{
          console.error(err)
          this.router.navigate(['/'])
        }
      })
  }

  public onChange($event: any) {
    this.fileUpload = $event.target.files[0];
  }
  public createNewPost() {
    // this.PROCESSING_REQUEST = true;

    if (this.fileUpload != undefined) {
      UserMenuComponent.file2Base64(this.fileUpload).then(b64Repr => {
        let concatb64Repr = b64Repr.slice(b64Repr.indexOf(",") + 1)
        let imageFormat = b64Repr.slice(b64Repr.indexOf("/") + 1, b64Repr.indexOf(";"))

        this.users.updateProfileImage({baseEncodedImage: concatb64Repr,imageFormat: imageFormat})
        .subscribe({
          next: ()=>this.fileInput.reset(),
          error: err=>console.error(err)
        })
      });
    }
  }

  public static file2Base64(file:File):Promise<string> {
    return new Promise<string>(
      (resolve,reject)=> {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result?.toString() || '');
        reader.onerror = error => reject(error);
      });
  }

}
