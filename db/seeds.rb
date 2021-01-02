require "faker"
require "open-uri"

@emojis = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "😘", "😗", "😙", "😚", "😋", "😜", "😝", "😛", "🤑", "🤗", "🤓", "😎", "🤡", "🤠", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "😤", "😠", "😡", "😶", "😐", "😑", "😯", "😦", "😧", "😮", "😲", "😵", "😳", "😱", "😨", "😰", "😢", "😥", "🤤", "😭", "😓", "😪", "😴", "🙄", "🤔", "🤥", "😬", "🤐", "🤢", "🤧", "😷", "🤒", "🤕", "😈", "👿", "👹", "👺", "💩", "👻", "💀", "☠️", "👽", "👾", "🤖", "🎃", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "👐", "🙌", "👏", "🙏", "🤝", "👍", "👎", "👊", "✊", "🤛", "🤜", "🤞", "✌️", "🤘", "👌", "👈", "👉", "👆", "👇", "☝️", "✋", "🤚", "🖐", "🖖", "👋", "🤙", "💪", "🖕", "✍️", "🤳", "💅", "💍", "💄", "💋", "👄", "👅", "👂", "👃", "👣", "👁", "👀", "🧠", "🗣", "👤", "👥", "👶", "👦", "👧", "👨", "👩", "👱‍♀", "👱", "👴", "👵", "👲", "👳‍♀", "👳", "👮‍♀", "👮", "👷‍♀", "👷", "💂‍♀", "💂", "🕵️‍♀️", "🕵", "👩‍⚕", "👨‍⚕", "👩‍🌾", "👨‍🌾", "👩‍🍳", "👨‍🍳", "👩‍🎓", "👨‍🎓", "👩‍🎤", "👨‍🎤", "👩‍🏫", "👨‍🏫", "👩‍🏭", "👨‍🏭", "👩‍💻", "👨‍💻", "👩‍💼", "👨‍💼", "👩‍🔧", "👨‍🔧", "👩‍🔬", "👨‍🔬", "👩‍🎨", "👨‍🎨", "👩‍🚒", "👨‍🚒", "👩‍✈", "👨‍✈", "👩‍🚀", "👨‍🚀", "👩‍⚖", "👨‍⚖", "🤶", "🎅", "👸", "🤴", "👰", "🤵", "👼", "🤰", "🙇‍♀", "🙇", "💁", "💁‍♂", "🙅", "🙅‍♂", "🙆", "🙆‍♂", "🙋", "🙋‍♂", "🤦‍♀", "🤦‍♂", "🤷‍♀", "🤷‍♂", "🙎", "🙎‍♂", "🙍", "🙍‍♂", "💇", "💇‍♂", "💆", "💆‍♂", "🕴", "💃", "🕺", "👯", "👯‍♂", "🚶‍♀", "🚶", "🏃‍♀", "🏃", "👫", "👭", "👬", "💑", "👩‍❤️‍👩", "👨‍❤️‍👨", "💏", "👩‍❤️‍💋‍👩", "👨‍❤️‍💋‍👨", "👪", "👨‍👩‍👧", "👨‍👩‍👧‍👦", "👨‍👩‍👦‍👦", "👨‍👩‍👧‍👧", "👩‍👩‍👦", "👩‍👩‍👧", "👩‍👩‍👧‍👦", "👩‍👩‍👦‍👦", "👩‍👩‍👧‍👧", "👨‍👨‍👦", "👨‍👨‍👧", "👨‍👨‍👧‍👦", "👨‍👨‍👦‍👦", "👨‍👨‍👧‍👧", "👩‍👦", "👩‍👧", "👩‍👧‍👦", "👩‍👦‍👦", "👩‍👧‍👧", "👨‍👦", "👨‍👧", "👨‍👧‍👦", "👨‍👦‍👦", "👨‍👧‍👧", "👚", "👕", "👖", "👔", "👗", "👙", "👘", "👠", "👡", "👢", "👞", "👟", "🧣", "🧤", "🧥", "🧦", "🧢", "👒", "🎩", "🎓", "👑", "⛑", "🎒", "👝", "👛", "👜", "💼", "👓", "🕶", "🌂", "☂️"]

def create_guest_account
  User.create!(
    id: 1,
    name: "Guest",
    username: "Guest",
    bio: null,
    email: "guest@example.com",
    password: "guestaccount",
  )
end

def create_users
  10.times {
    name = Faker::Name.unique.name

    User.create!(
      name: name,
      username: name.split(" ").join(""),
      bio: Faker::GreekPhilosophers.quote,
      email: Faker::Internet.email,
      password: name.split(" ").join(""),
    )
  }
end

def create_posts
  user_ids = User.pluck :id

  3.times {
    post = Post.new(
      author_id: user_ids.sample,
      caption: Faker::Quote.matz,
      location: Faker::Address.city,
    )

    img_url = Faker::Placeholdit.image(size: "200x200", format: "png", background_color: "000000", text_color: "651fff", text: "Test")
    img = URI.open(img_url)
    post.photo.attach(io: img, filename: "text.png")
    post.save!
  }
end

def create_comments(num_comments)
  post_ids = Post.pluck :id
  user_ids = User.pluck :id

  num_comments.times {
    Comment.create!(
      author_id: user_ids.sample,
      post_id: post_ids.sample,
      body: Faker::Movies::HarryPotter.quote + " " + @emojis.sample,
    )
  }
end

def create_saves(num_saves)
  user_ids = User.pluck :id
  post_ids = Post.pluck :id

  num_saves.times {
    Save.create(
      user_id: user_ids.sample,
      post_id: post_ids.sample,
    )
  }
end

def create_follows(num_follows)
  num_follows.times {
    follower = User.all.sample
    followee = User.all.sample

    follow = Follow.new(
      follower: follower,
      followee: followee,
    )

    if follow.save
      Notification.create_notification({
        notifiable: follow,
        source_user: follower,
        notified_user: followee,
      })
    end
  }
end

def create_post_likes(num_likes)
  users = User.all
  posts = Post.all

  num_likes.times {
    liker = users.sample
    post = posts.sample

    like = Like.new({
      liker: liker,
      likeable: post,
    })

    if like.save
      Notification.create_notification({
        notifiable: like,
        source_user: liker,
        notified_user: post.author,
        source_post: post,
      })
    end
  }
end

def create_comment_likes(num_likes)
  users = User.all
  comments = Comment.all

  num_likes.times {
    liker = users.sample
    comment = comments.sample

    like = Like.new({
      liker: liker,
      likeable: comment,
    })

    # if like.save
    #   Notification.create_notification({
    #     notifiable: like,
    #     source_user: liker,
    #     notified_user: comment.author,
    #     source_comment: comment
    #   })
    # end
  }
end

# create_guest_account
# create_users
# create_posts
# create_follows(100)
# create_saves(50)
# create_comments(50)
# create_post_likes(100)
# create_comment_likes(100)
