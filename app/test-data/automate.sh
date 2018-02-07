  start="$1-start.js"
  target="$1-target.js"

  cp data-start.js  "$start"
  cp data-target.js "$target"

  echo "export * from './$start';" >> start-index.js
  echo "export * from './$target';" >> start-index.js
