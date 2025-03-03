import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner"

import { format } from "date-fns"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar"
import { Check, ChevronsUpDown } from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react"
import { Textarea } from "@/components/ui/textarea";

import axios from "axios";

const formSchema = z.object({
    isbn: z.string().min(1).min(1).max(50),
    author: z.string().min(1).min(1).max(30),
    title: z.string().min(1).min(1).max(50),
    category: z.string().min(1).max(50),
    shelf: z.string().min(1).max(50),
    language: z.string().min(1).min(1).max(30),
    published_date: z.coerce.date(),
    edition: z.string().min(1).min(1).max(50),
    page_count: z.number().min(1).max(50),
    quantity: z.number().min(1).max(50),
    per_book_cost: z.number().min(1).max(50),
    image: z.string().min(1),
    description: z.string().min(1).max(5000)
});

const AddBook = () => {
    const languages = [
        { label: "English", value: "en" },
        { label: "French", value: "fr" },
        { label: "German", value: "de" },
        { label: "Spanish", value: "es" },
        { label: "Portuguese", value: "pt" },
        { label: "Russian", value: "ru" },
        { label: "Japanese", value: "ja" },
        { label: "Korean", value: "ko" },
        { label: "Chinese", value: "zh" },
    ];

    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    function onSubmit(values) {
        try {
            console.log(values);
            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </pre>
            );
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <FormField
                            control={form.control}
                            name="isbn"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ISBN</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter ISBN" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-6">
                        <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Author</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter author name" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter title" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Category</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-[200px] justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? languages.find(
                                                            (language) => language.value === field.value
                                                        )?.label
                                                        : "Select language"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search category..." />
                                                <CommandList>
                                                    <CommandEmpty>No category found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {languages.map((language) => (
                                                            <CommandItem
                                                                value={language.label}
                                                                key={language.value}
                                                                onSelect={() => {
                                                                    form.setValue("category", language.value);
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        language.value === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                                {language.label}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-6">
                        <FormField
                            control={form.control}
                            name="shelf"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Shelf</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-[200px] justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? languages.find(
                                                            (language) => language.value === field.value
                                                        )?.label
                                                        : "Select language"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search shelf..." />
                                                <CommandList>
                                                    <CommandEmpty>No language found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {languages.map((language) => (
                                                            <CommandItem
                                                                value={language.label}
                                                                key={language.value}
                                                                onSelect={() => {
                                                                    form.setValue("shelf", language.value);
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        language.value === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                                {language.label}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <FormField
                            control={form.control}
                            name="language"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Language</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter language" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-6">
                        <FormField
                            control={form.control}
                            name="published_date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Published Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <FormField
                            control={form.control}
                            name="edition"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Edition</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter edition" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-6">
                        <FormField
                            control={form.control}
                            name="page_count"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Page count</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter page count" type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantity</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter quantity" type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-6">
                        <FormField
                            control={form.control}
                            name="field-input"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Per book cost</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter per book cost" type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <Input placeholder="Select image" type="file" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter description" className="resize-none" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

export default AddBook