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
}
