import {MessageBoardClientService} from "./message-board-client.service";
import {Injectable} from "@angular/core";
import {map, of, switchMap} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  private prefs?: any;

  constructor(private client: MessageBoardClientService) {  }

  public init() {
    return this.client
      .getPreferences()
      .pipe(map((res:any)=> {
        this.prefs = res;
        return 'preferences-service initialized';
      }));
  }

  get preferences () {
    if (this.prefs)
      return this.prefs;
    throw new Error("NEED PREFERENCES... has the preferences-service been initialized?")
  }
}
