#!/bin/bash

# Step 1: Start the server in the background
echo "Starting the server..."
node --loader ts-node/esm server.ts &

# Save the process ID (optional)
SERVER_PID=$!

# Step 2: Wait for the server to start up
sleep 3  # Adjust if needed

# Step 3: Hit the server
echo "Hitting localhost:3000..."
curl http://localhost:3000

# Optional: Kill the server after the request
# kill $SERVER_PID