json.extract! notification,
              :id,
              :notifiable_id,
              :notifiable_type,
              :source_user_id,
              :message,
              :read,
              :source_post_id,
              :source_comment_id

json.time_ago time_ago_in_words(notification.created_at)
