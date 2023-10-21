"use client";

import React, { useState } from "react";
import {useRouter} from 'next/navigation'
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn} from 'next-auth/react'

import useLoginModal from "@hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "@components/Heading";
import Input from "@components/inputs/Input";
import { toast } from "react-hot-toast";
import Button from "@components/Button";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {...data, redirect: false}).then((callback) => {
        setIsLoading(false);

        if(callback?.ok) {
            toast.success('Logged in');
            router.refresh()
            loginModal.onClose()
        }

        if(callback?.error) {
            toast.error(callback.error)
        }
    })
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
        <Heading title="Welcome back" subtitle="Login to your account!"/>
        <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
        <Input id="password" label="Password" disabled={isLoading} register={register} errors={errors} required />
    </div>
  );

  const footerContent =();



  return (<Modal disabled={isLoading} isOpen={loginModal.isOpen} title="Login" action='Continue' onClose={loginModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent} />)
};

export default LoginModal;
