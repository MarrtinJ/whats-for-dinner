import { DetectedIngredient } from '../types/ingredient';

const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-20250514';

const INGREDIENT_PROMPT = `Analyze this image and identify all visible food ingredients.

For each ingredient, provide:
1. name: common name (e.g., "tomato" not "Solanum lycopersicum")
2. confidence: high, medium, or low

Respond ONLY with a JSON array, no other text:
[{"name": "...", "confidence": "high|medium|low"}]

If no food ingredients visible, return: []
Focus on raw ingredients for cooking, not prepared dishes.`;

function getApiKey(): string {
  const key = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;
  if (!key) {
    throw new Error('EXPO_PUBLIC_ANTHROPIC_API_KEY is not configured');
  }
  return key;
}

export async function detectIngredients(
  base64: string,
  mimeType: 'image/jpeg'
): Promise<DetectedIngredient[]> {
  const apiKey = getApiKey();

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mimeType,
                data: base64,
              },
            },
            {
              type: 'text',
              text: INGREDIENT_PROMPT,
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Claude API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const rawResponse = data.content?.[0]?.text || '[]';

  return parseIngredientResponse(rawResponse);
}

function parseIngredientResponse(responseText: string): DetectedIngredient[] {
  try {
    let jsonStr = responseText.trim();

    // Remove markdown code block if present
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/```(?:json)?\n?/g, '').trim();
    }

    const parsed = JSON.parse(jsonStr);

    if (!Array.isArray(parsed)) {
      console.warn('Unexpected response format, expected array');
      return [];
    }

    return parsed
      .filter(
        (item): item is DetectedIngredient =>
          typeof item === 'object' && item !== null && typeof item.name === 'string'
      )
      .map((item) => ({
        name: item.name.toLowerCase().trim(),
        confidence:
          item.confidence && ['high', 'medium', 'low'].includes(item.confidence)
            ? item.confidence
            : 'medium',
      }));
  } catch (error) {
    console.error('Failed to parse ingredient response:', error);
    console.error('Raw response:', responseText);
    return [];
  }
}
