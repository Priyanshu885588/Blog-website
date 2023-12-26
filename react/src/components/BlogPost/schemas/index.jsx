import * as Yup from "yup";

export const formSchema = Yup.object({
  title: Yup.string().min(3).required("Please enter your title"),
  tags: Yup.string()
    .required("Enter at least one tag")
    .matches(/^\S*$/, "Tags should be a single word with no spaces"),
  content: Yup.string().min(10).required(),
});
