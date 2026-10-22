import type { Post } from "./types";
import { sampleComments, samplePosts } from "./sampleData";

const POSTS_KEY = "miniblog_posts";

export function readPosts(): Post[] {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(POSTS_KEY) || "[]");
    if (!Array.isArray(data)) return [];
    return data.filter(
      (post): post is Post =>
        post !== null &&
        typeof post === "object" &&
        typeof post.id === "string" &&
        post.id.startsWith("local-") &&
        typeof post.title === "string" &&
        typeof post.body === "string" &&
        typeof post.userId === "number",
    );
  } catch {
    return [];
  }
}

export function savePost(post: Post) {
  localStorage.setItem(POSTS_KEY, JSON.stringify([post, ...readPosts()]));
}

export function readAllPosts(): Post[] {
  return [...readPosts(), ...samplePosts];
}

export function readComments(postId: Post["id"]) {
  return sampleComments.filter((comment) => comment.postId === postId);
}

export function hasSession() {
  try {
    return sessionStorage.getItem("miniblog_user") === "admin";
  } catch {
    return false;
  }
}
