import Cards from "@/components/Card";
import { CardClientList } from "@/components/CardClientList";
import { LoadingCard } from "@/components/LoadingCard";
import { Button } from "@/components/ui/button";
import { fetchPost } from "@/lib/data/fetchPosts";
import { Angry, ArrowRight, BookHeart } from "lucide-react";
import Image from "next/image";

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
