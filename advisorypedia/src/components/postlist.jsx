import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import './postlist.css'

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=100`);
            const newPosts = response.data;
            console.log(response.data)
            setPosts(prevPosts => [...prevPosts, ...newPosts]);
            setPage(prevPage => prevPage + 1);
            setHasMore(newPosts.length > 0);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    return (
        <div className="mx-auto py-8">
            <h1 className="head1">Post List</h1>
            <div className=' main-cont'>
                <InfiniteScroll
                    dataLength={posts.length}
                    next={fetchPosts}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={<p>No more posts</p>}
                    className="flex flex-wrap -mx-4"
                >
                    {posts.map((post, index) => (
                        <div key={index + 1} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                            <div className="cont bg-white rounded shadow p-6">
                                <h2 className="post-t mb-2">{post.title}</h2>
                                <p className="post-b text-gray-600">{post.body}</p>
                            </div>
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default PostList;
