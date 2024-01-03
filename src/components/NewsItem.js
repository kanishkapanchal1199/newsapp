import React from 'react'

const NewsItem= (props)=> {

    let {title,description,imageurl,newsUrl,author,date}=props;
    return (
      <div className="my-3">
        <div className="card" style={{width:"18rem"}}>
  <img src={imageurl? imageurl: "https://assets3.cbsnewsstatic.com/hub/i/r/2023/12/26/9f31a810-1cec-441b-b209-2db1fd561729/thumbnail/1200x630/1a06140515239696f7ca5d2be163ac57/gettyimages-1839817285.jpg?v=5382e209c94ee904b3a96a69f8ca0ce0"} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}<span className="badge badge-danger" style={{background:"red"}}>New</span></h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">By {author? author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
  </div>
</div>
      </div>
    )
  
}

export default NewsItem
