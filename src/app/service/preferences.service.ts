import {MessageBoardClientService} from "./message-board-client.service";
import {EventEmitter, Injectable} from "@angular/core";
import {tap} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  private prefs?: any;

  constructor(private client: MessageBoardClientService) {  }

  public init() {
    return this.client
      .getPreferences()
      .pipe(tap((res:any)=> {
        this.prefs = res;
      }));
  }

  get preferences () {
    if (this.prefs)
      return this.prefs;
    throw new Error("NEED PREFERENCES NOW.")
  }
}
