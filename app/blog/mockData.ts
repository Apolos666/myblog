export interface BlogPost {
  title: string;
  date: string;
  author: string;
  content: string;
  tags: string[];
  previousPost?: { id: number; title: string };
  nextPost?: { id: number; title: string };
}

export const getBlogPost = async (slug: string): Promise<BlogPost> => {
  // Trong thực tế, bạn sẽ lấy dữ liệu từ API hoặc cơ sở dữ liệu
  return {
    title: "Understanding Authentication in .NET Core",
    date: "2023-10-20",
    author: "John Doe",
    content: `
# Understanding Authentication in .NET Core

Authentication is a crucial aspect of web application security. In this post, we'll explore how to implement authentication in .NET Core applications.

## What is Authentication?

Authentication is the process of verifying the identity of a user, system, or entity. In web applications, it typically involves validating user credentials against a stored set of authorized users.

### Basic Authentication Flow

1. User provides credentials (e.g., username and password)
2. Server validates the credentials
3. If valid, server creates a session or token
4. Client uses the session or token for subsequent requests

## Implementing Authentication in .NET Core

Here's a basic example of how to set up authentication in a .NET Core application:

\`\`\`csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = Configuration["Jwt:Issuer"],
                ValidAudience = Configuration["Jwt:Issuer"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
            };
        });
}

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    // Other middleware...
    app.UseAuthentication();
    app.UseAuthorization();
    // Other middleware...
}
\`\`\`

This setup uses JWT (JSON Web Tokens) for authentication. Make sure to secure your JWT key and never expose it in your codebase or version control.

## Conclusion

Implementing proper authentication is essential for securing your .NET Core applications. Always follow best practices and keep your authentication mechanisms up to date with the latest security standards.

[Learn more about .NET Core security](https://docs.microsoft.com/en-us/aspnet/core/security/?view=aspnetcore-5.0)
`,
    tags: ["C#", ".NET Core", "Authentication", "Web Development"],
    previousPost: { id: 1, title: "Introduction to ASP.NET Core" },
    nextPost: { id: 3, title: "Advanced Routing in .NET Core" },
  };
};
