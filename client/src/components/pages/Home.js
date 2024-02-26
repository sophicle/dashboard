import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import Bookmark from "../modules/Bookmark";

const Home = () => {
  const [bookmarkName, setBookmarkName] = useState("");
  const [bookmarkLink, setBookmarkLink] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    get("/api/bookmarks").then((bookmarkObjs) => {
      setBookmarks(bookmarkObjs);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!bookmarkName || !bookmarkLink) {
      setErrorMessage("Please fill in both the bookmark name and link.");
      return;
    }

    const body = { name: bookmarkName, link: bookmarkLink, type: "url" };

    try {
      const newBookmark = await post("/api/bookmark", body);
      setBookmarks([...bookmarks, newBookmark]); // Update the local state with the new bookmark
      setSuccessMessage(`Bookmark '${bookmarkName}' was successfully added.`);
      setBookmarkName(""); // Clear the inputs
      setBookmarkLink("");
    } catch (error) {
      setErrorMessage("Failed to add the bookmark. Please try again.");
      console.error("Error adding bookmark:", error);
    }
  };

  return (
    <div className="container mx-auto">
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div>
          <label htmlFor="bookmarkName">Bookmark Name:</label>
          <input
            type="text"
            id="bookmarkName"
            value={bookmarkName}
            onChange={(e) => setBookmarkName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="bookmarkLink">Bookmark Link:</label>
          <input
            type="url"
            id="bookmarkLink"
            value={bookmarkLink}
            onChange={(e) => setBookmarkLink(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Bookmark</button>
      </form>
      <div className="flex flex-wrap justify-center">
        {bookmarks.map((bookmark, index) => (
          <Bookmark key={index} name={bookmark.name} link={bookmark.link} />
        ))}
      </div>
    </div>
  );
};

export default Home;
