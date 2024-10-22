import CustomerSupportChatbot from "@/components/CustomerSupportChatbot";

export default function Home() {
  return (
    <div className="bg-gradient-to-t from-slate-50 to-slate-800 min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-center">
          AI Customer Support
        </h1>
        <p className="text-slate-200 text-lg md:text-xl mb-12 text-center max-w-2xl">
          Experience our intelligent chatbot that helps you with orders,
          shipping, and more
        </p>

        {/* Chat Button Indicator */}
        <div className="fixed bottom-24 right-8 md:right-12">
          <div className="relative group">
            {/* Floating Card */}
            <div className="absolute bottom-0 right-0 bg-white rounded-lg p-4 shadow-lg transform translate-y-[-120%] opacity-90">
              <p className="text-slate-800 text-sm whitespace-nowrap">
                Need help? Click the chat button! 👇
              </p>
              {/* Triangle Pointer */}
              <div className="absolute bottom-[-8px] right-8 w-4 h-4 bg-white transform rotate-45" />
            </div>
          </div>
        </div>

        {/* Chatbot Component */}
        <CustomerSupportChatbot />
      </div>
    </div>
  );
}
