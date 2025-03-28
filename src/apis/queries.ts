export const createBoartTable = `CREATE TABLE boards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

export const createStatusEnum = `CREATE TYPE post_status_enum AS ENUM ('open', 'closed', 'in-progress');`;

export const createPostTable = `CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status post_status_enum DEFAULT 'open',
    board_id UUID REFERENCES boards(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    pinned BOOLEAN DEFAULT FALSE
);`;

export const createUpvoteTable = `CREATE TABLE upvotes (
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, user_id)
);`;

export const createCommentsTable = `CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    author UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE, -- Self-referencing for nested comments
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    likes_count INT DEFAULT 0,   
    dislikes_count INT DEFAULT 0
);`;

export const updatePostsTable = `ALTER TABLE posts
    ADD COLUMN module VARCHAR(255);

    ALTER TABLE posts
    ADD COLUMN bug_sources TEXT[];  

    ALTER TABLE posts
    ADD COLUMN integrations TEXT[];`;

export const createPostDetailsView = `CREATE OR REPLACE VIEW post_details AS
SELECT 
    p.id AS post_id,
    p.title,
    p.description,
    p.status,
    b.id AS board_id,
    b.name AS board_name,
    p.created_at,
    p.pinned,
    
    -- Get author from the users table
    u.raw_user_meta_data AS author,
    
    -- Get the number of upvotes
    COALESCE(upvote_count.upvote_count, 0) AS upvote_count,

    -- Get list of user_ids who upvoted the post
    COALESCE(upvote_users.upvotes, ARRAY[]::UUID[]) AS upvotes,

    -- Get the number of comments
    COALESCE(comment_count.comments, 0) AS comments_count,

    -- Calculate created_at in terms of integer days
    ROUND(EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - p.created_at)) / 60 / 60 / 24)::INT AS created_ago

FROM posts p

-- Join with boards to get the board name
JOIN boards b ON p.board_id = b.id

-- Join with users to get the author name
LEFT JOIN auth.users u ON p.author = u.id

-- Subquery to count the number of upvotes
LEFT JOIN (
    SELECT post_id, COUNT(*) AS upvote_count
    FROM upvotes
    GROUP BY post_id
) AS upvote_count ON p.id = upvote_count.post_id

-- Subquery to get list of user_ids who upvoted
LEFT JOIN (
    SELECT post_id, ARRAY_AGG(user_id) AS upvotes
    FROM upvotes
    GROUP BY post_id
) AS upvote_users ON p.id = upvote_users.post_id

-- Subquery to count the number of comments
LEFT JOIN (
    SELECT post_id, COUNT(*) AS comments
    FROM comments
    GROUP BY post_id
) AS comment_count ON p.id = comment_count.post_id;

`;
