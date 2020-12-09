# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

u1 = User.create(
    name: 'arnie',
    username: 'arnie85',
    bio: nil,
    email: 'arnie@example.com',
    password: 'mrolympia85'
)

u2 = User.create(
    name: 'elon',
    username: 'elonmusk',
    bio: nil,
    email: 'elon@example.com',
    password: 'spacex'
)

# u2 = User.new(
#     name: 'elon',
#     username: 'elonmusk',
#     email: 'elon@example.com',
# )


