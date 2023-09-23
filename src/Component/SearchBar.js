import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import logo from "../images/Group.png";
import textlogo from "../images/KeazoNBOOKS.png";
import image1 from "../images/img1.png";
import image2 from "../images/img2.png";
import image3 from "../images/img3.png";
import image4 from "../images/img4.png";
import axios from "axios";

const SearchBar = () => {
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=harry+potter"
        );
        const response2 = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=Sherlock+Holmes"
        );

        const combinedData = [...response1.data.items, ...response2.data.items];
        setData(combinedData);
        console.log(combinedData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  function displayDetails(volumeInfo) {
    setDisplay(volumeInfo);
    console.log(volumeInfo);
  }
  // previewLink  infoLink

  function nowRead(link) {
    window.location.href = link;
  }
  function moreInfo(link) {
    // const info = useNavigate();
    // info("www.google.com");
    window.location.href = link;
  }

  // Create function to add search Functionality...
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
      );
      setSearchResults(response.data.items);
    } catch (error) {
      console.log("Error fetching search results:", error);
    }
  };

  return (
    <div>
      <div className="navbar">
        <div className="left">
          <div className="logo">
            <img src={logo} alt="image1" />
          </div>
          <div className="logo">
            <img src={textlogo} alt="image2" />
          </div>
        </div>
        <div className="middle">
          {/* onKeyDown={handleKeys} */}
          <input
            type="text"
            placeholder="Search for a book..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="right">
          <div className="image1">
            <img src={image1} />
          </div>
          <div className="image2">
            <img src={image2} />
          </div>
          <div className="image3">
            <img src={image3} />
          </div>
          <div className="image4">
            <img src={image4} />
          </div>
        </div>
      </div>

      {display !== "" && (
        <div className="display">
          <div className="display-img">
            <img src={display.imageLinks.thumbnail} />
          </div>
          <div className="restDetails">
            <h1 className="heading">{display.title}</h1>
            <div className="authorDetails">
              <h3>{display.authors}</h3>
              <p>
                <span>{display.publishedDate}</span>
              </p>
            </div>
            <p className="para">{display.description}</p>
            <div className="Extra-info">
              <p>
                Avg Rating : <span>{display.averageRating || 5}</span>
              </p>
              <p>
                Rating Count : <span>{display.ratingsCount || 8}</span>
              </p>
              <p>
                Publisher : <span>{display.publisher}</span>
              </p>
              <p>
                Language : <span>{display.language.toUpperCase()}</span>
              </p>
            </div>
            <div className="btn">
              <button onClick={(e) => nowRead(display.previewLink)}>
                Now Read
              </button>
              <button onClick={(e) => moreInfo(display.infoLink)}>
                More Info
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="data">
        <div className="container">
          {searchResults.length > 0
            ? searchResults.map((Element) => (
                <div
                  className="books"
                  onClick={(e) => displayDetails(Element.volumeInfo)}
                >
                  <img src={Element.volumeInfo.imageLinks.thumbnail} />
                </div>
              ))
            : data.map((Element) => (
                <div
                  className="books"
                  onClick={(e) => displayDetails(Element.volumeInfo)}
                >
                  <img src={Element.volumeInfo.imageLinks.thumbnail} />
                </div>
              ))}

          {/* {
         data2.map((Element) => (
           <div className="books">
            
               <img src={Element.volumeInfo.imageLinks.smallThumbnail} />
             
           </div>
         ))
         } */}
        </div>
      </div>
    </div>
  );
};
export default SearchBar;
