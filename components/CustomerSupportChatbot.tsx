"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "ai/react";
import { MessageCircle, RefreshCw, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Loader from "./loader";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
}

interface QuestionFlow {
  id: string;
  question: string;
  options: string[];
  requiresInput?: boolean;
}

const questionFlow: QuestionFlow[] = [
  {
    id: "category",
    question: "What can I help you with today?",
    options: ["Order Issues", "Product Information", "Shipping", "Returns"],
  },
  {
    id: "orderIssues",
    question: "What's the problem with your order?",
    options: [
      "Missing Items",
      "Damaged Products",
      "Wrong Items",
      "Order Tracking",
    ],
  },
  {
    id: "productInfo",
    question: "What product information do you need?",
    options: ["Specifications", "Availability", "Compatibility", "User Manual"],
  },
  {
    id: "shipping",
    question: "What do you want to know about shipping?",
    options: [
      "Shipping Costs",
      "Delivery Time",
      "International Shipping",
      "Shipping Methods",
    ],
  },
  {
    id: "returns",
    question: "What do you need to know about returns?",
    options: [
      "Return Policy",
      "How to Return",
      "Refund Process",
      "Exchange Options",
    ],
  },
  {
    id: "additionalInfo",
    question: "Do you have any additional information to provide? If yes, please write it down.",
    options: ["No"],
    requiresInput: true,
  }
];

export default function ImprovedCustomerSupportChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! How can I assist you today? Please select from the options below.",
    },
  ]);
  const [userChoices, setUserChoices] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isAwaitingAIResponse, setIsAwaitingAIResponse] =
    useState<boolean>(false);
  const [showUserInput, setShowUserInput] = useState(false);
  const [showStartOver, setShowStartOver] = useState(false);

  const { append, isLoading } = useChat({
    onFinish: (message) => {
      // Lisätään LLM:n vastaus messages listaan
      const aiResponse: Message = {
        id: Date.now().toString(),
        content: message.content,
        role: "assistant",
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsAwaitingAIResponse(false);
      setShowStartOver(true);
      setShowUserInput(false);
    },
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleOptionClick = async (option: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: option,
      role: "user",
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setUserChoices((prev) => [...prev, option]);

    if (currentQuestionIndex < questionFlow.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      const nextQuestion = questionFlow[currentQuestionIndex + 1];
      const newAssistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: nextQuestion.question,
        role: "assistant",
      };
      setMessages((prev) => [...prev, newAssistantMessage]);
      setShowUserInput(nextQuestion.requiresInput || false);
    } else {
      await sendToLLM([...userChoices, option]);
    }
  };

  const sendToLLM = async (choices: string[]) => {
    setIsAwaitingAIResponse(true);
    const allChoices = choices.join(", ");

    try {
      // Odotetaan LLM:n vastaus
      await append({
        content: allChoices,
        role: "user",
      });
    } catch (error) {
      console.error("Error submitting to AI:", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content:
          "I'm sorry, there was an error processing your request. Please try again later.",
        role: "assistant",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput.trim() && !isAwaitingAIResponse) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: userInput,
        role: "user",
      };
      setMessages((prev) => [...prev, newMessage]);
      setUserChoices((prev) => [...prev, userInput]);
      setUserInput("");
      await sendToLLM([...userChoices, userInput]);
    }
  };

  const handleStartOver = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hello! How can I assist you today? Please select from the options below.",
      },
    ]);
    setUserChoices([]);
    setCurrentQuestionIndex(0);
    setShowStartOver(false);
    setShowUserInput(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 bg-primary text-primary-foreground hover:bg-primary/90"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {isOpen && (
        <div className="bg-background border rounded-lg shadow-lg w-80 sm:w-96 flex flex-col h-[32rem]">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-semibold">Customer Support</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <ScrollArea className="flex-grow p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && <Loader />}
            {!isAwaitingAIResponse &&
              currentQuestionIndex < questionFlow.length &&
              !showStartOver && (
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {questionFlow[currentQuestionIndex].options.map(
                    (option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="text-left h-auto whitespace-normal"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </Button>
                    )
                  )}
                </div>
              )}
            {showStartOver && (
              <div className="mt-4 text-center">
                <Button onClick={handleStartOver} className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Start Over
                </Button>
              </div>
            )}
            <div ref={messagesEndRef} />
          </ScrollArea>

          {showUserInput && (
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="flex-grow"
                  aria-label="Type your message"
                  disabled={isAwaitingAIResponse || isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  aria-label="Send message"
                  disabled={isAwaitingAIResponse || isLoading}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
