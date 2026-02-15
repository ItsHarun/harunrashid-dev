import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layout } from "@/components/Layout";
import { useSendMessage } from "@/hooks/use-content";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { Loader2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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

export default function Contact() {
  const { toast } = useToast();
  const sendMessage = useSendMessage();
  const [success, setSuccess] = useState(false);

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertMessage) => {
    sendMessage.mutate(data, {
      onSuccess: () => {
        setSuccess(true);
        form.reset();
        toast({
          title: "Message sent",
          description: "I'll get back to you as soon as possible.",
        });
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      },
    });
  };

  return (
    <Layout>
      <div className="grid md:grid-cols-2 gap-16 md:gap-24 animate-in-up">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight">Contact</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Minimal communication. <br />
            High signal, low noise.
          </p>

          <div className="space-y-4 pt-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Or find me at</h3>
            <ul className="space-y-2 font-mono text-sm">
              <li>
                <a href="mailto:hello@harunrashid.dev" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-200 block">
                  hello@harunrashid.dev
                </a>
              </li>
              <li>
                <a href="https://x.com/harundev" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-200 block">
                  @harundev on X
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/harun-rashid-offl/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-200 block">
                  Harun Rashid on LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="delay-200">
          {success ? (
            <div className="h-full flex flex-col justify-center items-center text-center space-y-4 py-12 border border-border bg-secondary/20 p-8">
              <div className="h-12 w-12 rounded-full bg-foreground flex items-center justify-center">
                <Send className="h-5 w-5 text-background" />
              </div>
              <h3 className="text-xl font-medium">Message Received</h3>
              <p className="text-muted-foreground">Thank you for reaching out.</p>
              <button
                onClick={() => setSuccess(false)}
                className="text-sm font-mono underline underline-offset-4 hover:text-muted-foreground transition-colors mt-4 duration-400"
              >
                Send another
              </button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Jane Doe"
                          {...field}
                          className="bg-transparent border-0 border-b border-border rounded-none px-0 py-4 h-auto focus-visible:ring-0 focus-visible:border-foreground transition-colors placeholder:text-muted-foreground/30 font-light text-lg duration-400"
                        />
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
                      <FormLabel className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="jane@example.com"
                          {...field}
                          className="bg-transparent border-0 border-b border-border rounded-none px-0 py-4 h-auto focus-visible:ring-0 focus-visible:border-foreground transition-colors placeholder:text-muted-foreground/30 font-light text-lg duration-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What's on your mind?"
                          {...field}
                          className="bg-transparent border-0 border-b border-border rounded-none px-0 py-4 min-h-[120px] resize-none focus-visible:ring-0 focus-visible:border-foreground transition-colors placeholder:text-muted-foreground/30 font-light text-lg duration-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  disabled={sendMessage.isPending}
                  className="group flex items-center gap-4 text-sm font-mono uppercase tracking-widest hover:text-muted-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed duration-400"
                >
                  {sendMessage.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <span className="h-2 w-2 bg-foreground group-hover:bg-muted-foreground transition-colors duration-400" />
                  )}
                  {sendMessage.isPending ? "Sending..." : "Submit Message"}
                </button>
              </form>
            </Form>
          )}
        </div>
      </div>
    </Layout >
  );
}
