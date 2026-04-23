"use client";
import React, { useState } from "react";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const SignInPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: userData.email,
      password: userData.password,
      rememberMe: true,
      callbackURL: "/",
    });

    if (error) {
      alert(error.message);
    }

    if (data) {
      alert("Login Successful!");
    }
  };

  return (
    <section className="my-15">
      <div className="flex flex-col gap-5 items-center">
        <h2 className="text-2xl font-bold">Please Sign In</h2>

        <div className="p-4 border rounded-xl max-w-fit">
          <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
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
            <TextField className="w-full" name="password">
              <Label>Password</Label>
              <InputGroup>
                <InputGroup.Input
                  className="w-full"
                  type={isVisible ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                />

                <InputGroup.Suffix className="pr-0">
                  <Button
                    isIconOnly
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    size="sm"
                    variant="ghost"
                    onPress={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? (
                      <Eye className="size-4" />
                    ) : (
                      <EyeSlash className="size-4" />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>
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

export default SignInPage;
