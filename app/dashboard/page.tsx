import { PostCard } from "@/app/components/PostCard";
import { PostResponse } from "../lib/posts";
import Link from "next/link";

async function fetchPost() {
    const BASE_API = process.env.NEXT_PUBLIC_API_URL;
    const data = await fetch(`${BASE_API}posts`);
    const posts:PostResponse[] = await data.json();
    return posts;
    
}
export default  async function DashboardPage() {
        
    const posts = await fetchPost();

    return(
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            
            {
                posts.map((post)=>(
            <div key={post.id}>
                <Link href={`/dashboard/blog/${post.id}`} key={post.id}>
                <PostCard
                    key={post.id}
                    userId={post.userId}
                    id={post.id}
                    title={post.title}
                    body={post.body}    
                    />
                </Link>
            </div>
                ))
            }
        </div>
    )
}