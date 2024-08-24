"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataRequestFormSchema, TDataRequestForm } from "@/lib/formSchemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

function DataRequestForm() {
  const form = useForm<TDataRequestForm>({
    resolver: zodResolver(DataRequestFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      projectTitle: "",
      projectDescription: "",
      dataRequirements: "",
      timeRange: "",
      preferredFormat: "",
    },
  });

  const onSubmit: SubmitHandler<TDataRequestForm> = (data) => {
    console.log("Form data:", data);
  };
  return (
    <div className="max-w-xl">
      <h4 className="text-xl font-medium">Data Request Form</h4>
      <p className="text-base text-[#767676E5] my-5">
        Please fill in the following details of the data request form:
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name:</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your phone number"
                    type="tel"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="projectTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project title:</FormLabel>
                <FormControl>
                  <Input placeholder="Enter project title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="projectDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project description:</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dataRequirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data Requirements:</FormLabel>
                <FormControl>
                  <Input placeholder="Enter input text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timeRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time Range:</FormLabel>
                <FormControl>
                  <Input placeholder="Enter input text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preferredFormat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred format for data delivery:</FormLabel>
                <FormControl>
                  <Input placeholder="Enter input text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default DataRequestForm;
