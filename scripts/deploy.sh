#!/usr/bin/env bash
# Udrulning af casperhavelykke.dk på serveren: hent koden, byg og læg siden ud.
# Kør fra ~/casperhavelykke.dk: ./scripts/deploy.sh
# check:launch kører før builden, så en kladde eller en TODO aldrig kommer online.
set -euo pipefail

cd "$(dirname "$0")/.."

git pull
npm ci
npm run check:launch
npm run build

# --delete fjerner filer, der ikke længere findes i builden.
rsync -a --delete dist/ /var/www/casperhavelykke.dk/
echo "Deploy OK"
