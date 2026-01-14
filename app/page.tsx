
import { LoadingCard } from "@/components/LoadingCard";
import { Button } from "@/components/ui/button";
import { Angry, ArrowRight, BookHeart } from "lucide-react";


export default function Home() {
  return (
    <>
    <div className="flex justify-center items-center flex-row gap-4">
       <Button variant="destructive">
        <Angry/>
       </Button>
       <Button variant="destructive">
        <BookHeart/>
       </Button>

        <Button variant="destructive">
        <ArrowRight/>
       </Button>

       {/* <Cards
        userId={1}
        id={1}
        title={"Hello សួស្តី"}
        body={"Default សូមស្វាគមន៍"}
       /> */}

       
       
      
    </div>
    
    <LoadingCard/>
    {/* <CardClientList fetchPost={fetchPost()}/> */}
    </>
  );
}

// "use client"
// import { CardClientList } from "@/components/CardClientList";
// import { fetchPost } from "@/lib/data/fetchPosts";

// export default function Home() {
//   return (
//     <>
//   <CardClientList fetchPost={fetchPost()}/>
//     </>
//   );
// }

