import * as Yup from "yup";

export const signInSchema = Yup.object({
    email:Yup.string().required("Please enter your email").email(),
    password:Yup.string().min(6).required(),
});

export const signUpSchema = Yup.object({
    name:Yup.string().required("Please enter your name").min(3),
    email:Yup.string().required("Please enter your email").email(),
    password:Yup.string().min(6).required(),
    ConfirmPassword: Yup.string().label('confirm password').required().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});