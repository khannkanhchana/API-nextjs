import { PostCard } from "@/components/PostCard";

async function fetchDetailPost(id: string) {
   const BASE_API = process.env.NEXT_PUBLIC_API_URL;
    const data = await fetch(`${BASE_API}posts/${id}`);
    const post = await data.json();
    return post;
    
}
export default async function BlogSlugPage({
    params 
}: {
    params: Promise<{ slug: string }>;
}
){
    const { slug } = await params;
    const post = await fetchDetailPost(slug);
    console.log(post);
    return(
        
        <PostCard
            userId={post.userId}
            id={post.id}
            title={post.title}
            body={post.body}
        />
        
    )


} 