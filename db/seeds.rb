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

# create_guest_account
# create_posts
# create_users

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

# create_comments(50)

def create_likes(num_likes)
  user_ids = User.pluck :id

  num_likes.times {
    Like.create(
      liker_id: user_ids.sample,
      likeable: Post.all.sample,
    )
  }

  num_likes.times {
    Like.create(
      liker_id: user_ids.sample,
      likeable: Comment.all.sample,
    )
  }

end

# create_likes(100)

