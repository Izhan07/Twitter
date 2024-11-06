import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import TweetContainer from "./TweetContainer.jsx";

function AllTweets() {
  const [Tweets, setTweets] = useState([]);
  const [lastTweetId, setLastTweetId] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const tweetContainerRef = useRef(null);

  const loadMoreTweets = async (initialLoad = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const url = initialLoad
        ? `https://twitter-kbki.onrender.com/api/v1/tweets/tweets?limit=10`
        : `https://twitter-kbki.onrender.com/api/v1/tweets/tweets?limit=10${lastTweetId || ""}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer${token}`, 
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const tweets = await response.json();
        setTweets((prevTweets) => [...prevTweets, ...tweets.data]);
        setLastTweetId(tweets.lastTweetId);
        
      } else {
        console.error("Error fetching tweets:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error loading more Tweets", error);
    } finally {
      setLoading(false);
    }
  };

  
  const handleScroll = () => {
    const container = tweetContainerRef.current;
    if (
      container.scrollTop + container.clientHeight >= container.scrollHeight &&
      !loading
    ) {
      loadMoreTweets();
      
    }
  };

  useEffect(() => {
    const container = tweetContainerRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [lastTweetId, loading]);

  useEffect(() => {
    loadMoreTweets(true); 
  }, []);

  const renderTweets = () => {
    return Tweets.map((tweet, index) => (
      <div key={index}>
        <TweetContainer tweet={tweet} />
      </div>
    ));
  };

  return (
    <div
      ref={tweetContainerRef}
      className="overflow-y-auto flex flex-col items-center h-dvh w-full bg-[#201f1f] text-[#E0E0E0] p-2 gap-7" 
    >
      {renderTweets()}
      {loading && <div className="w-full h-full flex items-center justify-center  bg-[#201f1f]">
                <div className="w-32 h-32 border-t-4 border-[#494949] border-solid rounded-full animate-spin "></div>
            </div>}
    </div>
  );
}

export default AllTweets;
