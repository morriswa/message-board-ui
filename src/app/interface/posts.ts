
export interface PostResponse {
  postId:number;
  userId:string;
  displayName:string;
  vote:number;
  caption:string;
  description:string;
  contentType:'TEXT'|'PHOTO'|'PHOTO_GALLERY';
  dateCreated:Date;
  resources:string[];
}

export interface PostCommentResponse extends PostResponse {
  comments:Comment[];
}

export interface PostCommunityResponse extends PostResponse {
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
  displayName:string;
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
