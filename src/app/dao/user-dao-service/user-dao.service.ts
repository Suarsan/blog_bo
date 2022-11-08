import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/internal/operators/map';
import { SignIn } from '../../types/signIn.type';
import { SignUp } from 'src/app/types/signUp.type';

@Injectable({
  providedIn: 'root'
})
export class UserDaoService {

  constructor(private apollo: Apollo) { }

  public signIn(email, password) {
    const signInInput = { email, password };
    const signInQuery = gql`
      query signIn($signInInput: SignInInput!){
        signIn(signInInput: $signInInput) {
          email
          password
          firstname
          lastname
          context {
            context
          }
        }
      }
    `;

    return this.apollo.watchQuery<SignIn>({
      query: signInQuery,
      variables: { signInInput }}).valueChanges.pipe( map(result => result.data.signIn));
  }

  public signup(email, password, firstname, lastname) {
    const signUpInput = { email, password, firstname, lastname };
    const signUp = gql`
      mutation signUp($signUpInput: SignUpInput!){
        signUp(signUpInput: $signUpInput) {
          email
          password
          firstname
          lastname
          context {
            context
          }
        }
      }
    `;

    return this.apollo.mutate<SignUp>({
      mutation: signUp,
      variables: { signUpInput }}).pipe( map(result => result.data.signUp));
  }
}
