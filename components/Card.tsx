import { PostResponse } from "@/lib/types/posts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
export default function Cards({
    userId
    ,id
    ,title
    ,body   
}:PostResponse){



    return(
         <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
            {body}
        </CardDescription>
        <CardFooter>
          <Button variant="link">{userId} | {id}</Button>
        </CardFooter>
      </CardHeader>
      
    </Card>

        

    );
}