import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { MessageCircleQuestion, Plus, X, Trash2 } from "lucide-react";
import { Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputFooter, PromptInputSubmit, PromptInputTextarea, PromptInputTools } from "@/components/ai-elements/prompt-input";
import { Loader } from "@/components/ai-elements/loader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import logo from "@/assets/MoshLogo.png";

type Thread = { id: string; title: string; messages: UIMessage[] };
const newThread = (): Thread => ({ id: crypto.randomUUID(), title: "New chat", messages: [] });

const SUGGESTIONS = [
  "What are Moshood's main skills?",
  "Tell me about his projects",
  "Which Generative AI certifications does he have?",
];

function ChatWindow({ thread, onUpdate }: { thread: Thread; onUpdate: (m: UIMessage[]) => void }) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/portfolio-chat`,
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
      }),
    [],
  );
  const { messages, sendMessage, status, stop } = useChat({
    id: thread.id,
    messages: thread.messages,
    transport,
    onError: (e) => toast.error(e.message || "The assistant couldn't answer. Please try again."),
  });

  useEffect(() => {
    if (status === "ready" || status === "error") onUpdate(messages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, messages.length]);

  useEffect(() => {
    if (status === "ready") inputRef.current?.focus();
  }, [status, thread.id]);

  const busy = status === "submitted" || status === "streaming";
  const send = (text: string) => {
    if (!text.trim() || busy) return;
    sendMessage({ text });
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <Conversation className="flex-1 min-h-0">
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState>
              <div className="flex flex-col items-center gap-3">
                <img src={logo} alt="" className="h-10 w-auto" />
                <p className="text-sm font-medium">Ask about Moshood</p>
                <div className="flex flex-col gap-2 w-full">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-left text-xs rounded-lg border border-border px-3 py-2 hover:bg-accent transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </ConversationEmptyState>
          ) : (
            messages.map((m) => (
              <Message key={m.id} from={m.role}>
                <MessageContent>
                  {m.parts.map((p, i) =>
                    p.type === "text" ? (
                      m.role === "assistant" ? <MessageResponse key={i}>{p.text}</MessageResponse> : <span key={i}>{p.text}</span>
                    ) : null,
                  )}
                </MessageContent>
              </Message>
            ))
          )}
          {status === "submitted" && <Loader />}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <div className="p-3 border-t border-border">
        <PromptInput onSubmit={(msg) => send(msg.text ?? "")}>
          <PromptInputTextarea ref={inputRef} placeholder="Ask a question…" autoFocus />
          <PromptInputFooter>
            <PromptInputTools />
            <PromptInputSubmit status={status} onClick={busy ? (e) => { e.preventDefault(); stop(); } : undefined} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}

const PortfolioAssistant = () => {
  const [open, setOpen] = useState(false);
  const [threads, setThreads] = useState<Thread[]>(() => [newThread()]);
  const [activeId, setActiveId] = useState(() => threads[0].id);
  const active = threads.find((t) => t.id === activeId) ?? threads[0];

  const update = (id: string, messages: UIMessage[]) =>
    setThreads((ts) =>
      ts.map((t) => {
        if (t.id !== id) return t;
        const first = messages.find((m) => m.role === "user");
        const firstText = first?.parts.find((p) => p.type === "text") as { text?: string } | undefined;
        return { ...t, messages, title: firstText?.text?.slice(0, 40) || t.title };
      }),
    );

  const create = () => {
    const t = newThread();
    setThreads((ts) => [t, ...ts]);
    setActiveId(t.id);
  };

  const remove = (id: string) => {
    setThreads((ts) => {
      const rest = ts.filter((t) => t.id !== id);
      const next = rest.length ? rest : [newThread()];
      if (id === activeId) setActiveId(next[0].id);
      return next;
    });
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[min(600px,75vh)] rounded-2xl border border-border bg-background shadow-2xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-navbar text-navbar-foreground">
            <div className="flex items-center gap-2">
              <img src={logo} alt="" className="h-6 w-auto" />
              <span className="font-semibold text-sm">Ask about Moshood</span>
            </div>
            <div className="flex items-center gap-1">
              <Button size="icon" variant="ghost" className="h-8 w-8 text-navbar-foreground hover:bg-navbar-foreground/10" onClick={create} aria-label="New chat">
                <Plus size={16} />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-navbar-foreground hover:bg-navbar-foreground/10" onClick={() => setOpen(false)} aria-label="Close">
                <X size={16} />
              </Button>
            </div>
          </div>
          {threads.length > 1 && (
            <div className="flex gap-1 overflow-x-auto px-2 py-2 border-b border-border">
              {threads.map((t) => (
                <div
                  key={t.id}
                  className={`flex items-center shrink-0 rounded-full text-xs border ${t.id === activeId ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}
                >
                  <button className="pl-3 pr-1 py-1 max-w-[140px] truncate" onClick={() => setActiveId(t.id)}>
                    {t.title}
                  </button>
                  <button className="pr-2 pl-1 py-1 opacity-70 hover:opacity-100" onClick={() => remove(t.id)} aria-label="Delete chat">
                    <Trash2 size={11} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <ChatWindow key={active.id} thread={active} onUpdate={(m) => update(active.id, m)} />
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Ask about Moshood"
        className="fixed bottom-6 right-4 sm:right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
      >
        {open ? <X size={22} /> : <MessageCircleQuestion size={24} />}
      </button>
    </>
  );
};

export default PortfolioAssistant;
