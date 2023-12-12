import React, {useEffect} from "react"
import {formatISO9075, format} from "date-fns";

export default function Post({title, summary, cover, content, author, createdAt}) {
    return (
        <div className="post">
          <div className="image">
            <img src="https://t.ctcdn.com.br/E8jLZp_waQ0EBToyiLLnuSpy-wA=/925x367:2556x1349/768x432/smart/i795487.png" alt="" />
          </div>
          <div className="texts">
            <h2>{title}</h2>
            <p className="info">
              <a className="author">{author}</a>
              <time>{format(new Date(createdAt), "d MMM, yyyy HH:mm")}</time>
            </p>
            <p className="summary">{summary}</p>
          </div>
        </div>
    )
}