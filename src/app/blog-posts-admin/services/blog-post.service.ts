import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { BlogPost } from 'src/app/blog-posts-admin/blog-post.model';

interface BlogPostI {
  id: string,
  heading: string,
  description: string,
  imageUrl: string,
  adminId: string //loggedUserID, koji svakako moze biti samo admin jer samo admini imaju opciju CRUDA nad blog postovima
}

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  //private _blogPosts: BlogPost[] =[];
  private _blogPosts = new BehaviorSubject<BlogPost[]>([]);

  get blogPosts() {
    return this._blogPosts.asObservable();
  }

  constructor(private http: HttpClient, private authService: AuthService) { }

  //CRUD operations for blog posts


  addBlogPost(heading: string, description: string, imageUrl: string, adminId: string) {

    let generatedId;
    let newBlogPost: BlogPost;
    let fetchedUserId: string;

    return this.authService.loggedUserId.pipe(
      take(1),
      switchMap(userId => {
        fetchedUserId = userId;
        return this.authService.loggedUserToken;
      }),
      take(1),
      switchMap((token) => {
        newBlogPost = new BlogPost(
          null,
          heading,
          description,
          imageUrl,
          adminId
        );
        return this.http.post<{ name: string }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/blogPosts.json?auth=${token}`, newBlogPost);
      }),
      take(1),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.blogPosts;
      }),
      take(1),
      tap((blogPosts) => {
        newBlogPost.id = generatedId;
        this._blogPosts.next(blogPosts.concat(newBlogPost));
      })
    );

  }

  editBlogPost(id: string, heading: string, description: string, imageUrl: string, adminId: string) {
    return this.authService.loggedUserToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.put(
          `https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/blogPosts/${id}.json?auth=${token}`,
          {
            id,
            heading,
            description,
            imageUrl,
            adminId
          }
        );
      }),
      switchMap(() => {
        return this.blogPosts;
      }),
      take(1),
      tap((blogPosts) => {
        const updatedBlogPostIndex = blogPosts.findIndex((q) => q.id === id);
        const updatedBlogPosts = [...blogPosts];
        updatedBlogPosts[updatedBlogPostIndex] = new BlogPost(
          id,
          heading,
          description,
          imageUrl,
          adminId
        );
        this._blogPosts.next(updatedBlogPosts);
      })
    );
  }

  getBlogPost(id: string) {
    return this.authService.loggedUserToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{ [key: string]: BlogPostI }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/blogPosts/${id}.json?auth=${token}`);
      }));
    //return this.http.get<{ [key: string]: BlogPostI }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/blogPosts/${id}.json`);
  }

  getAllBlogPosts() {
    return this.authService.loggedUserToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{ [key: string]: BlogPostI }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/blogPosts.json?auth=${token}`);
      }),
      map((blogPostsData) => {
        const blogPosts: BlogPost[] = [];


        for (const key in blogPostsData) {
          if (blogPostsData.hasOwnProperty(key)) {
            blogPosts.push({
              id: key,
              heading: blogPostsData[key].heading,
              description: blogPostsData[key].description,
              imageUrl: blogPostsData[key].imageUrl,
              adminId: blogPostsData[key].adminId
            });
          }
        }
        return blogPosts;
      }),
      tap(blogPosts => {
        this._blogPosts.next(blogPosts);
      })
    );
  }

  deleteBlogPost(id: string) {

    return this.authService.loggedUserToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.delete(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/blogPosts/${id}.json?auth=${token}`);
      }),
      switchMap(() => {
        return this.blogPosts;
      }),
      take(1),
      tap((quotes) => {
        this._blogPosts.next(quotes.filter((q) => q.id !== id));
      })
    );

    /*return this.http.delete(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/blogPosts/${id}.json`)
      .pipe(switchMap(() => {
        return this.blogPosts;
      }),
        take(1),
        tap((blogPosts) => {
          this._blogPosts.next(blogPosts.filter((q) => q.id !== id));
        })
      );*/
  }

}
