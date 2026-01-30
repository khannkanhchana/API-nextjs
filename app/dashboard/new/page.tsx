"use client"
import ProductForm from "@/components/form-product";
import { ProductForm2 } from "@/components/forms/insert-form";
import ToastTest from "@/components/my-toast";
import ProductViewPage from "@/components/product-view-page";


export default function ProductPage(){
    return(
        <main className="flex justify-center items-center h-screen">
        {/* <ToastTest/> */}
        {/* <ProductViewPage productId={"new"}/> */}
        {/* <div className="flex justify-center"><ProductForm2/></div> */}
        <ProductForm2/>
        </main>
    )
}