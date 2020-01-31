import { Comment } from './comment-model';

export interface Bug{
    id:string;
    title ?:string;
    description ?: string;
    priority ?:number;
    reporter ?:string;
    createdAt ?:Date;
    status ?:string;
    comments ?: Comment[];
  }