#!/bin/zsh
cd "$(dirname "$0")"
npx dredd ../public/openapi.json localhost:3000/api -h "Content-Type: application/json; charset=utf-8" -h "origin: http://localhost:3000" --hookfiles="hook.js" --loglevel="error"
