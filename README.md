![logo](https://github.com/moderndayNeo/the-gram/blob/master/app/assets/images/the-gram-logo.png)

<img src="public/media/shield.svg">

# The Gram

A fullstack clone of Instagram. This project is designed for mobile devices; please open it on a mobile or use mobile view in your browser's devtools.

-   Live app: https://adamjz-the-gram.herokuapp.com

## Preview

![gif](https://user-images.githubusercontent.com/57966028/103548689-18096400-4e9e-11eb-9e49-c60ba870d831.gif)

# Table of contents

-   [Design Docs](https://github.com/moderndayNeo/the-gram/wiki)
-   [Outline](#outline)
-   [Technologies](#technologies-used)
-   [The Code](#some-snippets-from-the-code)

## Outline

The Gram is a fullstack clone of Instagram built with a React frontend and a Rails backend API. It uses a PostgreSQL database with AWS S3 buckets for image hosting.

### Features

-   Signup
-   Create posts; apply filters, cropping and rotation to photos
-   Like posts and leave comments
-   Save posts, then view your saved posts in your profile
-   Follow other users and receive a feed personalised to you
-   Get notifications when another user follows your or likes one of your photos

If you don't feel like signing up, simply browse the app using the Guest account.

## Technologies

-   AWS
-   Rails 6.0.3.4
-   Ruby 2.7.0
-   Postgres (PostgreSQL) 12.5

-   React 17.0.1
-   Redux 4.0.5
-   Node v12.14.0

## Some Snippets From The Code

-   N+1 buster
-   Separation of concerns
-   AWS
-   React hooks
-   Modern redux with hooks, thunks
-   Sass styling, variables, classes, indentation

### All API functions are held in a single file using axios requests I custom-made for this project.

```js
//...
export const followUser = (userId) =>
    axiosPostRequest(`/api/users/${userId}/follows`)

export const unfollowUser = (userId) =>
    axiosDeleteRequest(`/api/users/${userId}/follows/1`)

export const savePost = (postId) =>
    axiosPostRequest(`/api/posts/${postId}/saves`)
//...
```

### Custom-made axios requests attach the CSRF token before the request is made, allowing me to use CSRF protection for the entire project.

```js
import axios from 'axios'

const token = document.querySelector('[name=csrf-token]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = token

export const axiosGetRequest = (url, data = null) =>
    axios({ method: 'get', url, params: data })
```

### Redux thunks asynchronously make requests then update state

```js
export const createPost = (post) => (dispatch) =>
    APIUtil.createPost(post)
        .then(({ data: { post } }) => dispatch(receivePost(post)))
        .catch((errors) => dispatch(receivePostErrors(errors)))
```

