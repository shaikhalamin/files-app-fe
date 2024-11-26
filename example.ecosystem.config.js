module.exports = {
  apps: [
    {
      name: "nextjs-frontend", // Application name
      script: "node_modules/next/dist/bin/next", // Next.js start script
      args: "start", // Run the Next.js app in production mode
      instances: "max", // Use all available CPU cores
      exec_mode: "cluster", // Run in cluster mode
      cwd: "./", // Current working directory for the app
      env: {
        NODE_ENV: "production", // Set environment to production
        PORT: 3000, // Port for the Next.js application
        NEXT_PUBLIC_API_BASE: "http://localhost:8056", // API base URL for frontend
        NEXT_PUBLIC_FE_BASE: "http://164.92.172.255", // Frontend base URL
      },
      output: "./logs/frontend-out.log", // Path for standard output logs
      error: "./logs/frontend-error.log", // Path for error logs
      merge_logs: true, // Merge logs from all instances
      time: true, // Add timestamp to logs
    },
  ],
};

