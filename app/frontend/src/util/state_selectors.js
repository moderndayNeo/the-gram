export default {
    currentUserId: () => (state) => state.session.id,
    currentUser: () => (state) => state.entities.users[state.session.id],
    allPosts: () => state => Object.values(state.entities.posts),
    allUsers: () => state => Object.values(state.entities.users),
    postById: id => state => state.entities.posts[id],
    userById: id => state => state.entities.users[id]
}
