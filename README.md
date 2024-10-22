# AI-Powered Customer Support Chatbot 🤖

A modern, interactive customer support chatbot built with Next.js, TypeScript, and AI integration. The chatbot provides a guided conversation flow followed by AI-powered responses to customer inquiries.

## Technical Stack

- Next.js 15.0.0
- TypeScript
- Vercel AI SDK
- Tailwind CSS
- shadcn/ui components

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Set up your AI provider

- Create an API route for your AI provider
- Configure environment variables:

```env
AI_PROVIDER_API_KEY=your_api_key
```

3. Run the development server

```bash
npm run dev
```

## Usage

The chatbot implements a two-stage conversation flow:

1. **Guided Questions**:

   - Users select from predefined options
   - Questions flow based on user selections
   - Categories include order issues, product information, shipping, and returns

2. **AI Interaction**:
   - After collecting user choices
   - Sends consolidated information to AI
   - Receives and displays AI-generated response
