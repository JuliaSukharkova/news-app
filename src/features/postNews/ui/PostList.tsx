import { useEffect, useRef, useState } from "react";
import { PostCard } from "../../../entities/post/ui/PostCard";
import { Spin } from "antd";
import type { Post } from "../../../entities/post/model/types";
import { useGetPostsQuery } from "../model/postApi";

export const PostsList = () => {
  const [skip, setSkip] = useState(0);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading } = useGetPostsQuery({ limit: 10, skip });

  useEffect(() => {
    if (data?.posts) {
      setAllPosts((prev) => [...prev, ...data.posts]);
    }
  }, [data]);

  useEffect(() => {
    const currentLoader = loaderRef.current;

    if (!currentLoader) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isLoading) {
        setSkip((prev) => prev + 10);
      }
    });

    observer.observe(currentLoader);

    return () => {
      observer.unobserve(currentLoader);
    };
  }, [isLoading]);

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      {allPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <div ref={loaderRef} style={{ height: 1 }} />
      {isLoading && (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Spin />
        </div>
      )}
    </div>
  );
};
