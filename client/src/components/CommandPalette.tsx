import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Command } from "cmdk";
import { 
  Home, 
  BrainCircuit, 
  Component, 
  Quote, 
  Clock, 
  Mail,
  Search,
  ExternalLink
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [_, setLocation] = useLocation();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Use code instead of key for more reliability
      if (e.code === "Slash" && !e.ctrlKey && !e.metaKey && !e.altKey && 
          !(e.target instanceof HTMLInputElement) && 
          !(e.target instanceof HTMLTextAreaElement) &&
          !(e.target instanceof HTMLSelectElement) &&
          !(e.target as HTMLElement).isContentEditable) {
        
        e.preventDefault();
        e.stopPropagation();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down, true); // Use capture phase
    return () => document.removeEventListener("keydown", down, true);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    setTimeout(command, 10); // Small delay to ensure dialog closes cleanly
  };

  const pages = [
    { name: "Philosophy", route: "/", icon: Home },
    { name: "Thinking", route: "/thinking", icon: BrainCircuit },
    { name: "Kue", route: "/kue", icon: Component },
    { name: "Beliefs", route: "/beliefs", icon: Quote },
    { name: "Now", route: "/now", icon: Clock },
    { name: "Contact", route: "/contact", icon: Mail },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 overflow-hidden bg-transparent border-none shadow-none max-w-[640px]">
        <Command label="Global Command Menu" loop>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input placeholder="Type a command or search..." />
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            <Command.Empty>No results found.</Command.Empty>
            
            <Command.Group heading="Navigation">
              {pages.map((page) => (
                <Command.Item
                  key={page.route}
                  onSelect={() => runCommand(() => setLocation(page.route))}
                >
                  <page.icon className="mr-2 h-4 w-4" />
                  {page.name}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Social">
              <Command.Item
                onSelect={() => runCommand(() => window.open("https://twitter.com", "_blank"))}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Twitter
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => window.open("https://github.com", "_blank"))}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                GitHub
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
