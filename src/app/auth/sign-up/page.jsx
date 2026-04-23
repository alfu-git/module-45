"use client";
import React from "react";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    console.log(userData);

    const { data, error } = await authClient.signUp.email({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });

    console.log({ data, error });
  };

  return (
    <section className="my-15">
      <div className="flex flex-col gap-10 justify-center items-center">
        <h2 className="text-3xl font-bold">Sign-Up</h2>

        <div className="p-4 border rounded-xl">
          <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
            {/* name */}
            <TextField
              isRequired
              name="name"
              validate={(value) => {
                if (value.length < 3) {
                  return "Name must be at least 3 characters";
                }
                return null;
              }}
            >
              <Label>Name</Label>
              <Input name="name" placeholder="Enter your name" />
              <FieldError />
            </TextField>

            {/* email */}
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label>Email</Label>
              <Input name="email" placeholder="Enter your email" />
              <FieldError />
            </TextField>

            {/* password */}
            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
            >
              <Label>Password</Label>
              <Input name="password" placeholder="Enter your password" />
              <Description>
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
              <FieldError />
            </TextField>

            <div className="flex gap-2">
              <Button type="submit">
                <Check />
                Submit
              </Button>

              <Button type="reset" variant="secondary">
                Reset
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
