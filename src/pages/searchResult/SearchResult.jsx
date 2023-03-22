import "./searchResult.scss";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Loader from "../../components/loader/Loader";
import MovieCard from "../../components/movieCard/MovieCard";
import noResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);

  const { query } = useParams();

  useEffect(() => {
    fetchInitialData();
  }, [query]);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res) => {
        setData({
          ...data,
          results: [...data?.results, ...res.results],
        });
        // if (data?.results) {
        //   setData({
        //     ...data,
        //     results: [...data?.results, ...res.results],
        //   });
        // }
        // else{
        //   setData(res);
        // }
        setPageNum((prev) => prev + 1);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="searchResultsPage">
      {loading && <Loader style={{ opacity: 0.5 }} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data.total_results > 1 ? "results" : "result"
                } for ${query}`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Loader />}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard
                      key={index}
                      data={item}
                      fromSearch={true}
                      mediaType={data?.media_type}
                    />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <div className="resultNotFound">
              <span>No matching results found for {query}.</span>
              <img src={noResults} alt="" />
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
