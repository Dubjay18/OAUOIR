import React from "react";

function page() {
  return (
    <div className="min-h-[50vh]">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">Article Title</h1>
        <p className="text-gray-600 mb-6">
          By <span className="font-semibold">Author Name</span> on August 24,
          2024
        </p>
        <div className="prose lg:prose-xl">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <h2>Subheading</h2>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <blockquote>
          &quot;Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.&quot;
          </blockquote>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
