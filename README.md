# Victor F. Oliveira — Portfolio

**PT:** Site de portfólio pessoal para Engenheiro e Analista de Dados Júnior. Construído com HTML, CSS e JavaScript puro — sem frameworks, sem build step, sem dependências.

**EN:** Personal portfolio website for a Junior Data Engineer & Analyst. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step, no dependencies.

**Live:** [victorfoli.github.io](https://victorfoli.github.io)

---

## Conceitos & Funcionalidades / Concepts & Features

| Funcionalidade / Feature | PT | EN |
|---|---|---|
| **Matrix rain** | Animação canvas com katakana e ASCII no hero | Canvas-based katakana/ASCII animation on the hero section |
| **Typewriter** | Títulos de papel ciclam com efeito digitar/apagar | Role titles cycle with a type-and-erase loop |
| **Custom cursor** | Cursor dot + ring que segue o mouse (apenas desktop) | Dot + ring cursor that follows the mouse (desktop only) |
| **Magnetic buttons** | Botões CTA que seguem levemente o cursor | CTA buttons that subtly follow cursor position |
| **Scroll reveal** | Fade-in via `IntersectionObserver` com delays escalonados | `IntersectionObserver`-based fade-in with staggered delays |
| **Hash routing** | URL atualiza conforme o usuário scrolla entre seções | URL hash updates as the user scrolls between sections |
| **i18n (PT / EN)** | Suporte bilíngue completo; idioma persiste via `localStorage` | Full bilingual support; language persists via `localStorage` |
| **Responsivo** | Breakpoints mobile-first em 1024px, 768px e 480px | Mobile-first breakpoints at 1024px, 768px, and 480px |

---

## Tech Stack

### Site do portfólio / Portfolio website

| Camada / Layer | Tecnologia / Technology |
|---|---|
| Markup | HTML5 semântico / HTML5 semantic elements |
| Estilos / Styles | CSS puro com custom properties / Vanilla CSS with custom properties |
| Scripts | JavaScript puro ES2020 / Vanilla JavaScript ES2020 |
| Fontes / Fonts | Space Mono · Syne · Inter (Google Fonts) |
| Animações / Animations | CSS keyframes + `requestAnimationFrame` (Canvas) |
| Roteamento / Routing | `history.replaceState` + `IntersectionObserver` |

### Stack de dados do Victor / Victor's data stack (showcased on the site)

`Python` · `SQL` · `dbt` · `Apache Airflow` · `AWS` · `Apache Spark` · `Docker` · `Power BI`

---

## Estrutura do Projeto / Project Structure

```
portifolio-victor/
├── index.html        # Ponto de entrada / Entry point
├── css/
│   └── styles.css    # Todos os estilos, tokens, animações / All styles, tokens, animations
└── js/
    └── main.js       # i18n, typewriter, cursor, matrix, routing, reveal
```

---

## Rodando Localmente / Running Locally

**PT:** Nenhum build necessário — basta abrir o arquivo no navegador.

**EN:** No build step required — just open the file in a browser.

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Acesse / Visit: `http://localhost:8080`

---

## Design Tokens

**PT:** Todas as variáveis visuais ficam em `:root` dentro de `css/styles.css`.

**EN:** All visual variables live in `:root` inside `css/styles.css`.

```css
--bg:      #050a05   /* fundo escuro / near-black background   */
--accent:  #39ff14   /* verde neon / neon green — primary      */
--accent2: #00ff88   /* verde teal / teal green — secondary    */
--text:    #d4f5d4   /* texto suave / soft green text          */
--muted:   #5a7a5a   /* labels de baixo contraste / muted      */
```

---

## Internacionalização / Internationalization

**PT:** As traduções ficam no objeto `translations` no topo de `js/main.js`. Para adicionar um novo idioma, adicione uma nova chave (`es`, `fr`, etc.) espelhando a estrutura de `pt`.

**EN:** Translations live in the `translations` object at the top of `js/main.js`. To add a new language, add a new key (`es`, `fr`, etc.) mirroring the `pt` structure.

---

## Seções / Sections

| # | ID | Hash |
|---|---|---|
| 0 | `#hero` | `#portfolio` |
| 1 | `#about` | `#about` |
| 2 | `#projects` | `#projects` |
| 3 | `#contact` | `#contact` |

---

## Contato / Contact

- GitHub: [@victorfoli](https://github.com/victorfoli)
- LinkedIn: [victoroliveira2001](https://www.linkedin.com/in/victoroliveira2001/)
- Email: victor.f.oliveira@ufv.br
