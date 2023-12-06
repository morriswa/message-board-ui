import {Injectable} from "@angular/core";
import {CommunityWatcherStatus, CommunityResponse} from "../../interface/community";


@Injectable({
  providedIn: 'root'
})
export class CurrentCommunityService {

  private _community?: CommunityResponse;
  private _watcher?: CommunityWatcherStatus;

  init(config:{community?: CommunityResponse, watcher?: CommunityWatcherStatus}) {
    if (config.community) this._community = config.community;
    if (config.watcher) this._watcher = config.watcher;
  }

  reset() {
    this._watcher = undefined;
    this._community = undefined;
  }

  get initialized(): boolean {
    return !!(this._community && this._watcher);
  }

  get community() {
    if (!this.initialized) throw new Error("No community currently cached!");
    return this._community!
  }

  get watcher() {
    if (!this.initialized) throw new Error("No community currently cached!");
    return this._watcher!
  }

  get id() {
    return this.community.communityId
  }

  get locator() {
    return this.community.communityLocator
  }

  get isCommunityOwner(): boolean {
    return this.watcher.userId === this.community.ownerId;
  }

  get isCommunityMember(): boolean {
    return this.isCommunityOwner || this.watcher.exists;
  }
 
  get isCommentMod(): boolean {
    return this.isCommunityOwner || (
      this.watcher.moderationLevel?
        this.watcher.moderationLevel.weight >= 5
      :
        false);
  }

  get isContentMod(): boolean {
    return this.isCommunityOwner || (
      this.watcher.moderationLevel?
        this.watcher.moderationLevel.weight >= 10
      :
        false);
  }

  get isEditMod(): boolean {
    return this.isCommunityOwner || (
      this.watcher.moderationLevel?
        this.watcher.moderationLevel.weight >= 15 
      :
        false);
  }

  get isPromoterMod(): boolean {
    return this.isCommunityOwner || (
      this.watcher.moderationLevel?
        this.watcher.moderationLevel.weight >= 20
      :
        false);
  }

}
