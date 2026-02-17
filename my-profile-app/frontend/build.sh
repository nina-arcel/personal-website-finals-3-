#!/bin/bash
echo "Current directory: $(pwd)"
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "Installing dependencies..."
npm install
echo "Checking if vite is installed..."
ls -la node_modules/vite/bin/ || echo "Vite bin not found"
echo "Running build..."
npx vite build