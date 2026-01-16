import RegisterForm from "@/components/register-form";

export default function SignUpPage(){
    return(
       <>
        <div className="text-center font-bold">Register Page</div>
        <div className="flex justify-center">
            <RegisterForm />
        </div>
        
        </>
    )
}