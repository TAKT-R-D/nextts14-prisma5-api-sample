let hooks = require('hooks');
let stash = {};

const baseUid = 'clqj40goe0000z21ibpk26izw';
const baseId = '1';
const includePathes = [
  '/api/auth/access_token',
  '/api/users',
  `/api/users/${baseUid}`,
  '/api/posts',
  `/api/posts/${baseId}`,
  //'/api/bookmarks',
  //`/api/bookmarks/${baseId}`,
];

hooks.after(
  '/auth/access_token > issue access_token > 200 > application/json; charset=utf-8',
  function (transaction) {
    stash['access_token'] = JSON.parse(transaction.real.body)['access_token'];
  }
);

hooks.beforeEach((transaction) => {
  //console.log(transaction.name);
  // skip health check
  if (
    transaction.fullPath === '/api/health' ||
    transaction.fullPath === '/api/health/deep'
  ) {
    transaction.skip = true;
  }
  // skip methods not ready
  // - POST
  if (
    includePathes.indexOf(transaction.fullPath) === -1 &&
    transaction.request.method === 'POST'
  ) {
    transaction.skip = true;
  }
  // - PUT, DELETE
  if (
    includePathes.indexOf(transaction.fullPath) === -1 &&
    (transaction.request.method === 'PUT' ||
      transaction.request.method === 'DELETE')
  ) {
    transaction.skip = true;
  }
  // skip errors
  if (
    transaction.expected.statusCode === '400' ||
    transaction.expected.statusCode === '401' ||
    transaction.expected.statusCode === '404' ||
    transaction.expected.statusCode === '500' ||
    transaction.expected.statusCode === '503'
  ) {
    transaction.skip = true;
  }

  // set Authorization header
  if (stash['access_token'] !== undefined) {
    if (transaction.expected.statusCode !== '401') {
      transaction.request.headers['Authorization'] =
        'Bearer ' + stash['access_token'];
    }
  }
});

/**
 * test senario for /api/users
 */
hooks.after(
  '/users > create an user > 200 > application/json; charset=utf-8',
  function (transaction) {
    stash['userId'] = JSON.parse(transaction.real.body)['id'];
  }
);

hooks.before(
  '/users/{id} > update an user > 200 > application/json; charset=utf-8',
  function (transaction) {
    if (stash['userId'] !== undefined) {
      transaction.fullPath = transaction.fullPath.replace(
        baseUid,
        stash['userId']
      );
      transaction.request.body = JSON.stringify({
        userName: 'Jane Doe',
        imageUrl: '/janedoe.png',
      });
    } else {
      transaction.skip = true;
    }
  }
);

hooks.before('/users/{id} > delete an user > 204', function (transaction) {
  if (stash['userId'] !== undefined) {
    transaction.fullPath = transaction.fullPath.replace(
      baseUid,
      stash['userId']
    );
  } else {
    transaction.skip = true;
  }
});

/**
 * test senario for /api/posts
 */
hooks.after(
  '/posts > create a post > 200 > application/json; charset=utf-8',
  function (transaction) {
    stash['postId'] = JSON.parse(transaction.real.body)['id'];
  }
);

hooks.before(
  '/posts/{id} > update a post > 200 > application/json; charset=utf-8',
  function (transaction) {
    if (stash['postId'] !== undefined) {
      transaction.fullPath = transaction.fullPath.replace(
        baseId,
        stash['postId']
      );
    } else {
      transaction.skip = true;
    }
  }
);

hooks.before('/posts/{id} > delete a post > 204', function (transaction) {
  if (stash['postId'] !== undefined) {
    transaction.fullPath = transaction.fullPath.replace(
      baseId,
      stash['postId']
    );
  } else {
    transaction.skip = true;
  }
});

/**
 * test senario for /api/bookmarks
 */
/*
hooks.after(
  '/bookmarks > create a bookmark > 200 > application/json; charset=utf-8',
  function (transaction) {
    stash['bookmarkId'] = JSON.parse(transaction.real.body)['id'];
    console.log(stash['bookmarkId']);
  }
);

hooks.before(
  '/bookmarks/{id} > update a bookmark > 200 > application/json; charset=utf-8',
  function (transaction) {
    if (stash['bookmarkId'] !== undefined) {
      transaction.fullPath = transaction.fullPath.replace(
        baseId,
        stash['bookmarkId']
      );
    } else {
      transaction.skip = true;
    }
  }
);

hooks.before(
  '/bookmarks/{id} > delete a bookmark > 204',
  function (transaction) {
    if (stash['bookmarkId'] !== undefined) {
      transaction.fullPath = transaction.fullPath.replace(
        baseId,
        stash['bookmarkId']
      );
    } else {
      transaction.skip = true;
    }
  }
);
*/
