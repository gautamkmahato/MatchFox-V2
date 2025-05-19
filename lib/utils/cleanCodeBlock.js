export function cleanCodeBlock(text) {
    const cleaned = text.replace(/^```json\s*([\s\S]*?)\s*```$/i, '$1').trim();
    const json = JSON.parse(cleaned);
    return json
}
