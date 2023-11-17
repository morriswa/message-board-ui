import {FormControl, Validators} from "@angular/forms";

export class Utils {
  public static file2Base64(file:any):Promise<string> {
    return new Promise<string>(
      (resolve,reject)=> {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result?.toString() || '');
        reader.onerror = error => reject(error);
      });
  }

  public static displayNameForm = new FormControl('',
    [
      Validators.required,
      Validators.maxLength(30),
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z0-9._-]*$')
    ]);

  public static communityRefForm = new FormControl('',
    [
      Validators.maxLength(30),
      Validators.minLength(3),
      Validators.pattern("^[a-z][a-z0-9-]*[a-z0-9]$")
    ]);

  public static communityDisplayNameForm = new FormControl('',
    [
      Validators.maxLength(100),
      Validators.minLength(3),
    ]);

}
