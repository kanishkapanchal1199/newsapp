import React , {useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News =(props)=> {
    const[articals,setArticals]=useState([]);
    const[loading,setLoading]=useState(false);
    const[page,setPage]=useState(1);
    const[totalResults,setTotalResults]=useState(0);
    
    

    // async componentDidMount()
    // {
    //     console.log("cdm")
    //     let url="https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2ddbe6225f284790a57bfc1c260fc689";
    //     let data = await fetch(url);
    //     let parsedData=await data.json()
    //     this.setState=({articals : parsedData.articles})

    //     console.log(parsedData);
    // }

    

    const  componentDidMount=async()=> {
        props.setProgress(10);
        fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2ddbe6225f284790a57bfc1c260fc689&pageSize=${props.pageSize}`).then((response) => response.json())
        .then((data) => {
            setArticals(data.articles)
            setTotalResults(data.totalResults)
            setLoading(false)
        
        });
        props.setProgress(100);
    }
    useEffect(() => {
        const fetchData = async () => {
            props.setProgress(10);
            try {
                const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2ddbe6225f284790a57bfc1c260fc689&pageSize=${props.pageSize}`);
                const data = await response.json();
    
                setArticals(data.articles);
                setTotalResults(data.totalResults);
                setLoading(false);
                props.setProgress(100);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
    
        fetchData();
    }, [props.country, props.category, props.pageSize, props.setProgress]);
    

    const handlePreviousClick =async ()=>
    {
    
        fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2ddbe6225f284790a57bfc1c260fc689&page=${page - 1}&pageSize=${props.pageSize}`).then((response) => response.json())
        .then((data) => {
            setArticals(data.articles)
            setPage(page-1)
        });
    }

    const handleNextClick = async ()=>
    {
        
        if(!(page+ 1 > Math.ceil(totalResults/props.pageSize)))
        {
        
            fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2ddbe6225f284790a57bfc1c260fc689&page=${page+1}&pageSize=${props.pageSize}`).then((response) => response.json())
        .then((data) => {
            setArticals(data.articles)
            setPage(page+1)
        });
        }
        
    }

    const fetchMoreData = () => {
        fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2ddbe6225f284790a57bfc1c260fc689&page=${page + 1}&pageSize=${props.pageSize}`)
          .then((response) => response.json())
          .then((data) => {
            setArticals(articals.concat(data.articles));
            setTotalResults(data.totalResults);
            setLoading(false);
            setPage(page + 1); // Increment the page after fetching data
          });
      };
      

    return (
      <div className='container my-3'>
        <h1 className="text-center">News Monkey - Top Headlines</h1>    
        <InfiniteScroll
          dataLength={articals.length}
          next={fetchMoreData}
          hasMore={articals.length!==totalResults}
          loader={<h4>Loading...</h4>}
        >
        <div className="container">
        <div className="row">
        {Array.isArray(articals) && articals.map((element) => {
    return (
        <div className="col-md-4" key={element?.url}>
            <NewsItem
                title={element?.title || ""}
                description={element?.description || ""}
                imageurl={element?.urlToImage || ""}
                newsUrl={element?.url || ""}
                author={element?.author || ""}
                date={element?.publishedAt || ""}
            />
        </div>
    );
})}

       
        </div>
        </div>
        </InfiniteScroll>  
        {/* <div className="d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&#x2190; Previous</button>
        <button disabled={this.state.page+ 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &#x2192;</button>
        </div> */}
      </div>
    )
  
}

export default News


News.defaultProps = {
    country : 'in',
    pageSize: 1
}
News.propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
}
