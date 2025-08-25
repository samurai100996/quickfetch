export interface Post {
    id: number;        // Every post has an ID (like 1, 2, 3...)
    title: string;     // Every post has a title (text)
    body: string;      // Every post has content (text)  
    userId: number;    // Every post belongs to a user (1, 2, 3...)
  }
  
  // This defines what our API response looks like
  export interface EchoResponse {
    message: string;    // A message we send back
    timestamp: string;  // When the request was made
    data: any;         // Whatever data was sent to us
  }