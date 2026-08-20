# Nexa

Chateá con personajes de IA, cada uno con su propia personalidad, historia y forma de responder.

**Demo en vivo:** [nexa-chat-ai.vercel.app](https://nexa-chat-ai.vercel.app)

> 🚧 Proyecto en mejora activa — se está migrando de una versión vanilla JS a React, con nuevas pantallas y funcionalidades sumándose constantemente.

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- React Router
- Google Gemini AI (respuestas de los personajes)
- Vercel Serverless Functions
- Firebase (Auth / Firestore) — en progreso

## Funcionalidades

- **Chat con personajes**: conversaciones con personalidades distintas, impulsadas por Gemini AI
- **Explorar personajes**: búsqueda y filtro por categoría
- **Historial de conversaciones**: con filtros por fecha, personaje y favoritos
- **Favoritos**: guardá tus personajes preferidos
- **Modo claro / oscuro**
- **Diseño responsive**

## Correr el proyecto local

```bash
npm install
vercel dev
```

Necesitás una variable de entorno `GEMINI_API_KEY` en un archivo `.env` en la raíz del proyecto (conseguí la tuya en [Google AI Studio](https://aistudio.google.com/)).

## Autora

Nadia Starna — [GitHub](https://github.com/NadiaStarna)