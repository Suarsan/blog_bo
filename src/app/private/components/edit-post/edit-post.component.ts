import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post-service/post.service';
import { catchError, take } from 'rxjs/internal/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { tap } from 'rxjs/internal/operators/tap';
import { HtmlTag } from 'src/app/types/html-tag.type';
import { PostType } from 'src/app/types/post-type.type';
import { Tag } from 'src/app/types/tag.type';
import { Post } from 'src/app/types/post.type';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  saving: boolean;
  htmltags: HtmlTag[];
  types: PostType[];
  tags: Tag[];
  parents: Post[];
  postSlug: string;
  post: Post;
  postForm = new FormGroup({
    type: new FormControl(),
    image: new FormControl(),
    title: new FormControl(),
    metaTitle: new FormControl(),
    metaDescription: new FormControl(),
    slug: new FormControl({ value: null, disabled: true}),
    tags: new FormControl([]),
    selectedTag: new FormControl(),
    parent: new FormControl(),
    readtime: new FormControl()
  });
  paragraphsForm = new FormArray([]);
  analysisForm = new FormGroup({
    score: new FormControl(),
    pros: new FormControl(),
    cons: new FormControl()
  });
  addParagraphForm = new FormGroup({
    content: new FormControl(),
    htmlTag: new FormControl(),
    classes: new FormControl(),
    position: new FormControl()
  });

  constructor(private postService: PostService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.postSlug = this.activatedRoute.snapshot.params.postslug;
    this._getPostBySlug(this.postSlug);
    this._getTypes();
    this._getHtmlTags();
    this._getTags();
    this._getParents();
  }

  public updatePost() {
    this.saving = true;
    this.postService.updatePost(this.postForm, this.paragraphsForm, this.analysisForm).pipe(
      tap(res => this.router.navigate(['/'])),
      catchError(err => {
        console.dir(err);
        this.saving = false;
        return EMPTY;
      })
    ).subscribe();
  }

  public addParagraph() {
    if (this.addParagraphForm.get('content').value) {
      this.paragraphsForm.push(new FormGroup({
        htmlTag: new FormControl(this.addParagraphForm.get('htmlTag').value),
        classes: new FormControl(this.addParagraphForm.get('classes').value),
        content: new FormControl(this.addParagraphForm.get('content').value),
        position: new FormControl(this.addParagraphForm.get('position').value)
      }));
    }
  }

  public deleteParagraph(index) {
    this.paragraphsForm.controls.splice(index, 1);
  }

  private _getPostBySlug(slug) {
    this.postService.getPostBySlug(slug).pipe(
      take(1),
      tap(res => this.post = res),
      tap(res => this._setEditPostForm(this.post)),
    ).subscribe();
  }

  private _setEditPostForm(data) {
    this.postForm.patchValue({
      image: data.image,
      title: data.title,
      slug: data.slug,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      readtime: data.readTime,
      type: data.type,
      tags: data.tags || [],
      parent: data.parent
    });

    if (data.analysis) {
      this.analysisForm.patchValue({
        score: data.analysis.score,
        pros: data.analysis.pros,
        cons: data.analysis.cons
      });
    }
    if (data.paragraphs) {
      for (const paragraph of data.paragraphs) {
        this.paragraphsForm.push(new FormGroup({
          content: new FormControl(paragraph.content),
          htmlTag: new FormControl(paragraph.htmlTag),
          classes: new FormControl(paragraph.classes),
          position: new FormControl(paragraph.position)
        }));
      }
    }
  }

  private _getTypes() {
    this.postService.getPostTypes().pipe(
      tap((res: PostType[]) => this.types = res)
    ).subscribe();
  }

  public onAddTag() {
    const tags = this.postForm.get('tags').value;
    if (!tags.find(t => t.id === this.postForm.get('selectedTag').value.id) ) {
      tags.push(this.postForm.get('selectedTag').value);
    }
    this.postForm.patchValue({ tags });
  }

  public onDeleteTag(tag) {
    const tags = this.postForm.get('tags').value;
    const index = tags.findIndex(t => t.id === tag.id);
    if (index >= 0) {
      tags.splice(index, 1);
    }
    this.postForm.patchValue({ tags });
  }

  private _getTags() {
    this.postService.getTags().pipe(
      tap((res: Tag[]) => this.tags = res)
    ).subscribe();
  }
  private _getParents() {
    this.postService.getPosts().pipe(
      tap((res: Post[]) => this.parents = res)
    ).subscribe();
  }

  private _getHtmlTags() {
    this.postService.getHtmlTags().pipe(
      tap((res: Tag[]) => this.htmltags = res),
      tap((res: Tag[]) => this._setDefaultHtmltag(res))
    ).subscribe();
  }

  private _setDefaultHtmltag(data: Tag[]) {
    this.addParagraphForm.patchValue({ htmlTag: data[0] });
  }

  compareFn(c1, c2): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
