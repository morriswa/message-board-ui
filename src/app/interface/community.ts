
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
  standing?:{code:string,weight:number};
  moderationLevel?:{code:string,weight:number};
}

export interface CommunityMod {
  userId:string;
  displayName:string;
  profileImage:URL;
  standing?:{code:string,weight:number};
  moderationLevel?:{code:string,weight:number};
}