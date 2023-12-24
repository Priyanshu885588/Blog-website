import * as Yup from "yup";

export const formSchema = Yup.object({
    title:Yup.string().min(3).required("Please enter your title"),
    tags:Yup.string().required("enter at least one tag"),
    content:Yup.string().min(10).required(),
});