import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
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

  constructor(private http: HttpClient) { }

  //CRUD operations for blog posts
  addBlogPost(heading: string, description: string, imageUrl: string, adminId: string) {
    let generatedId;
    return this.http.post<{ name: string }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/blogPosts.json`,
      { heading, description, imageUrl, adminId })
      .pipe(switchMap((blogPostsResData) => {
        generatedId = blogPostsResData.name;
        return this.blogPosts;
      }),
        take(1),
        tap((blogPosts) => {
          this._blogPosts.next(blogPosts.concat({
            id: generatedId,
            heading,
            description,
            imageUrl,
            adminId
          }));

        }));
  }

  editBlogPost(id: string, heading: string, description: string, imageUrl: string, adminId: string) {
    return this.http.put(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/blogPosts/${id}.json`,
      { heading, description, imageUrl, adminId })
      .pipe(switchMap(() => {
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

  /*  editQuote(
    id: string,
    author: string,
    text: string,
    imageUrl: string,
    userId: string
  ) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.put(
          `https://quotes-app-termin-10-default-rtdb.europe-west1.firebasedatabase.app/quotes/${id}.json?auth=${token}`,
          {
            author,
            text,
            imageUrl,
            userId,
          }
        );
      }),
      switchMap(() => {
        return this.quotes;
      }),
      take(1),
      tap((quotes) => {
        const updatedQuoteIndex = quotes.findIndex((q) => q.id === id);
        const updatedQuotes = [...quotes];
        updatedQuotes[updatedQuoteIndex] = new Quote(
          id,
          author,
          text,
          imageUrl,
          userId
        );
        this._quotes.next(updatedQuotes);
      })
    );
  }*/

  getBlogPost(id: string) {
    return this.http.get<{ [key: string]: BlogPostI }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/blogPosts/${id}.json`);
  }

  getAllBlogPosts() {
    return this.http.get<{ [key: string]: BlogPostI }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/blogPosts.json`)
      .pipe(map((blogPostsData) => {

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
        this._blogPosts.next(blogPosts);
        return this.blogPosts;
        ///////////
      }));
  }

  deleteBlogPost(id: string) {
    return this.http.delete(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/blogPosts/${id}.json`)
      .pipe(switchMap(() => {
        return this.blogPosts;
      }),
        take(1),
        tap((blogPosts) => {
          this._blogPosts.next(blogPosts.filter((q) => q.id !== id));
        })
      );
  }

}
