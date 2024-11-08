import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import api from "@/Config/api";

function SignIn() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await api.post("/login", data);
            localStorage.setItem("auth", JSON.stringify({ ...response?.data }));
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex max-w-md mx-auto flex-col h-screen justify-center gap-5">
            <div className="bg-white flex flex-col gap-6 p-10 rounded-md shadow-lg">
                <h1 className="text-3xl font-bold underline">Laravel Here</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Your Email"
                        placeholder="Email"
                        name="email"
                        register={register}
                        validation={{
                            required: "Email Address is required",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Invalid email address",
                            },
                        }}
                        errors={errors}
                        defaultValue="john.doe3@example.com"
                    />

                    <Input
                        label="Your Password"
                        placeholder="Password"
                        name="password"
                        register={register}
                        validation={{ required: "Password is required" }}
                        errors={errors}
                        defaultValue="password123"
                    />
                    <Button title="Sign In" type="submit" />

                    <Link to="/signup">
                        <div className="font-bold text-center cursor-pointer">
                            Create a new account
                        </div>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default SignIn;