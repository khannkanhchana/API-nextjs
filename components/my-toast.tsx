import { toast } from "sonner";
import { Button } from "./ui/button";

export default function ToastTest(){
    return(
        <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          position: "top-center",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      Show Toast
    </Button>


    )
}