"use client";

import { FormEventHandler } from "react";

export default function RegisterBookFormScreen() {
  
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const bookTitle = form.get("bookTitle") || "";
    const author = form.get("author") || "";
    
    const queryParts = [];
    if (bookTitle) queryParts.push(`intitle:${bookTitle}`);
    if (author) queryParts.push(`inauthor:${author}`);
    const query = queryParts.join('+');
    
    const apiKey = process.env.GOOGLE_BOOKS_API;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${apiKey}`;
    
    console.log('Fetching:', url);
    
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Response:', data);
        if (data.items && data.items.length > 0) {
          console.log('Book info:', data.items[0].volumeInfo);
        } else {
          console.log('No books found');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center font-sans text-zinc-800">
      <h1 className="text-4xl font-bold">
        書籍登録フォーム
      </h1>
      <form className="flex flex-row gap-4" onSubmit={handleSubmit}>
        <label className="font-bold">
          書籍タイトル :
          <input className="border border-gray-300 rounded-md p-2 mx-2" type="text" name="bookTitle" defaultValue="" />
        </label>
        <label className="font-bold">
          著者名 :
          <input className="border border-gray-300 rounded-md p-2 mx-2" type="text" name="author" defaultValue="" />
        </label>
        <input type="submit" value="検索" />
      </form>
    </div>
  );
}