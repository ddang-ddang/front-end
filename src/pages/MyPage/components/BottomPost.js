import React, { useState, useEffect } from "react";
import Posts from "../components/Post";
import Pagination from "../components/Pagination";
import api from "../../../modules/api";

export default function BottomPost() {
    const [posts, setPosts] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const [currentPosts, setCurrentPosts] = useState(null);

    const [indexOfLastPost, setIndexOfLastPost] = useState();
    const [indexOfFirstPost, setIndexOfFirstPost] = useState();
    console.log("hello");

    // const indexOfLastPost = currentPage * postsPerPage;

    // const indexOfFirstPost = indexOfLastPost - postsPerPage;

    // const fetchPosts = async () => {
    //     const res = await api.get("/api/players/mypage");
    //     setPosts(res.data.rows.profile[0].completes);
    //     if (posts !== null) {
    //         setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
    //     }
    // };

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await api.get("/api/players/mypage");
            setPosts(res.data.rows.profile[0].completes);

            setCurrentPosts(
                res.data.rows.profile[0].completes.slice(
                    indexOfFirstPost,
                    indexOfLastPost
                )
            );
        };
        setIndexOfLastPost(currentPage * postsPerPage);
        setIndexOfFirstPost(indexOfLastPost - postsPerPage);
        fetchPosts();
    }, [indexOfLastPost, indexOfFirstPost, currentPage, postsPerPage]);

    // Get current posts
    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            {currentPosts !== null && (
                <>
                    <Posts posts={currentPosts} />
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={posts.length}
                        paginate={paginate}
                    />
                </>
            )}
        </div>
    );
}