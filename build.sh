#!/bin/bash
chmod +x ./node_modules/.bin/vite
chmod +x ./node_modules/vite/bin/vite.js
VITE_BASE_URL=./ node ./node_modules/vite/bin/vite.js build 