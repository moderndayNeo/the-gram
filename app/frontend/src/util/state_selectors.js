export default {
    currentUserId: () => (state) => state.session.id,
    currentUser: () => (state) => state.entities.users[state.session.id],
    allPosts: () => state => Object.values(state.entities.posts)
}
