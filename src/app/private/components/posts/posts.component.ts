import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post-service/post.service';
import { map, take } from 'rxjs/internal/operators';
import { tap } from 'rxjs/internal/operators/tap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.listenRefreshPosts();
    this.getPosts();
  }

  public getPosts() {
    this.postService.getPosts().pipe(
      take(1),
      map(res => this.posts = res)
    ).subscribe();
  }

  public getType(typeId) {
    switch (typeId) {
      case '1':
        return 'fas fa-microscope blue';
      case '4':
        return 'fas fa-folder-open yellow';
    }
  }

  public listenRefreshPosts() {
    this.postService.listenRefreshPosts().pipe(
      take(1),
      tap(res => this.getPosts())
    ).subscribe();
  }
  public deletePost(post, e) {
    e.stopPropagation();
    this.postService.deletePost(post.slug).pipe(
      take(1),
      tap(res => this.postService.refreshPosts())
    ).subscribe();
  }
}
