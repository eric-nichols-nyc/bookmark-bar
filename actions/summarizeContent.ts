// src/server/actions/summarizeContent.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai';
import { createOpenAI } from '@ai-sdk/openai'

const openai = new OpenAI({
    apiKey: "sk-proj-Sjc4r9Qimtt81Pys952UT3BlbkFJN5zPcJqhKAd61683JwJa",
    dangerouslyAllowBrowser: true 
  });
  

export const summarizeContent = async (url: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'As a professional search expert, you possess the ability to search for any information on the web. or any information on the web. For each user query, utilize the search results to their fullest potential to provide additional information and assistance in your response.' },
        { role: 'user', content: `Summarize the content of the following URL: ${url}. Provide a summary in one or two paragraphs, three key points, and three keywords.` },
      ],
    });
    const summary = response.choices[0].message.content;

    return summary;

    } catch (error) {
        console.error(error);
    }

};