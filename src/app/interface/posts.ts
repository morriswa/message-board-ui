
interface Post {
  postId:number;
  vote:number;
  caption:string;
  description:string;
  contentType:'TEXT'|'PHOTO'|'PHOTO_GALLERY';
  dateCreated:Date;
  resources:string[];
}

export interface PostUserResponse extends Post {
  userInfo:{
    userId:string;
    displayName:string;
    userProfileImage:string;
  };
}

export interface PostCommentResponse extends PostUserResponse {
  comments:Comment[];
}

export interface PostCommunityResponse extends Post {
  communityInfo: {
    communityId:number;
    communityLocator:string;
    displayName:string;
    icon:string;
  };
}

export interface Comment {
  commentId:number;
  userId:string;
  postId:number;
  parentId?:number;
  body:string;
  vote:number;
  dateCreated:Date;
}

export interface PostDraftResponse {
  draftId:string;
  userId:string;
  communityId:number;
  caption:string;
  description:string;
  contentType:string;
  resources:string[];
}
