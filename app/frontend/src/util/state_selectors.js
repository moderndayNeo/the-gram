export default {
    currentUserId: () => (state) => state.session.id,
    currentUser: () => (state) => state.entities.users[state.session.id],
    allPosts: () => (state) => Object.values(state.entities.posts).reverse(),
    allUsers: () => (state) => Object.values(state.entities.users),
    postById: (id) => (state) => state.entities.posts[id],
    userById: (id) => (state) => state.entities.users[id],
    postsByAuthorId: (id) => (state) =>
        Object.values(state.entities.posts).filter(
            (post) => post.author_id == id
        ),
    currentUsersPosts: () => (state) =>
        Object.values(state.entities.posts).filter(
            (post) => post.author_id == state.session.id
        ),
    currentUserLikedPostIds: () => (state) =>
        state.entities.users[state.session.id].liked_post_ids,
    currentUserImageUrl: () => (state) =>
        state.entities.users[state.session.id].image_url,
    commentsByPostId: (postId) => (state) =>
        Object.values(state.entities.comments).filter(
            (comment) => comment.post_id == postId
        ),
    currentUserSavedPostIds: () => (state) =>
        state.entities.users[state.session.id].saved_post_ids,
    currentUserSavedPosts: () => (state) => {
        let postIds = state.entities.users[state.session.id].saved_post_ids
        return Object.values(state.entities.posts).filter((post) =>
            postIds.includes(post.id)
        )
    },
    currentUsedLikedCommentIds: () => (state) =>
        state.entities.users[state.session.id].liked_comment_ids,
    allNotifications: () => (state) =>
        Object.values(state.entities.notifications).reverse(),
    currentUserIsFollowing: (userId) => (state) =>
        state.entities.users[state.session.id].followed_user_ids.includes(
            parseInt(userId)
        ),
    allFollowers: () => (state) => {
        const followerIds = state.entities.users[state.session.id].follower_ids
        return Object.values(state.entities.users).filter((user) =>
            followerIds.includes(user.id)
        )
    },
    allFollowedUsers: () => (state) => {
        const followedUserIds =
            state.entities.users[state.session.id].followed_user_ids
        return Object.values(state.entities.users).filter((user) =>
            followedUserIds.includes(user.id)
        )
    },
    suggestedUsers: () => (state) => {
        const followedUserIds =
            state.entities.users[state.session.id].followed_user_ids

        return Object.values(state.entities.users).filter(
            (user) => !followedUserIds.includes(user.id)
        )
    },
    postModalId: () => (state) => state.ui.postModal,
    clipboardPopup: () => (state) => state.ui.clipboardPopup,
    editProfilePopup: () => (state) => state.ui.editProfilePopup,
    passwordPopup: () => state => state.ui.passwordPopup,
    dmModal: () => (state) => state.ui.dmModal,
    userErrors: () => (state) => state.errors.users,
}
