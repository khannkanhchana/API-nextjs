
import Link from "next/link";
import { fetchPost } from "@/lib/data/fetchPosts";

import Cards from "@/components/Card";


export default async function PostPage() {
    //received data
    const posts = await fetchPost();
    return(
    
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
           {posts.map((post,index)=>(
            <Link 
            key={index}
            href={`/postblog/blog/${post.id}`}>
                <Cards
                key={index}
                userId={post.userId}
                id={post.id}
                title={post.title}
                body={post.body}
                />
            </Link>
           ))}
        </div>
    )
}