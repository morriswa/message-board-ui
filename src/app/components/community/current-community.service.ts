import {Injectable} from "@angular/core";
import {CommunityMembership, CommunityResponse} from "../../interface/community";


@Injectable({
  providedIn: 'root'
})
export class CurrentCommunityService {

  private _community?: CommunityResponse;
  private _membership?: CommunityMembership;

  init(config:{community?: CommunityResponse, membership?: CommunityMembership}) {
    if (config.community) this._community = config.community;
    if (config.membership) this._membership = config.membership;
  }

  reset() {
    this._membership = undefined;
    this._community = undefined;
  }

  get initialized(): boolean {
    return !!(this._community && this._membership);
  }

  get community() {
    if (!this.initialized) throw new Error("No community currently cached!");
    return this._community!
  }

  get membership() {
    if (!this.initialized) throw new Error("No community currently cached!");
    return this._membership!
  }

  get id() {
    return this.community.communityId
  }

  get locator() {
    return this.community.communityLocator
  }

  get isCommunityOwner(): boolean {
    return this.membership.userId === this.community.ownerId;
  }

  get isCommunityMember(): boolean {
    return this.isCommunityOwner || this.membership.exists;
  }
 
  get isCommentMod(): boolean {
    return this.isCommunityOwner || (
      this.membership.standing?
        this.membership.standing.weight >= 5
      :
        false);
  }

  get isContentMod(): boolean {
    return this.isCommunityOwner || (
      this.membership.standing?
        this.membership.standing.weight >= 10
      :
        false);
  }

  get isEditMod(): boolean {
    return this.isCommunityOwner || (
      this.membership.standing?
        this.membership.standing.weight >= 15 
      :
        false);
  }

  get isPromoterMod(): boolean {
    return this.isCommunityOwner || (
      this.membership.standing?
        this.membership.standing.weight >= 20
      :
        false);
  }

}
