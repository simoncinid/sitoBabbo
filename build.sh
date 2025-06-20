#!/bin/bash

# Build script per Vercel
echo "🚀 Inizio build processo..."

# Assicurati che i permessi siano corretti
chmod +x node_modules/.bin/vite 2>/dev/null || true

# Installa le dipendenze se necessario
if [ ! -d "node_modules" ]; then
    echo "📦 Installazione dipendenze..."
    npm ci --production=false
fi

# Esegui il build
echo "🔨 Building applicazione..."
npx vite build

echo "✅ Build completato!" 