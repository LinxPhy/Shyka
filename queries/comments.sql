

-- comments
SELECT  
c.*, u.username, u.image
FROM comments c
JOIN users u ON c.user_id = u.user_id
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