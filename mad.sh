#!/bin/bash

# Exclua a pasta .git e obtenha a lista de arquivos com extensões
files=$(du -aBm --exclude='./.git' . | grep -v '/$')

# Extraia as extensões únicas, incluindo arquivos sem extensão
extensions=$(echo "$files" | awk -F. '{if (NF>1) print $NF; else print "sem_extensao"}' | sort | uniq)

# Itere sobre cada extensão e encontre o maior arquivo
for ext in $extensions; do
  echo "Maior arquivo .$ext:"
  if [ "$ext" == "sem_extensao" ]; then
    echo "$files" | grep -E -v '\..+$' | sort -rn | head -n 1
  else
    echo "$files" | grep -E "\.$ext$" | sort -rn | head -n 1
  fi
  echo
done
