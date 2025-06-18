

-- comments
WITH comment_count AS (
	SELECT comment_id, COUNT(*) AS replies
	FROM replies
	GROUP BY comment_id
),
like_counts AS (
	SELECT comment_id, COUNT(*) AS likes
	FROM comment_likes
	GROUP BY comment_id
),
user_votes AS (
	SELECT comment_id
	FROM comment_likes
	WHERE user_id = ?
)
SELECT  
c.*, u.username, u.image, 
COALESCE(lc.replies, 0) + 1 AS comments,
COALESCE(lk.likes, 0) AS likes,
CASE WHEN uv.comment_id IS NOT NULL THEN TRUE ELSE FALSE END AS voted
FROM comments c
JOIN users u ON c.user_id = u.user_id
LEFT JOIN comment_count lc ON c.comment_id = lc.comment_id
LEFT JOIN like_counts lk ON c.comment_id = lk.comment_id
LEFT JOIN user_votes uv ON c.comment_id = uv.comment_id
WHERE c.alias = ?
ORDER BY created_at DESC
LIMIT 10
OFFSET ?;

-- replies
WITH like_counts AS (
	SELECT reply_id, COUNT(*) AS likes
	FROM reply_likes
	GROUP BY reply_id
),
user_votes AS (
	SELECT reply_id
	FROM reply_likes
	WHERE user_id = ?
)
SELECT r.*, u.username, u.image, r2.content AS 'replying_content', u2.username AS 'replying_username',
COALESCE(lk.likes, 0) AS likes,
CASE WHEN uv.reply_id IS NOT NULL THEN TRUE ELSE FALSE END AS voted
FROM replies r
JOIN users u ON r.user_id = u.user_id
LEFT JOIN replies r2 ON r.parent_reply_id = r2.reply_id
LEFT JOIN users u2 ON r2.user_id = u2.user_id
LEFT JOIN like_counts lk ON r.reply_id = lk.reply_id
LEFT JOIN user_votes uv ON r.reply_id = uv.reply_id
WHERE r.comment_id IN (?)
ORDER BY created_at DESC
LIMIT 3;


-- addComment
INSERT INTO comments (user_id, alias, content) VALUES (?, ?, ?);

-- getNewComment
SELECT c.*, u.username, u.image
FROM comments c 
JOIN users u ON c.user_id = u.user_id
WHERE comment_id = LAST_INSERT_ID()
LIMIT 1;

-- addReply
INSERT INTO replies (user_id, parent_reply_id, comment_id, content) VALUES (?, ?, ?, ?);

-- getNewReply
SELECT r.*, u.username, u.image, r2.content AS 'replying_content', u2.username AS 'replying_username' 
FROM replies r
JOIN users u ON r.user_id = u.user_id
LEFT JOIN replies r2 ON r.parent_reply_id = r2.reply_id
LEFT JOIN users u2 ON r2.user_id = u2.user_id
WHERE r.reply_id = LAST_INSERT_ID()
LIMIT 1;


-- total_messages
SELECT COUNT(*) AS 'messages' FROM logs WHERE alias = ?

-- total_comments
SELECT (
	(SELECT COUNT(*) FROM comments c WHERE c.alias = ?) +
	(SELECT COUNT(*) FROM replies r JOIN comments c ON c.comment_id = r.comment_id WHERE c.alias = ?)
) AS 'comments';

-- total_likes
SELECT COUNT(*) AS 'likes' FROM likes WHERE alias = ?