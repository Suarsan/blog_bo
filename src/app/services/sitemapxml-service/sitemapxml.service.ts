import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SitemapxmlService {

  constructor() { }

  public generateSiteMapXML(posts) {
    posts.sort((a, b) => a.type.id >= b.type.id ? 1 : -1);
    const doc = document.implementation.createDocument('', '', null);
    const urlset = doc.createElement('urlset');
    urlset.setAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
    urlset.setAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
    urlset.setAttribute('xsi:schemaLocation', 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd');

    let url = doc.createElement('url');
    let loc = doc.createElement('loc');
    let lastmod = doc.createElement('lastmod');
    let priority = doc.createElement('priority');
    loc.innerHTML = environment.frontURL;
    lastmod.innerHTML = '2020-11-30T00:00:00Z';
    priority.innerHTML = '1.00';
    url.appendChild(loc);
    url.appendChild(lastmod);
    url.appendChild(priority);
    urlset.appendChild(url);

    for (const post of posts) {
      url = doc.createElement('url');
      loc = doc.createElement('loc');
      lastmod = doc.createElement('lastmod');
      priority = doc.createElement('priority');
      loc.innerHTML = environment.frontURL + (post.parent ? 
        encodeURIComponent(post.parent.slug) + '/' + encodeURIComponent(post.slug) : encodeURIComponent(post.slug));
      lastmod.innerHTML = new Date(parseInt(post.updatedAt, 10)).toISOString();
      post.parent ? priority.innerHTML = '0.80' : priority.innerHTML = '0.50';
      url.appendChild(loc);
      url.appendChild(lastmod);
      url.appendChild(priority);
      urlset.appendChild(url);
    }
    doc.appendChild(urlset);

    const oSerializer = new XMLSerializer();
    let xmltext = oSerializer.serializeToString(doc);
    xmltext = '<?xml version="1.0" encoding="UTF-8"?>' + xmltext;

    const pom = document.createElement('a');
    const filename = 'sitemap.xml';
    const bb = new Blob([xmltext], {type: 'text/plain'});
    pom.setAttribute('href', window.URL.createObjectURL(bb));
    pom.setAttribute('download', filename);
    pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
    pom.draggable = true;
    pom.classList.add('dragout');
    pom.click();
  }
}
