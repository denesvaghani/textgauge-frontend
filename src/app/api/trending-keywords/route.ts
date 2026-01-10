import { NextRequest, NextResponse } from "next/server";

// Fallback data in case API fails
import { trendingKeywords } from "@/data/trendingKeywords";

export const revalidate = 3600; // Cache for 1 hour

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const geo = searchParams.get("geo") || "US";

        // Fetch Google Trends Daily Search Trends (RSS)
        const response = await fetch(`https://trends.google.com/trends/trendingsearches/daily/rss?geo=${geo}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`Google Trends API answered with ${response.status}`);
        }

        const xmlText = await response.text();
        const parsedKeywords = parseTrendsRSS(xmlText);

        if (parsedKeywords.length === 0) {
            // fallback if parsing fails
            return NextResponse.json({
                keywords: trendingKeywords.slice(0, 10),
                source: 'fallback'
            });
        }

        return NextResponse.json({
            keywords: parsedKeywords,
            source: 'google-trends'
        });

    } catch (error) {
        console.error("Failed to fetch Google Trends:", error);
        // Return fallback static data on error
        return NextResponse.json({
            keywords: trendingKeywords.slice(0, 10),
            source: 'fallback-error'
        });
    }
}

function parseTrendsRSS(xml: string) {
    const items = [];
    // Simple regex to match items. 
    // Structure: <item> ... <title>Keyword</title> ... <ht:approx_traffic>100,000+</ht:approx_traffic> ... </item>
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;

    let match;
    while ((match = itemRegex.exec(xml)) !== null) {
        const itemContent = match[1];

        // Extract Title
        const titleMatch = /<title>(.*?)<\/title>/.exec(itemContent);
        const title = titleMatch ? titleMatch[1] : "Unknown";

        // Extract Traffic
        const trafficMatch = /<ht:approx_traffic>(.*?)<\/ht:approx_traffic>/.exec(itemContent);
        const traffic = trafficMatch ? trafficMatch[1] : "N/A";

        // Extract pubDate/News URL (optional, skipping for now)

        // Map to our interface (roughly)
        items.push({
            keyword: title,
            searchVolume: traffic.replace('+', ''), // "100,000+" -> "100,000"
            category: 'general', // Trends feed doesn't give category, default to general
            difficulty: 'medium', // Unknown
            trending: 'up' // It's on the trending list, so it's UP
        });
    }

    return items;
}
