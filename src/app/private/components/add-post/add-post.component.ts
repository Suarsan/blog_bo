import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post-service/post.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { tap, catchError } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { PostType } from 'src/app/types/post-type.type';
import { Tag } from 'src/app/types/tag.type';
import { HtmlTag } from 'src/app/types/html-tag.type';
import { Category } from '../../../types/category.type';
import { Post } from 'src/app/types/post.type';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  saving: boolean;
  htmltags: HtmlTag[];
  types: PostType[];
  tags: Tag[];
  categories: Category[];
  parents: Post[];
  paragraphsForm = new FormArray([]);
  postForm = new FormGroup({
    type: new FormControl(),
    image: new FormControl(),
    title: new FormControl(),
    slug: new FormControl(),
    metaTitle: new FormControl(),
    metaDescription: new FormControl(),
    tags: new FormControl([]),
    selectedTag: new FormControl(),
    readtime: new FormControl(),
    parent: new FormControl()
  });
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
              private router: Router) { }

  ngOnInit(): void {
    this._getTypes();
    this._getHtmlTags();
    this._getTags();
    this._getParents();
  }

  public addPost() {
    this.saving = true;
    this.postService.addPost(this.postForm, this.paragraphsForm, this.analysisForm).pipe(
      tap(res => this.router.navigate(['/'])),
      catchError(err => {
        console.dir(err);
        this.saving = false;
        return EMPTY;
      })
    ).subscribe();
  }

  public deleteParagraph(p) {

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

  private _getTypes() {
    this.postService.getPostTypes().pipe(
      tap((res: PostType[]) => this.types = res),
      tap((res: PostType[]) => this._setDefaultType(res))
    ).subscribe();
  }

  private _getHtmlTags() {
    this.postService.getHtmlTags().pipe(
      tap((res: Tag[]) => this.htmltags = res),
      tap((res: Tag[]) => this._setDefaultHtmltag(res))
    ).subscribe();
  }

  private _getParents() {
    this.postService.getPosts().pipe(
      tap((res: Post[]) => this.parents = res)
    ).subscribe();
  }

  private _setDefaultType(data: PostType[]) {
    this.postForm.patchValue({ type: data[0] });
  }

  private _setDefaultHtmltag(data: Tag[]) {
    this.addParagraphForm.patchValue({ htmlTag: data[0] });
  }

  compareFn(c1, c2): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
