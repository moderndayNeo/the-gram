require "faker"
require "open-uri"
require "net/http"
require "json"
require "unsplash"

EMOJIS = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "😘", "😗", "😙", "😚", "😋", "😜", "😝", "😛", "🤑", "🤗", "🤓", "😎", "🤡", "🤠", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "😤", "😠", "😡", "😶", "😐", "😑", "😯", "😦", "😧", "😮", "😲", "😵", "😳", "😱", "😨", "😰", "😢", "😥", "🤤", "😭", "😓", "😪", "😴", "🙄", "🤔", "🤥", "😬", "🤐", "🤢", "🤧", "😷", "🤒", "🤕", "😈", "👿", "👹", "👺", "💩", "👻", "💀", "☠️", "👽", "👾", "🤖", "🎃", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "👐", "🙌", "👏", "🙏", "🤝", "👍", "👎", "👊", "✊", "🤛", "🤜", "🤞", "✌️", "🤘", "👌", "👈", "👉", "👆", "👇", "☝️", "✋", "🤚", "🖐", "🖖", "👋", "🤙", "💪", "🖕", "✍️", "🤳", "💅", "💍", "💄", "💋", "👄", "👅", "👂", "👃", "👣", "👁", "👀", "🧠", "🗣", "👤", "👥", "👶", "👦", "👧", "👨", "👩", "👱‍♀", "👱", "👴", "👵", "👲", "👳‍♀", "👳", "👮‍♀", "👮", "👷‍♀", "👷", "💂‍♀", "💂", "🕵️‍♀️", "🕵", "👩‍⚕", "👨‍⚕", "👩‍🌾", "👨‍🌾", "👩‍🍳", "👨‍🍳", "👩‍🎓", "👨‍🎓", "👩‍🎤", "👨‍🎤", "👩‍🏫", "👨‍🏫", "👩‍🏭", "👨‍🏭", "👩‍💻", "👨‍💻", "👩‍💼", "👨‍💼", "👩‍🔧", "👨‍🔧", "👩‍🔬", "👨‍🔬", "👩‍🎨", "👨‍🎨", "👩‍🚒", "👨‍🚒", "👩‍✈", "👨‍✈", "👩‍🚀", "👨‍🚀", "👩‍⚖", "👨‍⚖", "🤶", "🎅", "👸", "🤴", "👰", "🤵", "👼", "🤰", "🙇‍♀", "🙇", "💁", "💁‍♂", "🙅", "🙅‍♂", "🙆", "🙆‍♂", "🙋", "🙋‍♂", "🤦‍♀", "🤦‍♂", "🤷‍♀", "🤷‍♂", "🙎", "🙎‍♂", "🙍", "🙍‍♂", "💇", "💇‍♂", "💆", "💆‍♂", "🕴", "💃", "🕺", "👯", "👯‍♂", "🚶‍♀", "🚶", "🏃‍♀", "🏃", "👫", "👭", "👬", "💑", "👩‍❤️‍👩", "👨‍❤️‍👨", "💏", "👩‍❤️‍💋‍👩", "👨‍❤️‍💋‍👨", "👪", "👨‍👩‍👧", "👨‍👩‍👧‍👦", "👨‍👩‍👦‍👦", "👨‍👩‍👧‍👧", "👩‍👩‍👦", "👩‍👩‍👧", "👩‍👩‍👧‍👦", "👩‍👩‍👦‍👦", "👩‍👩‍👧‍👧", "👨‍👨‍👦", "👨‍👨‍👧", "👨‍👨‍👧‍👦", "👨‍👨‍👦‍👦", "👨‍👨‍👧‍👧", "👩‍👦", "👩‍👧", "👩‍👧‍👦", "👩‍👦‍👦", "👩‍👧‍👧", "👨‍👦", "👨‍👧", "👨‍👧‍👦", "👨‍👦‍👦", "👨‍👧‍👧", "👚", "👕", "👖", "👔", "👗", "👙", "👘", "👠", "👡", "👢", "👞", "👟", "🧣", "🧤", "🧥", "🧦", "🧢", "👒", "🎩", "🎓", "👑", "⛑", "🎒", "👝", "👛", "👜", "💼", "👓", "🕶", "🌂", "☂️"]

def create_guest_account
  User.create!(
    id: 1,
    name: "Guest",
    username: "Guest",
    bio: "Guest Account",
    email: "guest@example.com",
    password: "guestaccount",
  )
end

def create_users(num_users)
  url = "https://randomuser.me/api/?results=#{num_users}&password=upper,lower,7-10&format=pretty&inc=name,email,login,picture"
  uri = URI(url)
  response = Net::HTTP.get(uri)
  randomusers = JSON.parse(response)

  randomusers["results"].each { |data|
    user = User.new
    user.name = data["name"]["first"] + " " + data["name"]["last"]
    user.email = data["email"]
    user.username = data["login"]["username"]
    user.password = data["login"]["password"]
    user.bio = Faker::GreekPhilosophers.quote
    img = URI.open(data["picture"]["large"])
    user.photo.attach(io: img, filename: "user.png")

    user.save!
  }
end

def create_posts
  categories = %w( Model Sports Restaurant Nature Food Beautiful Travel )
  categories.each { |category| create_posts_by_category(category) }
end

def create_posts_by_category(category)
  user_ids = User.pluck :id
  client_id = Rails.application.credentials.unsplash[:client_id]
  unsplash_url = "https://api.unsplash.com/search/photos?query=#{category}&client_id=#{client_id}&per_page=30&page=1"
  uri = URI(unsplash_url)
  response = Net::HTTP.get(uri)
  data = JSON.parse(response)

  data["results"].each do |img|
    regular = img["urls"]["regular"]
    base = regular.split("?")[0]
    img_url = base + "?w=300&h=300"

    post = Post.new({
      author_id: user_ids.sample,
      caption: Faker::Quote.matz,
      location: Faker::Address.city,
    })

    img = URI.open(img_url)
    post.photo.attach(io: img, filename: "text.png")
    post.save
  end
end

def create_comments(num_comments)
  post_ids = Post.pluck :id
  user_ids = User.pluck :id

  num_comments.times {
    quote_options = [
      Faker::Movies::HarryPotter.quote,
      Faker::Movies::LordOfTheRings.quote,
      Faker::Movies::BackToTheFuture.quote,
    ]

    Comment.create(
      author_id: user_ids.sample,
      post_id: post_ids.sample,
      body: quote_options.sample + " " + EMOJIS.sample,
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
  }
end

create_guest_account
create_users(30)
create_posts # 210 posts
create_post_likes(4000)
create_comments(600)
create_follows(180)
create_saves(180)
create_comment_likes(2000)