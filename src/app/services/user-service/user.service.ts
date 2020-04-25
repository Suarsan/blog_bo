import { Injectable } from '@angular/core';
import { UserDaoService } from 'src/app/dao/user-dao-service/user-dao.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userDaoService: UserDaoService) { }

  public signin(email, password) {
    return this.userDaoService.signin(email, password).pipe();
  }

  public signup(email, password, firstname, lastname) {
    return this.userDaoService.signup(email, password, firstname, lastname).pipe();
  }
}
