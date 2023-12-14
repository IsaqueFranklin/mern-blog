import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {formatISO9075, format} from "date-fns";


export default function PostPage() {

    const [postInfo, setPostInfo] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo);
            })
        })
    }, []);

    if (!postInfo) return '';

    return (
        <div className='post-page'>
            <div className='image'>
                <img src={`http://localhost:4000/${postInfo.cover}`} alt=""/>
            </div>
            <time>{format(new Date(postInfo.createdAt), "d MMM, yyyy HH:mm")}</time>
            <div className='author'>Escrito por @{postInfo.author.username}</div>
            <h1>{postInfo.title}</h1>
            <div dangerouslySetInnerHTML={{__html:postInfo.content}} />
        </div>
    )
}