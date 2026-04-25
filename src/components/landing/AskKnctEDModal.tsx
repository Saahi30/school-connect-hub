import * as React from "react";
import { Sparkles, Send, X, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

type ChatMessage = { role: "user" | "assistant"; content: string };

const INTRO: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I'm Ask KnctED. What's the biggest pain point at your school — fees, attendance, exams, or something else?",
};

interface AskKnctEDModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const bubbleVariants = {
  initial: { opacity: 0, y: 4 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.12, ease: "easeOut" as const },
  },
};

const TypingDots = () => (
  <div className="flex items-center gap-1 px-1">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="block h-1.5 w-1.5 rounded-full bg-slate-400"
        animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
      />
    ))}
  </div>
);

export const AskKnctEDModal: React.FC<AskKnctEDModalProps> = ({ open, onOpenChange }) => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([INTRO]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      });
    }
  }, [messages, loading, open]);

  const send = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    setError(null);
    const next: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("ask-knctED", {
        body: { messages: next },
      });
      if (fnError) throw fnError;
      const reply: string = data?.reply ?? "Sorry, could you rephrase?";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      if (data?.lead_captured) setSubmitted(true);
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const reset = () => {
    setMessages([INTRO]);
    setInput("");
    setSubmitted(false);
    setError(null);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) setTimeout(reset, 200); }}>
      <DialogContent className="p-0 overflow-hidden max-w-lg sm:max-w-xl gap-0 bg-white border-0 shadow-2xl">
        <DialogTitle className="sr-only">Ask KnctED</DialogTitle>

        {/* Header */}
        <div className="relative flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/30">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Ask KnctED</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] uppercase tracking-wider">
                <Sparkles className="h-3 w-3" /> AI
              </span>
            </div>
            <p className="text-[11px] text-white/80 flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
              </span>
              Online · usually replies in seconds
            </p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-full p-1.5 text-white/80 hover:bg-white/10 hover:text-white transition"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <ScrollArea className="h-[420px] bg-gradient-to-b from-slate-50 to-white">
          <div ref={scrollRef} className="px-5 py-4 space-y-3">
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  variants={bubbleVariants}
                  initial="initial"
                  animate="animate"
                  className={cn(
                    "flex",
                    m.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap shadow-sm",
                      m.role === "user"
                        ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-br-sm"
                        : "bg-white text-slate-800 border border-slate-200 rounded-bl-sm"
                    )}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                    <TypingDots />
                  </div>
                </motion.div>
              )}

              {submitted && (
                <motion.div
                  key="submitted"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 text-sm flex items-center gap-2"
                >
                  <span className="text-base">✓</span>
                  Your details are with our team. We'll reach out within one business day.
                </motion.div>
              )}

              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>

        {/* Composer */}
        <div className="border-t border-slate-200 bg-white p-3">
          <div className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about attendance, fees, exams…"
              className="min-h-[44px] max-h-32 resize-none border-slate-200 focus-visible:ring-indigo-500"
              rows={1}
              disabled={loading}
            />
            <motion.div whileTap={{ scale: 0.92 }}>
              <Button
                type="button"
                size="icon"
                onClick={send}
                disabled={loading || !input.trim()}
                className="h-11 w-11 shrink-0 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 shadow-md shadow-indigo-500/30"
              >
                <Send className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
          <p className="mt-2 text-[10px] text-slate-400 text-center">
            Press Enter to send · Shift+Enter for new line
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
