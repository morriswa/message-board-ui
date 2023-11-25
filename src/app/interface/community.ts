
interface Community {
  communityId:number;
  communityLocator:string;
  displayName:string;
  ownerId:string;
  dateCreated:Date;
  communityMemberCount:number;
}

export interface CommunityResponse extends Community {
  resourceUrls: {
    icon:string;
    banner:string;
  }
}

export interface CommunityMembership {
  exists:boolean;
  userId:string;
  communityId:number;
  standing?:string;
}
