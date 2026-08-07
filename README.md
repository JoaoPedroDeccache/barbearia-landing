# Navalha de Ouro — Landing Page de Barbearia

Landing page estática (HTML5, CSS3 e JavaScript puro, sem frameworks e sem build)
pronta para abrir direto no IntelliJ IDEA.

## Estrutura

```
barbearia-landing/
├── index.html          # Estrutura da página (todas as seções)
├── css/
│   └── style.css        # Design tokens, layout (Flexbox + Grid) e responsividade
├── js/
│   └── script.js        # Menu mobile, animações, filtros, slider, formulário
└── README.md
```

## Como rodar no IntelliJ IDEA

1. Abra a pasta `barbearia-landing` como projeto no IntelliJ (**File → Open**).
2. Clique com o botão direito em `index.html` no painel do projeto.
3. Escolha **Open in Browser** (ícone do navegador que aparece no canto
   superior direito do editor, ou clique direito → "Open in Browser").
   - Isso já serve o arquivo com o servidor embutido do IntelliJ, então o
     `fetch` de fontes do Google e o mapa embutido funcionam normalmente.
4. Alternativa sem IntelliJ: dê duplo clique em `index.html` para abrir
   direto no navegador, ou use a extensão **Live Server** caso prefira
   recarregamento automático a cada alteração.

Não é necessário `npm install` nem qualquer build — é HTML/CSS/JS puro.

## O que já está pronto

- **Header fixo** com menu off-canvas no mobile (abre/fecha, fecha com ESC,
  clique no fundo ou ao navegar).
- **Banner principal** com CTA duplo (WhatsApp + "Ver serviços") e indicador
  de rolagem.
- **Faixa de estatísticas** com contadores animados ao entrar na tela.
- **Seção de serviços** com 6 cards (nome, descrição, preço, duração e link
  direto de agendamento pelo WhatsApp já com a mensagem preenchida).
- **Galeria** com filtro por categoria (Todos/Cortes/Barba/Ambiente) e
  lightbox com navegação por teclado (setas e ESC).
- **Depoimentos** em slider com autoplay, dots e pausa ao passar o mouse.
- **Mapa** (embed do Google Maps sem necessidade de chave de API) e
  **formulário de contato** com validação client-side que monta e abre uma
  mensagem de WhatsApp pronta para envio.
- **Botão flutuante do WhatsApp** com animação de pulso e **botão "voltar
  ao topo"**.
- **Totalmente responsiva**, com breakpoints em 1100px, 900px, 640px e 420px,
  além de respeitar `prefers-reduced-motion` para quem desativa animações.

## Antes de publicar — troque os placeholders

Tudo abaixo está com dados fictícios de exemplo e precisa ser substituído:

1. **Número de WhatsApp**: procure por `5521999999999` em `index.html` (vários
   links) e em `WHATSAPP_NUMBER` no topo da seção 9 de `js/script.js` — troque
   pelos dois em conjunto pelo número real, no formato `55DDXXXXXXXXX`.
2. **Fotos reais**: os blocos com texto "Foto do salão", "Corte", "Barba",
   "Ambiente" em `.hero__photo` e `.gallery__item` são placeholders para você
   não depender de imagens de terceiros. Troque-os por `<img>` com as fotos
   da barbearia (respeitando as proporções indicadas em cada bloco).
3. **Endereço, telefone e horário**: seção `#contato` em `index.html`.
4. **Mapa**: troque `Copacabana,Rio%20de%20Janeiro` na URL do `iframe` pelo
   endereço real (ou gere um link de "Compartilhar → Incorporar mapa" direto
   no Google Maps).
5. **Depoimentos**: são fictícios — troque por avaliações reais de clientes
   (evita qualquer questão de imagem/verossimilhança da marca).
6. **Preços e serviços**: ajuste nomes, descrições, preços e durações no
   array de `.service-card` conforme a tabela real da barbearia.

## O que eu expandiria primeiro

Em ordem de prioridade, se este fosse para produção:

1. **Trocar os placeholders de imagem por fotos reais otimizadas** (WebP,
   `srcset` para diferentes resoluções, `loading="lazy"` fora do hero) — é o
   que mais eleva a percepção de qualidade da página hoje.
2. **Conectar o formulário a um backend de verdade** (ex.: Formspree, um
   endpoint próprio, ou uma função serverless) para também registrar o lead
   por e-mail/planilha, já que hoje ele só abre o WhatsApp — bom para
   conversão, mas não guarda histórico.
3. **Agendamento embutido** (ex.: Calendly, Cal.com ou uma agenda própria)
   como alternativa ao WhatsApp, para reduzir fricção de quem prefere marcar
   sem conversar antes.
4. **SEO local**: metatags Open Graph, dados estruturados
   (`schema.org/HairSalon` ou `LocalBusiness`) com endereço e horário, e
   cadastro no Google Meu Negócio — essencial para aparecer em buscas por
   "barbearia perto de mim".
5. **Analytics básico** (Plausible, GA4 ou Meta Pixel) nos botões de
   WhatsApp e no envio do formulário, para medir taxa de conversão de cada
   CTA.
6. **Internacionalização de performance**: minificar CSS/JS e servir as
   fontes via `font-display: swap` self-hosted, caso a página vá rodar sob
   conexões mais lentas.

## Sobre as escolhas de design

- **Paleta**: carvão quente (`#1C1A17`), marfim (`#F3EEE4`), latão
  (`#C9A15C`) e vinho (`#7B2D3B`) — remetem a couro, metal escovado e à faixa
  vermelha do poste de barbearia, sem cair no clichê de neon sobre preto.
- **Assinatura visual**: o "poste de barbearia" ao lado da logo é puramente
  CSS (gradiente listrado animado via `background-position`), reaproveitado
  como divisor de seção — nenhuma imagem externa necessária.
- **Tipografia**: `Big Shoulders Display` (títulos, condensada e industrial),
  `Work Sans` (corpo, legível em PT-BR) e `Space Mono` (preços, legendas e
  números — remete a etiquetas e medidas de máquina).
