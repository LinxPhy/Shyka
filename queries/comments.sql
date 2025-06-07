

-- comments
SELECT  
c.*, u.username, u.image
FROM comments c
JOIN users u ON c.user_id = u.user_id
WHERE alias = ?
ORDER BY created_at DESC
LIMIT 10;

-- replies
SELECT * FROM replies
WHERE comment_id IN (?)
ORDER BY created_at DESC
LIMIT 3;