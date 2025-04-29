import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon, LockIcon } from "lucide-react";
import CopyButton from "../components/CopyButton";

export default async function ApiDocsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Create the masked user ID display string - not an actual API key
  const displayUserId = `${user.id.substring(0, 8)}...${user.id.substring(user.id.length - 8)}`;

  return (
    <div className="flex-1 w-full flex flex-col gap-8 max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">API Documentation</h1>
        <Link href="/" className="text-blue-600 hover:underline flex items-center">
          <ArrowLeftIcon size={16} className="mr-1" />
          Back to home
        </Link>
      </div>

      {/* Authentication warning banner */}
      <div className="flex items-center bg-yellow-50 border border-yellow-200 p-4 rounded-md text-yellow-800">
        <LockIcon size={18} className="mr-2 flex-shrink-0" />
        <p className="text-sm">
          This API documentation is only available to authenticated users. Your API key is tied to your account.
        </p>
      </div>

      <div className="space-y-12">
        {/* Authentication Section */}
        <section>
          <h2 className="text-xl font-semibold border-b pb-2">Authentication</h2>
          <div className="mt-4 space-y-4">
            <p>All API requests require authentication using an API key in the request headers:</p>
            <div className="bg-gray-800 text-green-300 p-4 rounded-md overflow-x-auto">
              <pre>{`Authorization: Bearer YOUR_API_KEY`}</pre>
            </div>
            <div className="bg-gray-50 p-4 border border-gray-200 rounded-md">
              <h3 className="font-semibold text-gray-700 mb-2">API Key Management</h3>
              <p className="text-sm text-gray-600 mb-4">
                To use the API, you'll need to generate an API key in your profile settings. 
                Below is your user ID (not an API key):
              </p>
              <div className="bg-gray-100 text-gray-800 p-3 rounded flex justify-between items-center">
                <code className="text-sm">{displayUserId}</code>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link 
                  href="/profile" 
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Generate API Key
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                <p className="text-xs text-gray-500 mt-2">
                  API keys are separate from your account credentials and can be revoked at any time.
                  For security, do not share your API keys with others.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Player Listing Endpoint */}
        <section id="list-players">
          <h2 className="text-xl font-semibold border-b pb-2">List All Players</h2>
          <div className="mt-4 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <span className="bg-blue-600 text-white px-2 py-1 rounded font-mono text-sm">GET</span>
              <span className="font-mono text-gray-800">/api/scrape</span>
            </div>
            
            <p className="text-gray-600">Returns a list of all basketball players with basic information. Results are cached for 1 hour.</p>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Query Parameters</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Parameter</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Type</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Required</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 text-sm"><code>limit</code></td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">number</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">No</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">Maximum number of players to return</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 text-sm"><code>position</code></td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">string</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">No</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">Filter players by position (e.g., "PG", "SG", "SF", "PF", "C")</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 text-sm"><code>nationality</code></td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">string</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">No</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">Filter players by nationality</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Example Response</h3>
              <div className="bg-gray-800 text-green-300 p-4 rounded-md overflow-x-auto">
                <pre>{JSON.stringify({
                  "players": [
                    {
                      "id": "757769",
                      "name": "A. Batkhuyag",
                      "profileUrl": "https://www.asia-basket.com/player/A--Bathuyag/757769",
                      "team": "Darkhan-Uul",
                      "league": "Mongolia - National Team",
                      "nationality": "Mongolia",
                      "age": "24",
                      "height": "183",
                      "position": "SG"
                    },
                    {
                      "id": "789123",
                      "name": "B. Enkhbat",
                      "profileUrl": "https://www.asia-basket.com/player/B--Enkhbat/789123",
                      "team": "Ulaanbaatar",
                      "league": "Mongolia - Super League",
                      "nationality": "Mongolia",
                      "age": "26",
                      "height": "192",
                      "position": "PF"
                    }
                  ],
                  "partial": false,
                  "expected": 100,
                  "source": "cache"
                }, null, 2)}</pre>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
              <h3 className="font-medium text-blue-800 mb-2">Response Fields Explanation</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li><code className="text-blue-700">players</code>: Array of player objects with basic information</li>
                <li><code className="text-blue-700">partial</code>: Boolean indicating if only partial data was retrieved</li>
                <li><code className="text-blue-700">expected</code>: Total number of players in the database</li>
                <li><code className="text-blue-700">source</code>: Data source, either "cache" or "scrape"</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Player Details Endpoint */}
        <section id="player-details">
          <h2 className="text-xl font-semibold border-b pb-2">Get Player Details</h2>
          <div className="mt-4 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <span className="bg-blue-600 text-white px-2 py-1 rounded font-mono text-sm">GET</span>
              <span className="font-mono text-gray-800">/api/player-details/{'{playerId}'}</span>
            </div>
            
            <p className="text-gray-600">Returns detailed information about a specific player, including stats, game logs, and career history. Results are cached for 6 hours.</p>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Path Parameters</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Parameter</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Type</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Required</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 text-sm"><code>playerId</code></td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">string</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">Yes</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">The unique identifier of the player (get from List Players endpoint)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Query Parameters</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Parameter</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Type</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Required</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 text-sm"><code>fields</code></td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">string</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">No</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">Comma-separated list of specific fields to include (e.g., "name,team,position,averageStats,ppg")</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Example Response</h3>
              <div className="bg-gray-800 text-green-300 p-4 rounded-md overflow-x-auto">
                <pre>{JSON.stringify({
                  "id": "757769",
                  "name": "A. Batkhuyag",
                  "team": "Darkhan-Uul",
                  "league": "Mongolia - National Team",
                  "nationality": "Mongolia",
                  "position": "SG",
                  "age": "24",
                  "height": "183",
                  "imageUrl": "https://www.asia-basket.com/imgs/players/pht/9423.jpg",
                  "averageStats": [
                    {
                      "team": "Darkhan-Uul",
                      "games": "20",
                      "min": "28.4",
                      "pts": "16.2",
                      "fgp2Pct": "48.2%",
                      "fgp3Pct": "36.7%",
                      "ftPct": "78.5%",
                      "rebOff": "0.8",
                      "rebDef": "3.7",
                      "rebTotal": "4.5",
                      "ast": "3.1",
                      "pf": "2.2",
                      "blk": "0.4",
                      "stl": "1.5",
                      "to": "2.1",
                      "rank": "18.2"
                    }
                  ],
                  "gameLogs": [
                    {
                      "date": "2023-12-16",
                      "team": "Darkhan-Uul",
                      "opponent": "Ulaanbaatar City",
                      "result": "85-79",
                      "min": "32",
                      "pts": "18",
                      "fgp2": "5-8",
                      "fgp3": "2-5",
                      "ft": "2-2",
                      "rebOff": "1",
                      "rebDef": "4",
                      "rebTotal": "5",
                      "ast": "4",
                      "pf": "2",
                      "blk": "0",
                      "stl": "2",
                      "to": "3",
                      "rank": "19"
                    }
                  ],
                  "advancedStats": {
                    "points": {
                      "value": 16.2,
                      "team": 84.5,
                      "percentage": 19.2
                    },
                    "assists": {
                      "value": 3.1,
                      "team": 18.4,
                      "percentage": 16.8
                    }
                  },
                  "source": "cache"
                }, null, 2)}</pre>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
              <h3 className="font-medium text-blue-800 mb-2">Available Data Fields</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li><code className="text-blue-700">id</code>: Unique player identifier</li>
                <li><code className="text-blue-700">name, team, league, nationality, position, age, height</code>: Basic player info</li>
                <li><code className="text-blue-700">imageUrl</code>: URL to the player's photo</li>
                <li><code className="text-blue-700">averageStats</code>: Array of season average statistics</li>
                <li><code className="text-blue-700">summaryStats</code>: Array of season summary statistics (actual totals)</li>
                <li><code className="text-blue-700">gameLogs</code>: Array of individual game performances</li>
                <li><code className="text-blue-700">advancedStats</code>: Advanced team contribution metrics</li>
                <li><code className="text-blue-700">careerHistory</code>: Array of team history entries</li>
              </ul>
            </div>
          </div>
        </section>

        {/* External APIs Section */}
        <section id="external-apis">
          <h2 className="text-xl font-semibold border-b pb-2">External API Integration</h2>
          <div className="mt-4 space-y-4">
            <p className="text-gray-600">
              Access external basketball data sources through our proxy service. Using the proxy lets you access multiple 
              external APIs with a single Deed League API key.
            </p>
            
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <span className="bg-blue-600 text-white px-2 py-1 rounded font-mono text-sm">GET</span>
              <span className="font-mono text-gray-800">/api/proxy/{'{apiName}'}</span>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Path Parameters</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Parameter</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Type</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Required</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 text-sm"><code>apiName</code></td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">string</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">Yes</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">The name of the external API to access</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Query Parameters</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Parameter</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Type</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Required</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 text-sm"><code>endpoint</code></td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">string</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">Yes</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">The specific endpoint to call on the external API</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 text-sm"><code>*</code></td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">varies</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">No</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">Any additional parameters required by the external API</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Available External APIs</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">API Name</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Description</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Rate Limit</th>
                      <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Example Endpoints</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 text-sm"><code>basketball-api</code></td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">General basketball statistics and data</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">60 requests per minute</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">/players/top-scorers, /teams/standings</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 text-sm"><code>stats-api</code></td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">Advanced basketball analytics</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">100 requests per minute</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">/analytics/efficiency, /players/comparison</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Example Usage</h3>
              <div className="bg-gray-800 text-green-300 p-4 rounded-md overflow-x-auto">
                <pre>{`// Request to external API
fetch('https://your-domain.com/api/proxy/basketball-api?endpoint=/players/top-scorers&league=mongolian', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* Rate Limits Section */}
        <section id="rate-limits">
          <h2 className="text-xl font-semibold border-b pb-2">Rate Limits</h2>
          <div className="mt-4 space-y-4">
            <p>Your API key has the following rate limits:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Player Listing:</strong> 100 requests per hour</li>
              <li><strong>Player Details:</strong> 500 requests per hour</li>
              <li><strong>External API Proxy:</strong> Depends on the specific external API</li>
            </ul>
            <p className="text-sm text-gray-600">
              If you exceed these limits, you will receive a <code>429 Too Many Requests</code> response.
              The response will include a <code>Retry-After</code> header indicating the number of seconds until you can make another request.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
              <p className="text-sm text-yellow-800">
                Premium accounts receive higher rate limits. Contact us at <a href="mailto:turbileg@student.ubc.ca" className="text-blue-600 hover:underline">turbileg@student.ubc.ca</a> for details.
              </p>
            </div>
          </div>
        </section>

        {/* Error Handling Section */}
        <section id="errors">
          <h2 className="text-xl font-semibold border-b pb-2">Error Handling</h2>
          <div className="mt-4 space-y-4">
            <p>The API uses standard HTTP status codes to indicate the success or failure of a request:</p>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Status Code</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Meaning</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Common Causes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-sm"><code>200 OK</code></td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">The request was successful</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">Valid request, data returned</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-sm"><code>400 Bad Request</code></td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">Invalid request parameters</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">Invalid player ID, missing required parameters</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-sm"><code>401 Unauthorized</code></td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">Authentication failed</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">Missing or invalid API key</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-sm"><code>404 Not Found</code></td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">Resource not found</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">Player ID doesn't exist, invalid endpoint</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-sm"><code>429 Too Many Requests</code></td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">Rate limit exceeded</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">Too many requests in the given time period</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-sm"><code>500 Internal Server Error</code></td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">Server error</td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">Scraping failure, database error</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="font-medium text-gray-800 mb-2">Error Response Format</h3>
              <div className="bg-gray-800 text-green-300 p-4 rounded-md overflow-x-auto">
                <pre>{JSON.stringify({
                  "status": "error",
                  "message": "Player not found",
                  "details": "No player exists with the provided ID",
                }, null, 2)}</pre>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
