

-- comments
WITH comment_count AS (
	SELECT alias, COUNT(*) AS comments
	FROM comments
	GROUP BY alias
),
like_counts AS (
	SELECT comment_id, COUNT(*) AS likes
	FROM likes
	GROUP BY comment_id
),
user_votes AS (
	SELECT comment_id
	FROM likes
	WHERE user_id = ?
)
SELECT  
c.*, u.username, u.image, 
COALESCE(lc.comments, 0) AS comments,
COALESCE(lk.likes, 0) AS likes,
CASE WHEN uv.comment_id IS NOT NULL THEN TRUE ELSE FALSE END AS voted
FROM comments c
JOIN users u ON c.user_id = u.user_id
LEFT JOIN comment_count lc ON c.alias = lc.alias
LEFT JOIN like_counts lk ON c.comment_id = lk.comment_id
LEFT JOIN user_votes uv ON c.comment_id = uv.comment_id
WHERE alias = ?
ORDER BY created_at DESC
LIMIT 10;

-- replies
SELECT r.*, u.username, u.image, r2.content AS 'replying_content', u2.username AS 'replying_username' FROM replies r
JOIN users u ON r.user_id = u.user_id
LEFT JOIN replies r2 ON r.parent_reply_id = r2.reply_id
LEFT JOIN users u2 ON r2.user_id = u2.user_id
WHERE r.comment_id IN (?)
ORDER BY created_at DESC
LIMIT 15;


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