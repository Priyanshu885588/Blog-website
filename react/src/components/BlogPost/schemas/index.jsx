import * as Yup from "yup";

export const formSchema = Yup.object({
    title:Yup.string().min(3).required("Please enter your title"),
    tags:Yup.string().required("enter at least one tag"),
    author:Yup.string().min(2).required("Please enter the author name"),
    content:Yup.string().min(10).required(),

});