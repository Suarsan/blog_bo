import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-service/user.service';
import { tap } from 'rxjs/internal/operators/tap';
import { UserStorageService } from '../../../services/user-storage-service/user-storage.service';
import { Author } from '../../../types/author.type';

@Component({
  selector: 'app-signin-card',
  templateUrl: './signin-card.component.html',
  styleUrls: ['./signin-card.component.scss']
})
export class SigninCardComponent implements OnInit {

  signinForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required)
  });

  constructor(private userService: UserService,
              private userStorageService: UserStorageService,
              private router: Router) { }

  ngOnInit() { }

  public signIn() {
    this.userService.signIn(this.signinForm.get('email').value, this.signinForm.get('password').value).pipe(
      tap((res: Author) => this.userStorageService.setAuthor(res)),
      tap((res: Author) => this.userStorageService.setContext(res.context)),
      tap((res: Author) => this.router.navigate(['/']))
    ).subscribe();
  }
}
