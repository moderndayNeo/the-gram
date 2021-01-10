export default {
    currentUserId: () => (state) => state.session.id,
    currentUser: () => (state) => state.entities.users[state.session.id],
    allPosts: () => (state) => Object.values(state.entities.posts).reverse(),
    allUsers: () => (state) => Object.values(state.entities.users),
    postById: (id) => (state) => state.entities.posts[id],
    userById: (id) => (state) => state.entities.users[id],
    postsByAuthorId: (id) => (state) =>
        Object.values(state.entities.posts)
            .filter((post) => post.author_id == id)
            .reverse(),
    currentUsersPosts: () => (state) =>
        Object.values(state.entities.posts)
            .filter((post) => post.author_id == state.session.id)
            .reverse(),
    postsSavedByUser: (id) => (state) => {
        const savedPostIds = state.entities.users[id].saved_post_ids
        if (!savedPostIds) return []

        return Object.values(state.entities.posts)
            .filter((post) => savedPostIds.includes(post.id))
            .reverse()
    },
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

        return Object.values(state.entities.posts)
            .filter((post) => postIds.includes(post.id))
            .reverse()
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
    usersNotFollowed: () => (state) => {},
    followedUserIds: () => (state) =>
        state.entities.users[state.session.id].followed_user_ids,
    suggestedUsers: () => (state) => {
        const followedUserIds =
            state.entities.users[state.session.id].followed_user_ids
        const currentUserId = state.session.id

        return followedUserIds
            ? Object.values(state.entities.users).filter(
                  (user) =>
                      !followedUserIds.includes(user.id) &&
                      user.id !== currentUserId
              )
            : []
    },

    postModalId: () => (state) => state.ui.postModal,
    commentModalPostId: () => (state) => state.ui.commentModal,
    clipboardPopup: () => (state) => state.ui.clipboardPopup,
    editProfilePopup: () => (state) => state.ui.editProfilePopup,
    passwordPopup: () => (state) => state.ui.passwordPopup,
    dmModal: () => (state) => state.ui.dmModal,
    userErrors: () => (state) => state.errors.users,

    imageAdjustments: () => (state) => state.upload.adjustments,
    selectedRotation: () => (state) => state.upload.adjustments.rotation,
    selectedFilter: () => (state) => state.upload.adjustments.filter,
    uploadPageType: () => (state) => state.upload.pageType,
    originalImage: () => (state) => state.upload.originalImage,
    editedImage: () => (state) => state.upload.editedImage,
    imageFor: () => (state) => state.upload.imageFor,
    postSubmissionReceived: () => (state) =>
        state.upload.postSubmissionReceived,
    postUploading: () => (state) => state.upload.uploading,
}
