"use client";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import retreiveUserDataFromCookie from "@/helper/retriveUserDataFromCookie";
import { useFetchData } from "@/hooks/useFetchData";
import { useUpdateData } from "@/hooks/useUpdateData";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

const formSchema = z.object({
  fullname: z.string(),
  gender: z.nativeEnum(Gender),
  address: z.string(),
  phoneNumber: z.string(),
  image: z.any().optional(),
});

const UpdateFormProfileSettings = () => {
  const userDataFromCookie = retreiveUserDataFromCookie();
  const { data: userProfileData, isLoading } = useFetchData({
    queryKey: ["userProfileData"],
    dataProtected: `profile/user/${userDataFromCookie.sub}`,
  });

  const preLoadValues = {
    fullname: userProfileData?.data.fullname,
    gender: userProfileData?.data.gender,
    address: userProfileData?.data.address,
    phoneNumber: userProfileData?.data.phoneNumber,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: preLoadValues || [],
  });

  const imageRef = form.register("image");

  const mutationUpdateProfile = useUpdateData({
    queryKey: "userProfileData",
    dataProtected: `profile/user/${userDataFromCookie.sub}`,
  });

  const onSubmit = async (data: FieldValues) => {
    const form = new FormData();
    form.append("fullname", data.fullname);
    form.append("address", data.address);
    form.append("phoneNumber", data.phoneNumber);
    form.append("gender", data.gender);

    if (data.image[0] !== undefined) {
      form.append("image", data.image[0]);
    }

    mutationUpdateProfile.mutate(form);
  };

  return (
    <div className="md:col-span-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Update Profile</CardTitle>
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
                    <FormLabel>Fullname</FormLabel>
                    <FormControl>
                      <Input placeholder="Fullname" {...field} />
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
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified gender to display" />
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
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="phoneNumber" {...field} />
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
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
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

export default UpdateFormProfileSettings;
