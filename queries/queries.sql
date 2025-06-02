
-- chatbot
WITH log_counts AS (
  SELECT alias, COUNT(*) AS messages
  FROM logs
  GROUP BY alias
),
like_counts AS (
  SELECT alias, COUNT(*) AS likes
  FROM likes
  GROUP BY alias
),
user_votes AS (
  SELECT alias
  FROM likes
  WHERE email= 'lin.aboagye@gmail.com'
)
SELECT 
c.*,
COALESCE(lc.messages, 0) AS messages,
COALESCE(lk.likes, 0) AS likes,
CASE WHEN uv.alias IS NOT NULL THEN TRUE ELSE FALSE END AS voted
FROM chatbots c
LEFT JOIN log_counts lc ON c.alias = lc.alias
LEFT JOIN like_counts lk ON c.alias = lk.alias
LEFT JOIN user_votes uv ON c.alias = uv.alias
WHERE c.alias = ?;

-- categories
SELECT DISTINCT category FROM chatbots ORDER BY category ASC

-- category
WITH log_counts AS (
  SELECT alias, COUNT(*) AS messages
  FROM logs
  GROUP BY alias
),
like_counts AS (
  SELECT alias, COUNT(*) AS likes
  FROM likes
  GROUP BY alias
),
user_votes AS (
  SELECT alias
  FROM likes
  WHERE user_id = ?
)
SELECT 
c.*,
COALESCE(lc.messages, 0) AS messages,
COALESCE(lk.likes, 0) AS likes,
CASE WHEN uv.alias IS NOT NULL THEN TRUE ELSE FALSE END AS voted
FROM chatbots c
LEFT JOIN log_counts lc ON c.alias = lc.alias
LEFT JOIN like_counts lk ON c.alias = lk.alias
LEFT JOIN user_votes uv ON c.alias = uv.alias
WHERE c.category = ?
ORDER BY c.name ASC
LIMIT 3;

-- reccomendations
WITH log_counts AS (
  SELECT alias, COUNT(*) AS messages
  FROM logs
  GROUP BY alias
),
like_counts AS (
  SELECT alias, COUNT(*) AS likes
  FROM likes
  GROUP BY alias
),
user_votes AS (
  SELECT alias
  FROM likes
  WHERE user_id= ?
)
SELECT 
c.*,
COALESCE(lc.messages, 0) AS messages,
COALESCE(lk.likes, 0) AS likes,
CASE WHEN uv.alias IS NOT NULL THEN TRUE ELSE FALSE END AS voted
FROM chatbots c
LEFT JOIN log_counts lc ON c.alias = lc.alias
LEFT JOIN like_counts lk ON c.alias = lk.alias
LEFT JOIN user_votes uv ON c.alias = uv.alias
ORDER BY c.name ASC
LIMIT 3;

-- flavour
WITH log_counts AS (
  SELECT alias, COUNT(*) AS messages
  FROM logs
  WHERE created_at > NOW() - INTERVAL 7 DAY
  GROUP BY alias
),
like_counts AS (
  SELECT alias, COUNT(*) AS likes
  FROM likes
  GROUP BY alias
),
user_votes AS (
  SELECT alias
  FROM likes
  WHERE user_id= ?
)
SELECT 
c.*,
COALESCE(lc.messages, 0) AS messages,
COALESCE(lk.likes, 0) AS likes,
CASE WHEN uv.alias IS NOT NULL THEN TRUE ELSE FALSE END AS voted
FROM chatbots c
LEFT JOIN log_counts lc ON c.alias = lc.alias
LEFT JOIN like_counts lk ON c.alias = lk.alias
LEFT JOIN user_votes uv ON c.alias = uv.alias
ORDER BY messages DESC
LIMIT 28;

-- popular
WITH log_counts AS (
  SELECT alias, COUNT(*) AS messages
  FROM logs
  GROUP BY alias
),
like_counts AS (
  SELECT alias, COUNT(*) AS likes
  FROM likes
  GROUP BY alias
),
user_votes AS (
  SELECT alias
  FROM likes
  WHERE user_id= ?
)
SELECT 
c.*,
COALESCE(lc.messages, 0) AS messages,
COALESCE(lk.likes, 0) AS likes,
CASE WHEN uv.alias IS NOT NULL THEN TRUE ELSE FALSE END AS voted
FROM chatbots c
LEFT JOIN log_counts lc ON c.alias = lc.alias
LEFT JOIN like_counts lk ON c.alias = lk.alias
LEFT JOIN user_votes uv ON c.alias = uv.alias
ORDER BY messages DESC
LIMIT 28;

-- likes
WITH log_counts AS (
  SELECT alias, COUNT(*) AS messages
  FROM logs
  GROUP BY alias
),
like_counts AS (
  SELECT alias, COUNT(*) AS likes
  FROM likes
  GROUP BY alias
),
user_votes AS (
  SELECT alias
  FROM likes
  WHERE email= 'lin.aboagye@gmail.com'
)
SELECT 
c.*,
COALESCE(lc.messages, 0) AS messages,
COALESCE(lk.likes, 0) AS likes,
CASE WHEN uv.alias IS NOT NULL THEN TRUE ELSE FALSE END AS voted
FROM chatbots c
LEFT JOIN log_counts lc ON c.alias = lc.alias
LEFT JOIN like_counts lk ON c.alias = lk.alias
LEFT JOIN user_votes uv ON c.alias = uv.alias
ORDER BY c.name ASC
LIMIT 28;

-- search
WITH log_counts AS (
  SELECT alias, COUNT(*) AS messages
  FROM logs
  GROUP BY alias
),
like_counts AS (
  SELECT alias, COUNT(*) AS likes
  FROM likes
  GROUP BY alias
),
user_votes AS (
  SELECT alias
  FROM likes
  WHERE email= 'lin.aboagye@gmail.com'
)
SELECT 
c.*,
COALESCE(lc.messages, 0) AS messages,
COALESCE(lk.likes, 0) AS likes,
CASE WHEN uv.alias IS NOT NULL THEN TRUE ELSE FALSE END AS voted
FROM chatbots c
LEFT JOIN log_counts lc ON c.alias = lc.alias
LEFT JOIN like_counts lk ON c.alias = lk.alias
LEFT JOIN user_votes uv ON c.alias = uv.alias
WHERE c.name LIKE ?
ORDER BY c.name ASC
LIMIT 10;