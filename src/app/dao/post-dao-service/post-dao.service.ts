import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/internal/operators';
import { GetPostBySlug } from 'src/app/types/getPostBySlug.type';
import { GetPostTypes } from 'src/app/types/getPostTypes.type';
import { GetTags } from 'src/app/types/getTags.type';
import { GetHtmlTags } from 'src/app/types/getHtmlTags.type';
import { AddPost } from '../../types/addPost.type';
import { UpdatePost } from 'src/app/types/updatePost.type';

@Injectable({
  providedIn: 'root'
})
export class PostDaoService {

  constructor(private apollo: Apollo) { }

  public getPosts() {
    const getPosts = gql`
      query getPosts{
        getPosts {
          id
          createdAt
          updatedAt
          slug
          title
          metaTitle
          metaDescription
          image
          readTime
          type{
            id
          }
          parent {
            slug
          }
          paragraphs{
            id
          }
        }
      }
    `;
    return this.apollo.watchQuery({
      query: getPosts
    }).valueChanges.pipe( map(result => result.data));
  }

  public getPostBySlug(slug) {
    const getPostBySlug = gql`
      query getPostBySlug($slug: String!){
        getPostBySlug(slug: $slug) {
          slug
          title
          image
          metaTitle
          metaDescription
          readTime
          type{
            id
            content
          }
          analysis{
            score
            pros
            cons
          }
          tags {
            id
            content
          }
          paragraphs{
            id
            content
            classes
            position
            htmlTag{
              id
              content
            }
          }
          parent {
            id
            title
          }
        }
      }
    `;
    return this.apollo.watchQuery<GetPostBySlug>({
      query: getPostBySlug,
      variables: {slug}
    }).valueChanges.pipe( map(result => result.data.getPostBySlug));
  }

  public getPostTypes() {
    const getPostTypes = gql`
      query getPostTypes{
        getPostTypes {
          id
          content
        }
      }
    `;
    return this.apollo.watchQuery<GetPostTypes>({query: getPostTypes}).valueChanges.pipe( map(result => result.data.getPostTypes));
  }

  public getTags() {
    const getTags = gql`
      query getTags{
        getTags {
          id
          content
        }
      }
    `;
    return this.apollo.watchQuery<GetTags>({query: getTags}).valueChanges.pipe( map(result => result.data.getTags));
  }

  public getHtmlTags() {
    const getHtmlTags = gql`
      query getHtmlTags{
        getHtmlTags {
          id
          content
        }
      }
    `;
    return this.apollo.watchQuery<GetHtmlTags>({query: getHtmlTags}).valueChanges.pipe( map(result => result.data.getHtmlTags));
  }

  public addPost(context, type, image, title, slug, metaTitle, metaDescription, readTime, tags, parentId, analysis, paragraphs) {
    const addPostInput = { context, type, image, title, slug, metaTitle, metaDescription, readTime, tags, parentId, analysis, paragraphs };
    const addPost = gql`
      mutation addPost($addPostInput: AddPostInput!){
        addPost(addPostInput: $addPostInput) {
          id
        }
      }
    `;
    return this.apollo.mutate<AddPost>({
      mutation: addPost,
      variables: {addPostInput}
    }).pipe( map(result => result.data.addPost));
  }

  public updatePost(context, type, image, title, slug, metaTitle, metaDescription, readTime, tags, parentId, analysis, paragraphs) {
    const updatePostInput = { context, type, image, title, slug, metaTitle, metaDescription, readTime, tags, parentId, analysis, paragraphs };
    const updatePost = gql`
      mutation updatePost($updatePostInput: UpdatePostInput!){
        updatePost(updatePostInput: $updatePostInput) {
          id
        }
      }
    `;
    return this.apollo.mutate<UpdatePost>({
      mutation: updatePost,
      variables: {updatePostInput}
    }).pipe( map(result => result.data.updatePost));
  }

  public deletePost(context, slug) {
    const deletePostInput = { context, slug };
    const deletePost = gql`
      mutation deletePost($deletePostInput: DeletePostInput!){
        deletePost(deletePostInput: $deletePostInput) {
          slug
        }
      }
    `;
    return this.apollo.mutate<any>({
      mutation: deletePost,
      variables: {deletePostInput}
    }).pipe( map(result => result));
  }

}
