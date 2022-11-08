import { Component, OnInit } from '@angular/core';
import { SitemapxmlService } from '../../../services/sitemapxml-service/sitemapxml.service';
import { PostService } from 'src/app/services/post-service/post.service';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private postService: PostService,
              private sitemapXMLService: SitemapxmlService) { }

  ngOnInit(): void {
  }

  public generate() {
    this.postService.getPosts().pipe(
      tap(o => this.sitemapXMLService.generateSiteMapXML(o))
    ).subscribe();
  }
}
