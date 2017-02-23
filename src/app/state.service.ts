import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Jsonp, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

interface TumblrImageObject {
  original_size: {
    url: string,
    height: number,
    width: number
  };
}

interface TumblrInfoResponse {
  blog: {
    posts: number;
  };
}

interface TumblrPostResponse extends TumblrInfoResponse {
  posts: [
    { photos: TumblrImageObject[], caption: string }
    ];
}

@Injectable()
export class StateService {

  private images: any[] = [];
  private apiUrl = 'http://api.tumblr.com/v2/blog/fredrikbjorgmo.tumblr.com';

  private internalImages$ = new ReplaySubject();

  constructor(private http: Jsonp) {
  }

  public getImages() {
    return this.images;
  }

  public getImages$() {
    return this.internalImages$;
  }

  public init() {
    let x = `${this.apiUrl}/posts`;
    let y = `${this.apiUrl}/info`;

    this.http.request(y, { search: this.createUrlSearchParams() })
      .map((resp: Response): TumblrInfoResponse => {
        return resp.json().response;
      })
      .switchMap((response: TumblrInfoResponse) => {
        let requests = response.blog.posts % 20 === 0 ?
          response.blog.posts / 20 :
          (response.blog.posts / 20);

        let request: Array<Observable<TumblrPostResponse>> = [];
        for (let i = 0; i < requests; i++) {
          if (i === requests - 1) {
            request.push(
              this.http.request(x, { search: this.createUrlSearchParams(undefined, i * 20, 5) })
                .map((resp: Response): TumblrInfoResponse => {
                  return resp.json().response;
                })
            );
          }
          request.push(
            this.http.request(x, { search: this.createUrlSearchParams(undefined, i * 20) })
              .map((resp: Response): TumblrInfoResponse => {
                return resp.json().response;
              })
          );
        }
        return request;
      })
      .concatMap((resp: any) => {
        return resp;
      })
      .catch((err) => {
        console.error(err);
        return Observable.of({ posts: [] });
      })
      .subscribe((aTumblrPostResponse: TumblrPostResponse) => {
        for (let blogPost of aTumblrPostResponse.posts) {

          let caption;
          if (blogPost.caption) {
            caption = blogPost.caption;
          }
          let photos = blogPost.photos;

          if (photos) {
            for (let photo of photos) {
              this.images.push({ url: `${photo.original_size.url}`, caption });
            }
          }
        }
        this.internalImages$.next(this.images);
      });

  }

  private createUrlSearchParams(type?: string, offset?: number, limit?: number): URLSearchParams {
    let search = new URLSearchParams();
    search.set('callback', 'JSONP_CALLBACK');
    search.set('api_key', 'htnzBYlqQtgF4hQs5CkcLhBXsUjgPvbdV187psaYBZz06oVX0E');
    if (type) {
      search.set('type', type);
    }

    if (offset) {
      search.set('offset', offset.toString(10));
    }

    if (limit) {
      search.set('limit', limit.toString(10));
    }

    return search;
  }

}
