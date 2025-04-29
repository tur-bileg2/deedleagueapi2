import { NextRequest, NextResponse } from 'next/server';
import { fetchExternalApi } from '@/app/utils/external-api';
import { verifyApiKey } from '@/app/middleware/api-auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { apiName: string } }
) {
  // Verify API key
  const apiKeyVerification = await verifyApiKey(request);
  if (!apiKeyVerification.valid) {
    return NextResponse.json(
      { error: apiKeyVerification.error },
      { status: apiKeyVerification.status, headers: apiKeyVerification.headers }
    );
  }

  const apiName = params.apiName;
  const endpoint = request.nextUrl.searchParams.get('endpoint') || '/';
  const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
  
  // Remove our internal param
  delete searchParams['endpoint'];
  
  try {
    const result = await fetchExternalApi(apiName, endpoint, {
      params: searchParams,
    });
    
    return NextResponse.json(result);
  } catch (error) {
    console.error(`Error proxying to ${apiName}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { error: 'Failed to fetch external API', message: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { apiName: string } }
) {
  // Verify API key
  const apiKeyVerification = await verifyApiKey(request);
  if (!apiKeyVerification.valid) {
    return NextResponse.json(
      { error: apiKeyVerification.error },
      { status: apiKeyVerification.status, headers: apiKeyVerification.headers }
    );
  }

  const apiName = params.apiName;
  const endpoint = request.nextUrl.searchParams.get('endpoint') || '/';
  
  try {
    const body = await request.json();
    
    const result = await fetchExternalApi(apiName, endpoint, {
      method: 'POST',
      body,
    });
    
    return NextResponse.json(result);
  } catch (error) {
    console.error(`Error proxying to ${apiName}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { error: 'Failed to fetch external API', message: errorMessage },
      { status: 500 }
    );
  }
}
