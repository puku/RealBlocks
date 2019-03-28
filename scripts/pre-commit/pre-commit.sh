#!/usr/bin/env bash

while read -r file;
do
  file=${file:1}
  file="$(echo -e "${file}" | tr -d '[[:space:]]')"
  echo ${file}
  if [[ ${file} = *.ts ]];
  then
    npm run eslint "$file"
    git add "$file"
  fi
done < <(git diff --cached --name-status --diff-filter=ACM)
