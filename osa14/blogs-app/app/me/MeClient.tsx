"use client";

import { useState } from "react";
import { markAsRead } from "../actions/readingList";
import { generateToken } from "../actions/users";

export interface User {
  id: number;
  name: string;
  username: string;
  token: string;
  readingListEntries: ReadingListEntry[];
}
interface BlogLite {
  title: string;
  author: string;
}
interface ReadingListEntry {
  id: number;
  blogId: number;
  read: boolean;
  blog: BlogLite;
}
interface Props {
  user: User;
}
export default function MeClient({ user }: Props) {
  const readBlogs = user.readingListEntries.filter((rle) => rle.read);
  const unreadBlogs = user.readingListEntries.filter((rle) => !rle.read);
  const [token, setToken] = useState(user.token);

  const handleGenerateToken = async () => {
    const newToken = await generateToken(user.id);
    setToken(newToken);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="shadow-md rounded-sm p-4 w-xl mt-10">
        <div data-testid="user-profile">
          <h2 className="font-bold mb-5">My Profile</h2>
          <p>
            <span className="font-bold">Name: </span>
            <span data-testid="user-name">{user.name}</span>
          </p>
          <p>
            <span className="font-bold">Username: </span>
            <span data-testid="user-username">{user.username}</span>
          </p>
        </div>
        <div className="border-b py-4"></div>
        <div className="pt-4">
          <h2 className="font-bold mb-5">Reading List</h2>
          <h3 className="font-semibold">Unread ({unreadBlogs.length})</h3>
          <div data-testid="unread-section">
            {unreadBlogs.length > 0 ? (
              unreadBlogs.map((rle) => (
                <div className="bg-yellow-100 p-2" key={rle.id}>
                  <span className="text-blue-500">
                    {rle.blog.title} - {rle.blog.author}
                  </span>
                  <button
                    data-testid={`mark-read-${rle.id}`}
                    onClick={() => markAsRead(rle.id)}
                    className="ml-2 bg-green-500 p-2 rounded text-white"
                  >
                    mark as read
                  </button>
                </div>
              ))
            ) : (
              <p data-testid="no-unread-blogs">
                No unread blogs in reading list
              </p>
            )}
          </div>
          <h3 className="font-semibold mt-4">Read ({readBlogs.length})</h3>
          <div data-testid="reading-list-section">
            {readBlogs.length > 0 ? (
              readBlogs.map((rle) => (
                <div className="bg-green-100 p-2" key={rle.id}>
                  <span className="text-blue-500">
                    {rle.blog.title} - {rle.blog.author}
                  </span>
                </div>
              ))
            ) : (
              <p data-testid="empty-reading-list">
                No unread blogs in reading list
              </p>
            )}
          </div>
        </div>
        <div className="border-b py-4"></div>
        <div data-testid="api-token-section" className="pt-4">
          <h2 className="font-bold mb-5">API Token</h2>
          <div className="bg-gray-200 p-2">
            <p className="text-gray-500">Current token:</p>
            <div data-testid="api-token" className="p-2 bg-gray-100">
              {token ? (
                <span
                  data-testid="token-display"
                  className="inline-block max-w-lg truncate align-bottom"
                >
                  {token}
                </span>
              ) : (
                <span data-testid="no-token-message">No token generated</span>
              )}
            </div>
          </div>
          <button
            onClick={handleGenerateToken}
            data-testid="generate-token-button"
            className="bg-blue-500 p-2 rounded text-white mt-2"
          >
            Generate New Token
          </button>
        </div>
      </div>
    </div>
  );
}
