import { Injectable, isDevMode } from '@angular/core';
import { PostDaoService } from '../../dao/post-dao-service/post-dao.service';
import { UserStorageService } from '../user-storage-service/user-storage.service';
import { map, tap } from 'rxjs/internal/operators';
import { Subject } from 'rxjs/internal/Subject';
import { Post } from 'src/app/types/post.type';
import { PostType } from 'src/app/types/post-type.type';
import { Tag } from 'src/app/types/tag.type';
import { HtmlTag } from '../../types/html-tag.type';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private refreshPostsListener = new Subject<any>();

  constructor(private postDaoService: PostDaoService,
              private userStorageService: UserStorageService) { }

  public getPosts() {
    return this.postDaoService.getPosts().pipe(
      tap(res => isDevMode() ? console.dir(res) : null),
      map(res => res['getPosts'])
    );
  }
  public getPostBySlug(slug) {
    return this.postDaoService.getPostBySlug(slug).pipe(
      tap((res: Post) => isDevMode() ? console.dir(res) : null),
      map((res: Post) => res)
    );
  }
  public getPostTypes() {
    return this.postDaoService.getPostTypes().pipe(
      tap((res: PostType[]) => isDevMode() ? console.dir(res) : null),
      map((res: PostType[]) => res)
    );
  }
  public getTags() {
    return this.postDaoService.getTags().pipe(
      tap((res: Tag[]) => isDevMode() ? console.dir(res) : null),
      map((res: Tag[]) => res)
    );
  }
  public getHtmlTags() {
    return this.postDaoService.getHtmlTags().pipe(
      tap((res: HtmlTag[]) => isDevMode() ? console.dir(res) : null),
      map((res: HtmlTag[]) => res)
    );
  }
  public addPost(postForm, paragraphsForm, analysisForm) {
    const paragraphs = [];
    for (const paragraph of paragraphsForm.controls) {
      const p = {
        content: paragraph.controls.content.value,
        htmlTag: paragraph.controls.htmlTag.value,
        classes: paragraph.controls.classes.value,
        position: paragraph.controls.position.value,
      };
      paragraphs.push(p);
    }
    const analysis = {
      score: analysisForm.get('score').value,
      pros: analysisForm.get('pros').value,
      cons: analysisForm.get('cons').value
    };
    return this.postDaoService.addPost(
      this.userStorageService.getContext().context,
      postForm.get('type').value,
      postForm.get('image').value,
      postForm.get('title').value,
      postForm.get('slug').value,
      postForm.get('metaTitle').value,
      postForm.get('metaDescription').value,
      postForm.get('readtime').value,
      postForm.get('tags').value,
      postForm.get('parent').value ? postForm.get('parent').value.id : null,
      analysis,
      paragraphs
    ).pipe(
      tap((res: Post) => isDevMode() ? console.dir(res) : null),
      map((res: Post) => res)
    );
  }
  public updatePost(postForm, paragraphsForm, analysisForm) {
    const paragraphs = [];
    for (const paragraph of paragraphsForm.controls) {
      const p = {
        content: paragraph.controls.content.value,
        htmlTag: paragraph.controls.htmlTag.value,
        classes: paragraph.controls.classes.value,
        position: paragraph.controls.position.value,
      };
      paragraphs.push(p);
    }

    const analysis = {
      score: analysisForm.get('score').value,
      pros: analysisForm.get('pros').value,
      cons: analysisForm.get('cons').value
    };
    return this.postDaoService.updatePost(
      this.userStorageService.getContext().context,
      postForm.get('type').value,
      postForm.get('image').value,
      postForm.get('title').value,
      postForm.get('slug').value,
      postForm.get('metaTitle').value,
      postForm.get('metaDescription').value,
      postForm.get('readtime').value,
      postForm.get('tags').value,
      postForm.get('parent').value ? postForm.get('parent').value.id : null,
      analysis,
      paragraphs
    ).pipe(
      tap((res: Post) => isDevMode() ? console.dir(res) : null),
      map((res: Post) => res)
    );
  }

  public deletePost(slug) {
    return this.postDaoService.deletePost(
      this.userStorageService.getContext().context, slug).pipe(
        tap(res => isDevMode() ? console.dir(res) : null),
        map(res => res['data']['deletePost'])
      );
  }

  public listenRefreshPosts() {
    return this.refreshPostsListener.asObservable();
  }
  public refreshPosts() {
    this.refreshPostsListener.next();
  }
}
