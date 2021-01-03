require "faker"
require "open-uri"
require "net/http"
require "json"

EMOJIS = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "😘", "😗", "😙", "😚", "😋", "😜", "😝", "😛", "🤑", "🤗", "🤓", "😎", "🤡", "🤠", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "😤", "😠", "😡", "😶", "😐", "😑", "😯", "😦", "😧", "😮", "😲", "😵", "😳", "😱", "😨", "😰", "😢", "😥", "🤤", "😭", "😓", "😪", "😴", "🙄", "🤔", "🤥", "😬", "🤐", "🤢", "🤧", "😷", "🤒", "🤕", "😈", "👿", "👹", "👺", "💩", "👻", "💀", "☠️", "👽", "👾", "🤖", "🎃", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "👐", "🙌", "👏", "🙏", "🤝", "👍", "👎", "👊", "✊", "🤛", "🤜", "🤞", "✌️", "🤘", "👌", "👈", "👉", "👆", "👇", "☝️", "✋", "🤚", "🖐", "🖖", "👋", "🤙", "💪", "🖕", "✍️", "🤳", "💅", "💍", "💄", "💋", "👄", "👅", "👂", "👃", "👣", "👁", "👀", "🧠", "🗣", "👤", "👥", "👶", "👦", "👧", "👨", "👩", "👱‍♀", "👱", "👴", "👵", "👲", "👳‍♀", "👳", "👮‍♀", "👮", "👷‍♀", "👷", "💂‍♀", "💂", "🕵️‍♀️", "🕵", "👩‍⚕", "👨‍⚕", "👩‍🌾", "👨‍🌾", "👩‍🍳", "👨‍🍳", "👩‍🎓", "👨‍🎓", "👩‍🎤", "👨‍🎤", "👩‍🏫", "👨‍🏫", "👩‍🏭", "👨‍🏭", "👩‍💻", "👨‍💻", "👩‍💼", "👨‍💼", "👩‍🔧", "👨‍🔧", "👩‍🔬", "👨‍🔬", "👩‍🎨", "👨‍🎨", "👩‍🚒", "👨‍🚒", "👩‍✈", "👨‍✈", "👩‍🚀", "👨‍🚀", "👩‍⚖", "👨‍⚖", "🤶", "🎅", "👸", "🤴", "👰", "🤵", "👼", "🤰", "🙇‍♀", "🙇", "💁", "💁‍♂", "🙅", "🙅‍♂", "🙆", "🙆‍♂", "🙋", "🙋‍♂", "🤦‍♀", "🤦‍♂", "🤷‍♀", "🤷‍♂", "🙎", "🙎‍♂", "🙍", "🙍‍♂", "💇", "💇‍♂", "💆", "💆‍♂", "🕴", "💃", "🕺", "👯", "👯‍♂", "🚶‍♀", "🚶", "🏃‍♀", "🏃", "👫", "👭", "👬", "💑", "👩‍❤️‍👩", "👨‍❤️‍👨", "💏", "👩‍❤️‍💋‍👩", "👨‍❤️‍💋‍👨", "👪", "👨‍👩‍👧", "👨‍👩‍👧‍👦", "👨‍👩‍👦‍👦", "👨‍👩‍👧‍👧", "👩‍👩‍👦", "👩‍👩‍👧", "👩‍👩‍👧‍👦", "👩‍👩‍👦‍👦", "👩‍👩‍👧‍👧", "👨‍👨‍👦", "👨‍👨‍👧", "👨‍👨‍👧‍👦", "👨‍👨‍👦‍👦", "👨‍👨‍👧‍👧", "👩‍👦", "👩‍👧", "👩‍👧‍👦", "👩‍👦‍👦", "👩‍👧‍👧", "👨‍👦", "👨‍👧", "👨‍👧‍👦", "👨‍👦‍👦", "👨‍👧‍👧", "👚", "👕", "👖", "👔", "👗", "👙", "👘", "👠", "👡", "👢", "👞", "👟", "🧣", "🧤", "🧥", "🧦", "🧢", "👒", "🎩", "🎓", "👑", "⛑", "🎒", "👝", "👛", "👜", "💼", "👓", "🕶", "🌂", "☂️"]

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

def create_posts(num_posts)
  user_ids = User.pluck :id

  num_posts.times {
    post = Post.new(
      author_id: user_ids.sample,
      caption: Faker::Quote.matz,
      location: Faker::Address.city,
    )

    # img_url = Faker::Placeholdit.image(size: "100x100", format: "png", background_color: "000000", text_color: "651fff", text: "Test")
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
      body: Faker::Movies::HarryPotter.quote + " " + EMOJIS.sample,
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

# 50.times { puts Faker::Movies::LordOfTheRings.unique.quote }
# 50.times { p Faker::Movies::BackToTheFuture.unique.quote }
# 50.times { p Faker::Quote.unique.matz } - 23
# 50.times { p Faker::GreekPhilosophers.unique.quote }
# Faker::GreekPhilosophers.unique.quote - bio, 21
# Faker::UniqueGenerator.clear

# create_guest_account
# create_users(50)
# create_posts(400)
# create_post_likes(2000)
# create_comments(2400)
# create_follows(600)
# create_saves(400)
# create_comment_likes(1000)

# Unsplash

# https://api.unsplash.com/topics/wallpapers/photos
# ?orientation=squarish
# &client_id=GbalAluCsSlrC4n4E0xRoTsOWKRMWjxPej76tw8ROJg
# &page=1
# &per_page=50

def create_posts_with_unsplash
  unsplash_url = "https://api.unsplash.com/topics/wallpapers/photos?orientation=squarish&client_id=GbalAluCsSlrC4n4E0xRoTsOWKRMWjxPej76tw8ROJg&page=1&per_page=50"
  uri = URI(unsplash_url)
  response = Net::HTTP.get(uri)
  images = JSON.parse(response)

  images.each do |img|
    regular = img["urls"]["regular"]
    base = regular.split("?")[0]
    img_url = base + "?w=400"

    post = Post.new({
      author_id: User.pluck(:id).sample,
      caption: Faker::Quote.matz,
      location: Faker::Address.city,
    })

    img = URI.open(img_url)
    post.photo.attach(io: img, filename: "text.png")
    post.save!
  end
end

create_posts_with_unsplash

# regular = 'https://images.unsplash.com/photo-1598804186557-95e302c7b0a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxOTU1ODd8MHwxfHRvcGljfHxibzhqUUtUYUUwWXx8fHx8Mnw&ixlib=rb-1.2.1&q=80&w=1080'
# base = regular.split('?')[0]
# width = '?w=400'
# img_url = base + width

# API call for urls
# Take regular url, add width parameter,

# https://images.unsplash.com/photo
# &ar=1:1

# Options:
# Make an unsplash api call, open the URL.
# Map over the photo data returned, for each photo, create a Post,
# attach the photo, save it.
# Drawbacks: May hit API limit.

# Have a folder of mid-quality images. Map over each photo, create a Post,
# attach the photo, save it.
# Drawbacks: Creating a big file. Where to store the file so that my production seeds file
# can access it publicly?
