![logo](https://github.com/moderndayNeo/the-gram/blob/master/app/assets/images/the-gram-logo.png)

<img src="public/media/shield.svg">

# The Gram

A fullstack reproduction of Instagram. This project is designed for mobile devices; please open it on a mobile or use mobile view in your browser's devtools.

-   Access The Gram: https://adamjz-the-gram.herokuapp.com ⛔️ Update 22/12/22 The Gram is deployed on Heroku. As Heroku have deprecated some core features of their free tier, The Gram is no longer accessible ⛔️

If you don't feel like signing up, simply browse the app using the Guest account.

Note: The Gram is hosted on Heroku. Please allow some time for the first request to load.

## Preview

![gif](https://user-images.githubusercontent.com/57966028/103548689-18096400-4e9e-11eb-9e49-c60ba870d831.gif)

# Table of contents

-   [Design Docs](https://github.com/moderndayNeo/the-gram/wiki)
-   [Outline](#outline)
-   [Technologies](#technologies-used)
-   [Security](#security)
-   [The Code](#some-snippets-from-the-code)

## Outline

The Gram is a fullstack reproduction of Instagram built with a React frontend and a Rails backend API. It uses a PostgreSQL database with AWS S3 buckets for image hosting.

## Features

|                                                                                Profile                                                                                 |                                                                                Filters                                                                                 |                                                                             Notifications                                                                              |                                                                                Discover                                                                                |                                                                              Edit Profile                                                                              |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="140" alt="Screen Shot 2021-01-14 at 11 46 23" src="https://user-images.githubusercontent.com/57966028/104587046-3faaba00-565e-11eb-8598-63e5aa4c4b5f.png"> | <img width="140" alt="Screen Shot 2021-01-05 at 08 32 31" src="https://user-images.githubusercontent.com/57966028/103624055-e8f00280-4f30-11eb-97e1-1ebae47ecb5b.png"> | <img width="140" alt="Screen Shot 2021-01-05 at 08 28 19" src="https://user-images.githubusercontent.com/57966028/103624058-e9889900-4f30-11eb-843e-a63ab3b333b7.png"> | <img width="140" alt="Screen Shot 2021-01-05 at 08 29 45" src="https://user-images.githubusercontent.com/57966028/103624060-ea212f80-4f30-11eb-8ca1-5c3619019131.png"> | <img width="140" alt="Screen Shot 2021-01-05 at 08 29 50" src="https://user-images.githubusercontent.com/57966028/103624061-eab9c600-4f30-11eb-9651-f7e6788d2bb5.png"> |

## Technologies Used

-   AWS
-   Rails 6.0.3.4
-   Ruby 2.7.0
-   Postgres (PostgreSQL) 12.5

-   React 17.0.1
-   Redux 4.0.5
-   Node v12.14.0

---

# Security

## Bcrypt Hashing

#### User passwords are hashed using Bcrypt, then stored as a password_digest in the database

```rb
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
```

## CSRF Protection

#### API functions held in a single file using axios requests I custom-made for this project.

```js
export const followUser = (userId) =>
    axiosPostRequest(`/api/users/${userId}/follows`)

export const unfollowUser = (userId) =>
    axiosDeleteRequest(`/api/users/${userId}/follows/1`)

export const savePost = (postId) =>
    axiosPostRequest(`/api/posts/${postId}/saves`)
```

#### Custom-made axios requests attach the CSRF token to the request, allowing me to enable CSRF protection for The Gram.

```js
import axios from 'axios'

const token = document.querySelector('[name=csrf-token]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = token

export const axiosGetRequest = (url, data = null) =>
    axios({ method: 'get', url, params: data })
```

---

## Some Snippets From The Code

#### Eliminate N+1 database queries by eager loading data appropriately

```rb
  @posts = Post
        .where(author_id: [associated_user_ids])
        .includes(:author, :likes, :likers)
        .with_eager_loaded_photo
        .newest_first
```

#### React Hooks combine with Redux hooks APIs. A useEffect restores Redux state when necessary, such as when a user refreshes a page.

```js
export default function Activity() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const notifications = useSelector(stateSelectors.allNotifications());

    useEffect(() => {
        if (!notifications.length)
            setLoading(true);
        dispatch(fetchNotifications())
            .then(() => setLoading(false));
    }, []);

    return (
        <div className="activity">
```

#### Descriptive error messages returned from the server

```rb
    if @user.username == "guest"
      return render json: ["The guest account cannot be edited"], status: 401
    elsif @user != current_user
      return render json: ["Users may only edit their own account"], status: 401
    end
```
