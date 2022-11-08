import { Injectable, isDevMode } from '@angular/core';
import { UserDaoService } from 'src/app/dao/user-dao-service/user-dao.service';
import { tap, map } from 'rxjs/internal/operators';
import { SignIn } from 'src/app/types/signIn.type';
import { Author } from '../../types/author.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userDaoService: UserDaoService) { }

  public signIn(email, password): Observable<Author> {
    return this.userDaoService.signIn(email, password).pipe<Author, Author>(
      tap((res: Author) => isDevMode() ? console.dir(res) : null),
      map((res: Author) => res)
    );
  }

  public signup(email, password, firstname, lastname) {
    return this.userDaoService.signup(email, password, firstname, lastname).pipe(
      tap((res: Author) => isDevMode() ? console.dir(res) : null),
      map((res: Author) => res)
    );
  }
}
