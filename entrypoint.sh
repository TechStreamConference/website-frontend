#! /bin/bash

if [ ! -d "./node_modules" ]; then
  echo "'node_modules' not found in volume, restoring from image..."
  cp -v -r /node_modules.bak ./node_modules
fi

exec "$@"
