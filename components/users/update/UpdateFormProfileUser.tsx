"use client";

import { useFetchData } from "@/hooks/useFetchData";
import { useUpdateData } from "@/hooks/useUpdateData";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { profileSchema } from "@/schema/schema";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircleIcon } from "lucide-react";

const UpdateFormProfileUser = ({id}: any) => {
  const { data: userData, isLoading } = useFetchData({
    queryKey: ["usersData"],
    dataProtected: `profile/user/${id}`,
  });

  const preLoadValues = {
    gender: userData?.data.profile.gender,
    fullname: userData?.data.profile.fullname,
    address: userData?.data.profile.address,
    phoneNumber: userData?.data.profile.phoneNumber,
    image: userData?.data.profile.image,
  };

  console.log(preLoadValues)

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: preLoadValues || [],
  });


  const mutationUpdateProfile = useUpdateData({
    queryKey: "usersData",
    dataProtected: `profile/user/${id}`,
    backUrl: "/dashboard/users",
  });
  
  const imageRef = form.register("image");

  const onSubmit = async (data: FieldValues) => {
    const form = new FormData();
    form.append("fullname", data.fullname);
    form.append("address", data.address);
    form.append("phoneNumber", data.phoneNumber);
    form.append("gender", data.gender);
    if (data.image[0] !== undefined) {
      form.append("image", data.image[0]);
    }

    console.log(form)
    console.log(data)
    mutationUpdateProfile.mutate(data);
  };

  
  return (
    <div className="mt-6">
    
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Users Profile</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
          
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Fullname</FormLabel>
                    <FormControl>
                      <Input placeholder="fullname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Gender</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
      

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                  <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                      <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input type="file" placeholder="Image" {...imageRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </CardContent>
            <CardFooter>
              <Button type="submit">Save changes</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
     
    </div>
  );
};

export default UpdateFormProfileUser;
