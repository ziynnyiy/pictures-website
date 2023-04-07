// axios 是在React裡可以取代fetch(URL)發送 request 的功能
import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import axios from "axios";
import Picture from "../components/Picture";

// function compoment (father component of Search and Picture)
// function component裡的每一個self-closing-tag都是一個component
// state一定要設定在頁面上，這樣state更新時頁面才會重整
const Homepage = () => {
  // 將 setInput 以props的方式傳遞至search
  let [input, setInput] = useState("");
  // State Lifting: 將Search.js的(data)state移到這裡
  let [data, setData] = useState(null);
  let [page, setPage] = useState(1);
  // 因為會發生input有東西時直接去點「更多圖片」這種狀況，所以要再設定currentSearch
  let [currentSearch, setCurrentSearch] = useState("");
  const auth = "pS2Tu3ilNzz3X2eKxvbXPaxUFTUJbYuFgbTkEC5UGwTXhfo0s67P61HK";
  const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  let searchURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`;

  const search = async (url) => {
    let result = await axios.get(url, {
      headers: { Authorization: auth },
    });
    setData(result.data.photos); // result.data.photos會成為新的data
    setCurrentSearch(input);
  };

  // Closure => 在執行 setPage(page + 1) 時，會產生page不會馬上被更新的bug
  // 因為有此狀況會發生，所以可以使用以下的解法: 在backtick內的變數也要+1
  // 等於setPage(page + 1)更新函式外部的state、${page + 1}讓函式可以正確運行。
  const morePicture = async () => {
    let newURL;
    setPage(page + 1);
    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page + 1}&per_page=15`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${
        page + 1
      }`;
    }
    let result = await axios.get(newURL, {
      headers: { Authorization: auth },
    });
    setData(data.concat(result.data.photos));
  };

  useEffect(() => {
    search(initialURL);
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          search(searchURL);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {/* 運用 && (邏輯運算元)的特性，如果運算元左邊是true(or truthy)，
        則會運算出右手邊的東西，相反地，如果左邊是false(or falsy)，
        則會去運算出左邊的東西。 */}
        {data &&
          data.map((d) => {
            return <Picture data={d} />;
          })}
      </div>
      <div className="morePicture">
        <button onClick={morePicture}>更多圖片</button>
      </div>
    </div>
  );
};

export default Homepage;
