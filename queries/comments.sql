

-- comments
SELECT  
c.*, u.username, u.image
FROM comments c
JOIN users u ON c.user_id = u.user_id
WHERE alias = ?
ORDER BY created_at DESC
LIMIT 10;

-- replies
SELECT r.*, u.username, u.image FROM replies r
JOIN users u ON r.user_id = u.user_id
WHERE comment_id IN (?)
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
INSERT INTO replies (user_id, comment_id, content) VALUES (?, ?, ?);

-- getNewReply
SELECT r.*, u.username, u.image 
FROM replies r
JOIN users u ON r.user_id = u.user_id
WHERE reply_id = LAST_INSERT_ID()
LIMIT 1;