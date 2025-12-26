import { PostCard } from "@/components/PostCard";
import { PostResponse } from "../../lib/types/posts";
import Link from "next/link";
import { fetchPost } from "@/lib/data/fetchPosts";
import { Card } from "@/components/ui/card";
import { Key } from "lucide-react";


export default  async function DashboardPage() {
        
    const posts = await fetchPost();

    return(
         <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
            {
                posts.map((post) => (
                    //make sure objects are passed as props to PostCard component
                    //console.log(post)
                <div key={post.id}>
                <Link href= {` /dashboard/blog/${post.id}`} >
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