import { PostType } from './post-type.type';
import { Analysis } from './analysis.type';

export interface Post {
    id: number;
    type: PostType;
    title: string;
    slug: string;
    image: string;
    readtime: string;
    analysis: Analysis;
    parentId: number;
    parent: Post;
}
