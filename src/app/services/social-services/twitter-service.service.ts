import { Injectable } from '@angular/core';
import { TwitterDaoService } from 'src/app/dao/social-dao-services/twitter-dao.service';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  constructor(private twitterDaoService: TwitterDaoService) { }

  public getOAuthUrl() {

  }

}
