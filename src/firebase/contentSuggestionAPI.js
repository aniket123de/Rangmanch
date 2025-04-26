// api/generate-suggestions.js
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { creatorNiche, pastContent, audience } = req.body;

  if (!creatorNiche) {
    return res.status(400).json({ error: 'Content niche is required' });
  }

  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Construct the prompt
    const prompt = `
      You are a specialized content strategy AI assistant designed to help content creators generate fresh, engaging content ideas.
      
      Content Creator's Niche: ${creatorNiche}
      
      ${pastContent ? `Past Content Information: ${pastContent}` : ''}
      
      ${audience ? `Target Audience Information: ${audience}` : ''}
      
      Please generate 5 specific content ideas tailored to this creator's niche and audience. 
      For each idea, provide:
      1. A catchy title
      2. A brief description (1-2 sentences)
      3. Estimated engagement potential (High, Medium, or Low)
      4. Production difficulty (Easy, Moderate, or Challenging)
      
      Format your response as a structured JSON array with the following format:
      [
        {
          "title": "Title of the content idea",
          "description": "Brief description of what the content would include",
          "engagement": "High/Medium/Low",
          "difficulty": "Easy/Moderate/Challenging"
        },
        ...
      ]
      
      The ideas should be innovative, specific to the niche, and have potential for engagement.
    `;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = result.response;
    
    // Parse the response text as JSON
    let suggestions = [];
    try {
      const jsonMatch = response.text().match(/\[[\s\S]*?\]/);
      if (jsonMatch) {
        suggestions = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Could not parse JSON response');
      }
    } catch (err) {
      console.error('Error parsing JSON response:', err);
      
      // Fallback to a basic response format if JSON parsing fails
      suggestions = [
        {
          title: "Content Idea for " + creatorNiche,
          description: "We had trouble formatting suggestions, but here's a general idea for your niche.",
          engagement: "Medium",
          difficulty: "Moderate"
        }
      ];
    }

    return res.status(200).json({ suggestions });
  } catch (error) {
    console.error('Error generating content:', error);
    return res.status(500).json({ error: 'Failed to generate suggestions' });
  }
}