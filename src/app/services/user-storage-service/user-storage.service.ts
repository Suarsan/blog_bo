import { Injectable } from '@angular/core';
import { Context } from '../../types/context.type';
import { Author } from '../../types/author.type';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public setAuthor(author: Author) {
    sessionStorage.setItem('a', JSON.stringify(author));
  }

  public getAuthor(): Author {
    return JSON.parse(sessionStorage.getItem('a'));
  }

  public setContext(context: Context) {
    sessionStorage.setItem('b', JSON.stringify(context));
  }

  public getContext(): Context {
    return JSON.parse(sessionStorage.getItem('b'));
  }

}
