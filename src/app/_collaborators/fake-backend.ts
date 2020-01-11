import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    firstName: 'Admin Ram',
    lastName: 'Sharma'
  },
  {
    id: 2,
    username: 'pooja@yahoo.com',
    password: 'pooja',
    firstName: 'Pooja',
    lastName: 'Verma'
  },
  {
    id: 3,
    username: 'riya@gmail.com',
    password: 'riya',
    firstName: 'Riya',
    lastName: 'Bhatiya'
  },
  {
    id: 4,
    username: 'jatin@outlook.com',
    password: 'jatin',
    firstName: 'Jatin',
    lastName: 'Dubey'
  }
];

const postedData = {
  1: [
    {
      type: 'image',
      content:
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      datePublished: '23-02-2019'
    },
    {
      type: 'image',
      content:
        'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      datePublished: '23-02-2019'
    },
    {
      type: 'image',
      content:
        'https://images.unsplash.com/photo-1487349384428-12b47aca925e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      datePublished: '23-02-2019'
    }
  ],
  2: [
    {
      type: 'image',
      content:
        'https://images.unsplash.com/photo-1487349384428-12b47aca925e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      format: 'jpg',
      datePublished: '23-02-2019'
    },
    {
      type: 'image',
      content:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      datePublished: '23-02-2019'
    },
    {
      type: 'image',
      content:
        'https://images.unsplash.com/photo-1533907650686-70576141c030?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      datePublished: '23-02-2019'
    },
    {
      type: 'image',
      content:
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      datePublished: '23-02-2019'
    },
    {
      type: 'image',
      content:
        'https://images.unsplash.com/photo-1522735338363-cc7313be0ae0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      datePublished: '23-02-2019'
    },
    {
      type: 'image',
      content:
        'https://images.unsplash.com/photo-1521651201144-634f700b36ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      datePublished: '23-02-2019'
    },
    {
      type: 'image',
      content:
        'https://images.unsplash.com/photo-1487349384428-12b47aca925e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      datePublished: '23-02-2019'
    }
  ],
  3: [
    {
      type: 'image',
      content:
        'https://images.unsplash.com/photo-1487349384428-12b47aca925e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      format: 'jpg',
      datePublished: '23-02-2019'
    },
    {
      type: 'image',
      content:
        'https://images.unsplash.com/photo-1526786220381-1d21eedf92bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      datePublished: '23-02-2019'
    },
    {
      type: 'image',
      content:
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      datePublished: '23-02-2019'
    },
    {
      type: 'image',
      content:
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      datePublished: '23-02-2019'
    },
    {
      type: 'image',
      content:
        'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      datePublished: '23-02-2019'
    }
  ],
  4: [
    {
      type: 'image',
      content:
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      format: 'jpg',
      datePublished: '23-02-2019'
    },
    {
      type: 'image',
      content:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      datePublished: '23-02-2019'
    },
    {
      type: 'image',
      content:
        'https://images.unsplash.com/photo-1487349384428-12b47aca925e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      datePublished: '23-02-2019'
    },
    {
      type: 'image',
      content:
        'https://images.unsplash.com/photo-1522735338363-cc7313be0ae0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      datePublished: '23-02-2019'
    },
    {
      type: 'image',
      content:
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      datePublished: '23-02-2019'
    },
    {
      type: 'image',
      content:
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      datePublished: '23-02-2019'
    },
    {
      type: 'image',
      content:
        'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      datePublished: '23-02-2019'
    }
  ]
};

const sampleImages = [
  'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/145899/pexels-photo-145899.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.endsWith('/users/posts') && method === 'POST':
          return getUserData();
        case url.endsWith('/home/images') && method === 'GET':
          return getSampleImages();

        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { username, password } = body;
      const user = users.find(x => x.username === username && x.password === password);
      if (!user) return error('Username or password is incorrect');
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: 'fake-jwt-token'
      });
    }

    function getUserData() {
      console.log(body);
      const { id, token } = body;
      let data;
      let keys = Object.keys(postedData);
      console.log(id);
      console.log(keys);
      if (keys.includes(id.toString())) {
        console.log(id);
        data = postedData[id];
        console.log(data);
      }

      if (!data || !token) return error('You are not authorized to view the content');
      return ok(data);
    }
    function getUsers() {
      if (!isLoggedIn()) return unauthorized();
      return ok(users);
    }

    function getSampleImages() {
      return ok(sampleImages);
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
