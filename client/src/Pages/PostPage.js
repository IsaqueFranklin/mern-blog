import React, {useEffect, useState, useContext} from 'react';
import { Link, useParams } from 'react-router-dom';
import {formatISO9075, format} from "date-fns";
import {UserContext} from '../UserContext';


export default function PostPage() {

    const [postInfo, setPostInfo] = useState(null);
    const {userInfo} = useContext(UserContext)
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
            {userInfo.id === postInfo.author._id && (
                <div className='edit-row'>
                    <Link className='edit-btn' to={`/edit/${postInfo._id}`}>Editar publicação</Link>
                </div>
            )}
            <h1>{postInfo.title}</h1>
            <div className='content' dangerouslySetInnerHTML={{__html:postInfo.content}} />
        </div>
    )
}