import { verifyAuthToken } from '@/lib/authToken';

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    
    if (!token) {
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: 'Token is required' 
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    const result = verifyAuthToken(token);
    
    if (result.valid) {
      // Return user data without sensitive information
      const userData = {
        userId: result.data.userId,
        email: result.data.email,
        role: result.data.role
      };
      
      return new Response(
        JSON.stringify({ 
          valid: true, 
          userData 
        }),
        { 
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ 
          valid: false, 
          error: result.error 
        }),
        { 
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  } catch (error) {
    console.error('Token verification error:', error);
    return new Response(
      JSON.stringify({ 
        valid: false, 
        error: 'Internal server error during token verification' 
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
