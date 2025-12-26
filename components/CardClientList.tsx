import Link from "next/link";
import { Card } from "./ui/card";
import { fetchPost } from "@/lib/data/fetchPosts";
import { PostResponse } from "@/lib/types/posts";
import { use } from "react";

export function CardClientList(
    {fetchPost}: {fetchPost: Promise<PostResponse[]>}){
        //use hook
        const posts = use(fetchPost);
        console.log(posts)
    

    return(

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            
            {
                posts.map((post, index)=>(
                    
                <Link
                key={index}
                href={`/dashboard/blog/${post.id}`} >
                <Card
                    key={index}
                    userId={post.userId}
                    id={post.id}
                    title={post.title}
                    body={post.body}    
                    />
                </Link>
               
           
                ))
            }
        </div>
    )
}