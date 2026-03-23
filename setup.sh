#!/bin/bash
# Script para configurar o repo correto no GitHub
# Execute este script na pasta onde você extraiu o ZIP

echo "=== Traffic Board — Setup Git ==="

# Inicializa git se necessário
git init

# Configura os arquivos na estrutura correta
mkdir -p src public

# Move arquivos para os lugares certos (caso estejam na raiz errada)
[ -f "App.jsx" ] && mv App.jsx src/App.jsx && echo "✓ Moveu App.jsx → src/"
[ -f "main.jsx" ] && mv main.jsx src/main.jsx && echo "✓ Moveu main.jsx → src/"
[ -f "index.css" ] && mv index.css src/index.css && echo "✓ Moveu index.css → src/"
[ -f "favicon.svg" ] && mv favicon.svg public/favicon.svg && echo "✓ Moveu favicon.svg → public/"

# Remove arquivo antigo se existir
[ -f "traffic-dashboard-v2.jsx" ] && rm traffic-dashboard-v2.jsx && echo "✓ Removeu arquivo antigo"
[ -f "{src,public}" ] && rm -rf "{src,public}" 2>/dev/null

echo ""
echo "Estrutura atual:"
find . -not -path './.git/*' -not -name '.DS_Store' | sort

echo ""
echo "=== Agora execute ==="
echo "git add ."
echo "git commit -m 'fix: estrutura correta do projeto'"
echo "git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git"
echo "git push -f origin main"
