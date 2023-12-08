import React, { useState } from "react"
import Post from '../Components/Post';

export default function HomePage() {
    const [posts, setPosts] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/post').then(posts => {
            console.log(posts)
        });
    }, [])
    return (
        <>
            <Post />
            <Post />
            <Post />
        </>
    )
}